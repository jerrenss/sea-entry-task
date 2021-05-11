package models

import (
//   "github.com/jinzhu/gorm"
)

type Registers struct {
	User_Id  uint64 `json:"user_id" gorm:"primary_key"`
	Event_Id uint64 `json:"event_id" gorm:"primary_key"`
}
