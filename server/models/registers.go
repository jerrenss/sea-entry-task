package models

import (
//   "github.com/jinzhu/gorm"
)

type Registers struct {
  User_Id     uint   `json:"user_id" gorm:"primary_key"`
  Event_Id  string `json:"event_id" gorm:"primary_key"`
}
