package historykey

import (
	"database/sql"
	"fmt"
	"time"
)

var ReportDB *sql.DB

func ReportSend(codeKey string, msg string) {
	times := time.Now().Format("15:04:05")
	dataNow := time.Now().Format("2006-01-02")
	query := "INSERT INTO history (date, time, report, mykey_codeKey) VALUES (?, ?, ?, ?)"
	row := ReportDB.QueryRow(query, dataNow, times, msg, codeKey)
	if row.Err() != nil {
		fmt.Println(row.Err().Error())
	}
}
