package models

import (
	"time"
)

type Comments struct {
	User_Id   uint64    `json:"user_id" gorm:"primary_key;auto_increment:false"`
	Event_Id  uint64    `json:"event_id" gorm:"primary_key;auto_increment:false"`
	CreatedAt time.Time `gorm:"primary_key;default:CURRENT_TIMESTAMP" json:"created_at"`
	Content   string    `json:"content" gorm:"not null"`
}
