package models

import (
	"fmt"
	"os"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var DB *gorm.DB

// SetupDB : initializing mysql database
func SetupDB() {
	URL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_NAME"))
	instance, err := gorm.Open("mysql", URL)
	if err != nil {
		panic(err.Error())
	}

	instance.AutoMigrate(&Users{})
	instance.AutoMigrate(&Events{})
	instance.AutoMigrate(&Photos{})
	instance.AutoMigrate(&Registers{})
	instance.AutoMigrate(&Likes{})
	instance.AutoMigrate(&Comments{})

	fmt.Println("Connected to MySQL!")

	DB = instance
}
