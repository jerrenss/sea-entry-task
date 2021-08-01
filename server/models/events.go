package models

import (
	"time"
)

type Events struct {
	Event_Id    uint64    `json:"event_id" gorm:"primary_key"`
	CreatedAt   time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description" gorm:"not null"`
	Event_Date  string    `json:"event_date" gorm:"not null"`
	Location    string    `json:"location" gorm:"not null"`
	Category    string    `json:"category" gorm:"not null"`
}
