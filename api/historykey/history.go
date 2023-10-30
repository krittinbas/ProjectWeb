package historykey

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

var HistoryDB *sql.DB

func GetHistory(c *gin.Context) {
	codekey := c.DefaultQuery("", "")

	rowHistory := c.DefaultQuery("row", "")
	query := "select * from history where mykey_codekey = ? order by idhistory desc limit ?"
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
}
