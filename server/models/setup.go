package models

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

// SetupDB : initializing mysql database
func SetupDB() *gorm.DB {
	USER := "event-app-user"
	PASS := "event-app-user"
	HOST := "localhost"
	PORT := "3307"
	DBNAME := "event-app-db"
	URL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", USER, PASS, HOST, PORT, DBNAME)
	db, err := gorm.Open("mysql", URL)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("Connected to MySQL!")
	return db
}