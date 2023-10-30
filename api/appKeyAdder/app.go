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

func main() {
	DB, err = Database.GetDB()
	if err != nil {
		fmt.Println("Error Connection Databases")
		return
	}
	var choiceselect int
	gettingallkey()
	for choiceselect != 3 {
		fmt.Println("=====Menu=====")
		fmt.Println("1.Gen Key Auto")
		fmt.Println("2.Add Key Manual")
		fmt.Println("3.Getting ALL Key")
		fmt.Println("4.Exit")
		fmt.Print("select -> ")
		fmt.Scanln(&choiceselect)
		switch choiceselect {
		case 1:
			GenKey()
		case 2:
			addKeymanual()
		case 3:
			gettingallkey()
		case 4:
			return
		default:
			fmt.Print("Not have commend\n")
		}
	}
}
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
func addKeymanual() {
	gettingallkey()
	fmt.Println("!!!insert not repeat in table!!!")
	fmt.Print("key insert -> ")
	var codekey string
	fmt.Scanln(&codekey)
	if codekey == "" {
		fmt.Println("dont insert '' ")
		return
	}
	query := "INSERT INTO mykey (codeKey) VALUES (?)"
	row := DB.QueryRow(query, codekey)
	if row.Err() != nil {
		fmt.Println("Error :", row.Err().Error())
		return
	}
	fmt.Println("Insreted!")
	query = "INSERT INTO mystate (countuse, nowCloserDoor, keystatus, mykey_codeKey) VALUES ('0', '0', '0', ?)"
	row = DB.QueryRow(query, codekey)
	if row.Err() != nil {
		fmt.Println("Error :", row.Err().Error())
		return
	}
}
func GenKey() {
	times := time.Now().Format("15:04:05")

	var d int
	fmt.Print("enter int somthing -> ")
	fmt.Scanln(&d)
	s := rand.Intn(1000 + d)
	a := fmt.Sprint(s, times)
	ss := encode.Encode(a)
	query := "INSERT INTO mykey (codeKey) VALUES (?)"
	row := DB.QueryRow(query, ss)
	if row.Err() != nil {
		fmt.Println("Error :", row.Err().Error())
		return
	}
	fmt.Println("key", ss, "inserted!!!")
	query = "INSERT INTO mystate (countuse, nowCloserDoor, keystatus, mykey_codeKey) VALUES ('0', '0', '0', ?)"
	row = DB.QueryRow(query, ss)
	if row.Err() != nil {
		fmt.Println("Error :", row.Err().Error())
		return
	}
}
