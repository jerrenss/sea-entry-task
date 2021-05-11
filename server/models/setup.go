package models

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var DB *gorm.DB

// SetupDB : initializing mysql database
func SetupDB() {
	USER := "event-app-user"
	PASS := "event-app-user"
	HOST := "localhost"
	PORT := "3307"
	DBNAME := "event-app-db"
	URL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", USER, PASS, HOST, PORT, DBNAME)
	instance, err := gorm.Open("mysql", URL)
	if err != nil {
		panic(err.Error())
	}

	instance.AutoMigrate(&Registers{})
	instance.AutoMigrate(&Likes{})

	fmt.Println("Connected to MySQL!")

	DB = instance
}
