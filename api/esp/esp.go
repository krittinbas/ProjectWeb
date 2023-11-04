package esp

import (
	"API/Database"
	"API/historykey"
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
)

var ESPDB *sql.DB

func ESPCheckServo(c *gin.Context) {
	codekey := c.DefaultQuery("codeKey", "")
	query := "select keystatus from mystate where mykey_codeKey = ?"
	row, _ := ESPDB.Query(query, codekey)
	var state int
	err := row.Scan(&state)
	if err != nil {
		c.JSON(500, err.Error())
		fmt.Println(err.Error())
		return
	}
	c.JSON(200, state)
	row.Close()
}
func ESPOpenCloseServo(c *gin.Context) {
	ESPDB, _ = Database.GetDB()
	codekey := c.PostForm("codeKey")
	typedo := c.PostForm("type")
	var tpyePInt int
	tpyePInt = 0
	if typedo == "open" {
		tpyePInt = 1
	}
	query := "UPDATE mystate SET keystatus = ? WHERE (mykey_codeKey = ?)"

	row, _ := ESPDB.Query(query, tpyePInt, codekey)
	if row.Err() != nil {
		c.JSON(500, "cant UPDATE database!!")
		return
	}
	if tpyePInt == 1 {
		historykey.ReportSend(codekey, "Card tap for Open")
		c.JSON(200, "open")
		return
	}
	historykey.ReportSend(codekey, "Card tap for close")
	c.JSON(200, "close")
	row.Close()
}

func ESPPIR(c *gin.Context) {
	codekey := c.PostForm("codeKey")
	value := c.PostForm("value")
	query := "UPDATE mystate SET nowCloserDoor = ? WHERE (mykey_codeKey = ?)"
	row, _ := ESPDB.Query(query, value, codekey)
	if row.Err() != nil {
		c.JSON(500, row.Err().Error())
		return
	}
	c.JSON(200, "susess")
	row.Close()
}
