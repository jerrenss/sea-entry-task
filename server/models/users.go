package models

import (
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"os"
	"time"
)

type Users struct {
	User_Id       uint64    `json:"user_id" gorm:"primary_key"`
	CreatedAt     time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
	First_Name    string    `json:"first_name" gorm:"not null"`
	Last_Name     string    `json:"last_name" gorm:"not null"`
	Username      string    `json:"username" gorm:"unique;not null"`
	Password_Hash string    `json:"password_hash" gorm:"not null"`
	Is_Admin      bool      `json:"is_admin" gorm:"not null"`
}

func Hash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func CreateToken(userId uint64, isAdmin bool) (string, error) {
	var err error
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["user_id"] = userId
	atClaims["is_admin"] = isAdmin
	atClaims["exp"] = time.Now().Add(time.Minute * 60).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return "", err
	}
	return token, nil
}

func DeleteToken() (string, error) {
	var err error
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = false
	atClaims["user_id"] = "Expired"
	atClaims["is_admin"] = "Expired"
	atClaims["exp"] = time.Now().Add(-7 * 24 * time.Hour).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return "", err
	}
	return token, nil
}
