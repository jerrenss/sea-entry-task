package models

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"os"
)

var DB *gorm.DB

// SetupDB : initializing mysql database
func SetupDB() {
	var URL string

	if os.Getenv("GIN_MODE") == "debug" {
		URL = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_NAME"))
	} else {
		URL = fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True&loc=Local", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_CONTAINER_NAME"), os.Getenv("DB_NAME"))
	}

	instance, err := gorm.Open("mysql", URL)
	if err != nil {
		panic(err.Error())
	}

	fmt.Println("Connected to MySQL!")

	DB = instance

	DB.AutoMigrate(&Users{})
	DB.AutoMigrate(&Events{})
	DB.AutoMigrate(&Photos{})
	DB.AutoMigrate(&Registers{})
	DB.AutoMigrate(&Likes{})
	DB.AutoMigrate(&Comments{})

	DB.Model(&Likes{}).AddForeignKey("event_id", "events(event_id)", "CASCADE", "CASCADE")
	DB.Model(&Likes{}).AddForeignKey("user_id", "users(user_id)", "CASCADE", "CASCADE")
	DB.Model(&Comments{}).AddForeignKey("event_id", "events(event_id)", "CASCADE", "CASCADE")
	DB.Model(&Comments{}).AddForeignKey("user_id", "users(user_id)", "CASCADE", "CASCADE")
	DB.Model(&Registers{}).AddForeignKey("event_id", "events(event_id)", "CASCADE", "CASCADE")
	DB.Model(&Registers{}).AddForeignKey("user_id", "users(user_id)", "CASCADE", "CASCADE")
	DB.Model(&Photos{}).AddForeignKey("event_id", "events(event_id)", "CASCADE", "CASCADE")
}
