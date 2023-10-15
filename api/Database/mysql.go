package Database

import (
	"API/configs"
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetDB() (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", configs.Usernamedatabase, configs.Passworddatabase, configs.IPdatabase, configs.Portdatabase, configs.DatabaseName)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}
