package main

import (
	mydb "API/Database"
	"API/configs"
	"API/encode"
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
)

var Db *sql.DB

func main() {
	r := gin.Default()
	var err error
	Db, err = mydb.GetDB()
	if err != nil {
		fmt.Println("Error Database Connection!")
	}
	r.Use(CORSMiddleware())

	r.POST("/login", loginHandler)
	r.POST("/registor", registor)
	r.POST("/forgetpass", Forgetpass)
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

	password := c.PostForm("password")
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

	password := c.PostForm("password")
	query1 := "SELECT email FROM accounts WHERE email = ?"
	getRow := Db.QueryRow(query1, email)
	var xxx string
	getRow.Scan(&xxx)
	if xxx == email {
		c.JSON(409, gin.H{"error": "This email has been registered already!"})
		return
	}
	query := "INSERT INTO accounts (email, password) VALUES (?,?)"
	row := Db.QueryRow(query, email, password)
	if row.Err() != nil {
		c.JSON(401, gin.H{"error": "has problem server!!!!"})
		return
	}
	c.JSON(200, gin.H{"data": "success register"})
}
func Forgetpass(c *gin.Context) {
	email := encode.Encode(c.PostForm("email"))
	password := c.PostForm("password")
	query1 := "UPDATE accounts SET password = ?	WHERE email = ?"
	getRow := Db.QueryRow(query1, password, email)
	if getRow.Err() != nil {
		c.JSON(400, gin.H{"error": "not found Email"})
		return
	}
	c.JSON(200, gin.H{"data": "success"})
}
func infoAccount(c *gin.Context) {
	email := encode.Decode(c.DefaultQuery("user", ""))

}
