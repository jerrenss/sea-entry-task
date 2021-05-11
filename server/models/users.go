package models

import (
// "github.com/jinzhu/gorm"
)

type Users struct {
	User_Id       uint   `json:"user_id" gorm:"primary_key"`
	First_Name    string `json:"first_name" gorm:"not null"`
	Last_Name     string `json:"last_name" gorm:"not null"`
	Username      string `json:"username" gorm:"unique;not null"`
	Password_Hash string `json:"password_hash" gorm:"not null"`
	Is_Admin      bool   `json:"is_admin" gorm:"not null"`
}

// func (u *Users) SaveUser(db *gorm.DB) (*Users, error) {

// 	var err error
// 	err = db.Debug().Create(&u).Error
// 	if err != nil {
// 		return &Users{}, err
// 	}
// 	return u, nil
// }

// func (u *Users) FindAllUsers(db *gorm.DB) (*[]Users, error) {
// 	var err error
// 	users := []Users{}
// 	err = db.Debug().Model(&Users{}).Limit(10).Find(&users).Error
// 	if err != nil {
// 		return &[]Users{}, err
// 	}
// 	return &users, err
// }
