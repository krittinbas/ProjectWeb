package main

import (
	mydb "API/Database"
	"API/configs"
	"API/encode"
	"API/esp"
	"API/historykey"
	HostMangerkey "API/hostMangerkey"
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
	HostMangerkey.HostMangerDb = Db
	historykey.HistoryDB = Db
	historykey.ReportDB = Db
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
	r.GET("/whoJoinKey", HostMangerkey.ListMemberJoinkey)
	r.POST("/tranferHost", HostMangerkey.TranferHost)
	r.POST("/Kick", HostMangerkey.Kick)
	r.GET("/history", historykey.GetHistory)
	r.POST("/GenShareKey", mangerkey.GenKey)
	r.POST("/GenDeleteKey", mangerkey.DeleteKey)
	r.POST("/espOpenClose", esp.ESPOpenCloseServo)
	r.POST("/espPIR", esp.ESPPIR)
	r.GET("/espCheck", esp.ESPCheckServo)
	r.GET("/openclose", openclose)
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
	row, _ := Db.Query(query, email, password)
	var id int
	var emails string
	row.Next()
	err := row.Scan(&id, &emails)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password. Please try again."})
		fmt.Println(err.Error())
		return
	}

	c.JSON(200, gin.H{
		"user":  emails,
		"id":    id,
		"email": encode.Decode(emails),
	})
	row.Close()
}

func registor(c *gin.Context) {
	email := encode.Encode(c.PostForm("email"))
	password := encode.Encode(c.PostForm("password"))
	query1 := "SELECT email FROM accounts WHERE email = ?"
	getRow, _ := Db.Query(query1, email)
	var xxx string
	fmt.Println(xxx)
	getRow.Scan(&xxx)
	if xxx == email {
		c.JSON(409, gin.H{"error": "This email has been registered already!"})
		return
	}
	getRow.Close()
	query := "INSERT INTO accounts (email, password) VALUES (?,?)"
	row, _ := Db.Query(query, email, password)
	if row.Err() != nil {
		c.JSON(401, gin.H{"error": row.Err().Error()})
		return
	}
	c.JSON(200, gin.H{"data": "success register"})
	row.Close()
}
func Forgetpass(c *gin.Context) {
	email := encode.Encode(c.PostForm("email"))
	password := encode.Encode(c.PostForm("password"))
	query := "select email from accounts where email= ?"
	getRow, _ := Db.Query(query, email)
	var emailcheck string
	x := getRow.Scan(&emailcheck)
	if x != nil {
		c.JSON(400, gin.H{"error": x.Error()})
		return
	}
	query1 := "UPDATE accounts SET password = ?	WHERE email = ?"
	getRow, _ = Db.Query(query1, password, email)

	c.JSON(200, gin.H{"data": "success"})
	getRow.Close()
}
func infoAccount(c *gin.Context) {
	email := c.DefaultQuery("user", "")
	query := "select ak.id,ak.nickname,K.codeKey,A.email as 'host',(select shareKey from mykey where idhostkey = B.id and k.codekey=codekey)as 'sharekey' from mykey K ,accounts_has_key ak,accounts A,accounts B where ak.accounts_id=b.id and K.codekey = ak.mykey_codekey and A.id = K.idhostkey and B.email = ?"
	rows, err := Db.Query(query, email)
	if err != nil {
		c.JSON(406, gin.H{
			"email":      encode.Decode(email),
			"user":       email,
			"isHost":     false,
			"keyconnect": false,
			"key":        nil,
			"error":      err.Error()})
		return
	}
	dataListKey := make([]map[string]interface{}, 0)
	dataListKeyHost := make([]map[string]interface{}, 0)
	hostkey := false
	for rows.Next() {
		var codeKey string
		var id string
		var hostemail string
		var nickname sql.NullString // Use sql.NullString to handle NULL strings
		var shareKey sql.NullString
		err := rows.Scan(&id, &nickname, &codeKey, &hostemail, &shareKey)
		if err != nil {
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}
		thishostkey := true
		if email != hostemail {
			thishostkey = false
		} else {
			hostkey = true
			keyhost := map[string]interface{}{
				"codeKey":  codeKey,
				"id":       id,
				"shareKey": shareKey.String,
				"nickname": nickname,
			}
			dataListKeyHost = append(dataListKeyHost, keyhost)
		}

		queryState := "select countuse,nowCloserDoor,keystatus from mystate where mykey_codekey = ?"
		getRow, _ := Db.Query(queryState, codeKey)

		var countuse int
		var nowCloserDoor int
		var mykeystatus int
		getRow.Next()
		getRow.Scan(&countuse, &nowCloserDoor, &mykeystatus)
		getRow.Close()
		keyState := map[string]interface{}{
			"countuse":      countuse,
			"nowCloserDoor": nowCloserDoor,
			"mykeystatus":   mykeystatus,
		}
		rowData := map[string]interface{}{
			"id":        id,
			"nickname":  nickname.String,
			"codeKey":   codeKey,
			"emailHOST": encode.Decode(hostemail),
			"shareKey":  shareKey.String,
			"isHost":    thishostkey,
			"statekey":  keyState,
		}

		dataListKey = append(dataListKey, rowData)
	}
	rows.Close()
	if len(dataListKey) == 0 {
		c.JSON(200, gin.H{
			"email":      encode.Decode(email),
			"keyconnect": false,
			"user":       email,
			"isHost":     false,
			"key":        dataListKey,
		})
		return
	}
	c.JSON(200, gin.H{
		"email":      encode.Decode(email),
		"user":       email,
		"keyconnect": true,
		"key":        dataListKey,
		"isHostKey":  hostkey,
		"HostKey":    dataListKeyHost,
	})
}
func openclose(c *gin.Context) {
	codekey := c.DefaultQuery("codeKey", "")
	state := c.DefaultQuery("state", "")
	who := c.DefaultQuery("who", "")
	query := "UPDATE mystate SET keystatus = ?,countuse = countuse + 1 WHERE (mykey_codekey =?)"
	row, _ := Db.Query(query, state, codekey)
	row.Close()
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": row.Err().Error()})
		return
	}
	if state == "1" {
		historykey.ReportSend(codekey, fmt.Sprintf("%s open door", who))
		c.JSON(200, "opend")
		return
	}
	historykey.ReportSend(codekey, fmt.Sprintf("%s close door", who))
	c.JSON(200, "close")
}
