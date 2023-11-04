package historykey

import (
	"API/Database"
	"database/sql"

	"github.com/gin-gonic/gin"
)

var HistoryDB *sql.DB

func GetHistory(c *gin.Context) {
<<<<<<< HEAD
	HistoryDB, _ = Database.GetDB()
	codekey := c.DefaultQuery("codeKey", "")
=======
	codekey := c.DefaultQuery("", "")
>>>>>>> d7fa5df065b67566962414bdda2dd68102cac2d4

	rowHistory := c.DefaultQuery("row", "")
	query := "select date , time ,report from history where mykey_codekey = ? order by idhistory desc limit ?"
	row, err := HistoryDB.Query(query, codekey, rowHistory)
	if err != nil {
		// fmt.Println(err.Error())
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	dataHistory := make([]map[string]interface{}, 0)
	for row.Next() {
		var date string
		var time string
		var report string
		err := row.Scan(&date, &time, &report)
		if err != nil {
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}
		rowData := map[string]interface{}{
			"date":   date,
			"time":   time,
			"report": report,
		}
		dataHistory = append(dataHistory, rowData)
	}
	c.JSON(200, gin.H{"data": dataHistory})
	HistoryDB.Close()
}
