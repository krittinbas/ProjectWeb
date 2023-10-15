package main

import (
	mydb "API/Database"
	"API/configs"
	"API/encode"
	mangerkey "API/mangerKey"
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
)

var Db *sql.DB

func main() {
	r := gin.Default()
	var err error
	Db, err = mydb.GetDB()
	mangerkey.MangerkeyDb = Db
	if err != nil {
		fmt.Println("Error Database Connection!")
	}

	r.Use(CORSMiddleware())

	r.POST("/login", loginHandler)
	r.POST("/register", registor)
	r.POST("/forgetpass", Forgetpass)
	r.GET("/info", infoAccount)
	r.POST("/connectKey", mangerkey.ConnectionKey)
	r.POST("/namechange", mangerkey.ChangeNickName)
	r.POST("/disconnectkey", mangerkey.Disconectkey)
	r.Run(":" + configs.PortAPI)

}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
func loginHandler(c *gin.Context) {
	email := encode.Encode(c.PostForm("email"))

	password := encode.Encode(c.PostForm("password"))
	query := "SELECT id,email FROM accounts WHERE email = ? AND password = ?"
	row := Db.QueryRow(query, email, password)

	var id int
	var emails string
	err := row.Scan(&id, &email)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password. Please try again."})
		return
	}
	c.JSON(200, gin.H{
		"user":  emails,
		"id":    id,
		"email": email,
	})
}

func registor(c *gin.Context) {
	email := encode.Encode(c.PostForm("email"))
	password := encode.Encode(c.PostForm("password"))
	query1 := "SELECT email FROM accounts WHERE email = ?"
	getRow := Db.QueryRow(query1, email)
	var xxx string
	fmt.Println(xxx)
	getRow.Scan(&xxx)
	if xxx == email {
		c.JSON(409, gin.H{"error": "This email has been registered already!"})
		return
	}
	query := "INSERT INTO accounts (email, password) VALUES (?,?)"
	row := Db.QueryRow(query, email, password)
	if row.Err() != nil {
		c.JSON(401, gin.H{"error": row.Err().Error()})
		return
	}
	c.JSON(200, gin.H{"data": "success register"})
}
func Forgetpass(c *gin.Context) {
	email := encode.Encode(c.PostForm("email"))
	password := encode.Encode(c.PostForm("password"))
	query1 := "UPDATE accounts SET password = ?	WHERE email = ?"
	getRow := Db.QueryRow(query1, password, email)
	if getRow.Err() != nil {
		c.JSON(400, gin.H{"error": "not found Email"})
		return
	}
	c.JSON(200, gin.H{"data": "success"})
}
func infoAccount(c *gin.Context) {
	email := c.DefaultQuery("user", "")
	query := "select ak.id,ak.nickname,K.preKey,A.email as 'host',(select shareKey from mykey where idhostkey = B.id and k.idkey=idkey)as 'sharekey' from mykey K ,accounts_has_key ak,accounts A,accounts B where ak.accounts_id=b.id and K.idkey = key_idkey and A.id = K.idhostkey and B.email = ?"
	rows, err := Db.Query(query, email)
	if err != nil {
		c.JSON(406, gin.H{
			"email":      encode.Decode(email),
			"keyconnect": false,
			"key":        nil,
			"error":      err.Error()})
		return
	}
	defer rows.Close()
	dataListKey := make([]map[string]interface{}, 0)
	dataListKeyHost := make([]map[string]interface{}, 0)
	hostkey := false
	for rows.Next() {
		var prekey string
		var id string
		var hostemail string
		var nickname sql.NullString // Use sql.NullString to handle NULL strings
		var shareKey sql.NullString
		err := rows.Scan(&id, &nickname, &prekey, &hostemail, &shareKey)
		if err != nil {
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}
		thishostkey := true
		if email != hostemail {
			prekey = encode.Decode(hostemail)
			thishostkey = false
		} else {
			hostkey = true
			keyhost := map[string]interface{}{
				"codeKey":  prekey,
				"id":       id,
				"shareKey": shareKey.String,
			}
			dataListKeyHost = append(dataListKeyHost, keyhost)
		}
		rowData := map[string]interface{}{
			"id":       id,
			"nickname": nickname.String,
			"codeKey":  prekey,
			"shareKey": shareKey.String,
			"isHost":   thishostkey,
		}

		dataListKey = append(dataListKey, rowData)
	}
	if len(dataListKey) == 0 {
		c.JSON(200, gin.H{
			"email":      encode.Decode(email),
			"keyconnect": false,
			"key":        dataListKey,
		})
		return
	}
	c.JSON(200, gin.H{
		"email":      encode.Decode(email),
		"keyconnect": true,
		"key":        dataListKey,
		"isHostKey":  hostkey,
		"HostKey":    dataListKeyHost,
	})
}
