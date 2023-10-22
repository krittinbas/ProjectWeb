package Database

import (
	"API/Configs"
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetDB() (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", Configs.Usernamedatabase, Configs.Passworddatabase, Configs.IPdatabase, Configs.Portdatabase, Configs.DatabaseName)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}
