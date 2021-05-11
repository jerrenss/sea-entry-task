package models

import (
// "github.com/jinzhu/gorm"
)

type Events struct {
	Event_Id    uint   `json:"event_id" gorm:"primary_key"`
	Title       string `json:"title" gorm:"not null"`
	Description string `json:"description" gorm:"not null"`
	Event_Date  string `json:"event_date" gorm:"unique;not null"`
	Location    string `json:"location" gorm:"not null"`
	Category    bool   `json:"category" gorm:"not null"`
}
