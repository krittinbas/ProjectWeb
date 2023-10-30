package main

import (
	"API/Database"
	"API/encode"
	"database/sql"
	"fmt"
	"math/rand"
	"time"
)

var DB *sql.DB
var err error

func gettingallkey() {
	query := "select codekey from mykey"
	row, errorget := DB.Query(query)
	fmt.Printf("%-5s|%4s\n", "index", "key")
	fmt.Println("---------------------")
	if errorget != nil {
		fmt.Println("Not Key in table", errorget.Error())
		return
	}
	count := 0
	for row.Next() {
		count++
		var codekey string
		row.Scan(&codekey)
		fmt.Printf("%-5d| %-10s\n", count, codekey)
	}
}

func addKeymanual(codekey string) {
    gettingallkey()
    fmt.Println("!!!insert not repeat in table!!!")
    if codekey == "" {
        fmt.Println("dont insert '' ")
        return
    }

    // Insert the codekey into the mykey table
    query := "INSERT INTO mykey (codeKey) VALUES (?)"
    row := DB.QueryRow(query, codekey)
    if row.Err() != nil {
        fmt.Println("Error :", row.Err().Error())
        return
    }
    fmt.Println("Inserted!")

    // Insert associated data into the mystate table
    query = "INSERT INTO mystate (countuse, nowCloserDoor, keystatus, mykey_codeKey) VALUES ('0', '0', '0', ?)"
    row = DB.QueryRow(query, codekey)
    if row.Err() != nil {
        fmt.Println("Error :", row.Err().Error())
        return
    }
}