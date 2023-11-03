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
	ESPDB, _ = Database.GetDB()
	defer ESPDB.Close()
	codekey := c.DefaultQuery("codeKey", "")
	query := "select keystatus from mystate where mykey_codeKey = ?"
	row := ESPDB.QueryRow(query, codekey)
	var state int
	err := row.Scan(&state)
	if err != nil {
		c.JSON(500, err.Error())
		fmt.Println(err.Error())
		return
	}
	c.JSON(200, state)
}
func ESPOpenCloseServo(c *gin.Context) {
	ESPDB, _ = Database.GetDB()
	defer ESPDB.Close()
	codekey := c.PostForm("codeKey")
	typedo := c.PostForm("type")
	var tpyePInt int
	tpyePInt = 0
	if typedo == "open" {
		tpyePInt = 1
	}
	query := "UPDATE mystate SET keystatus = ? WHERE (mykey_codeKey = ?)"

	row := ESPDB.QueryRow(query, tpyePInt, codekey)
	if row.Err() != nil {
		c.JSON(500, "cant UPDATE database!!")
		return
	}
	if tpyePInt == 1 {
		historykey.ReportSend(codekey, "Card tap for Open")
		c.JSON(200, "open")
		return
	} else {
		historykey.ReportSend(codekey, "Card tap for close")
		c.JSON(200, "close")
		return
	}

}

func ESPPIR(c *gin.Context) {
	ESPDB, _ = Database.GetDB()
	defer ESPDB.Close()
	codekey := c.PostForm("codeKey")
	value := c.PostForm("value")
	query := "UPDATE mystate SET nowCloserDoor = ? WHERE (mykey_codeKey = ?)"
	row := ESPDB.QueryRow(query, value, codekey)
	if row.Err() != nil {
		c.JSON(500, row.Err().Error())
		return
	}
	c.JSON(200, "susess")
}
