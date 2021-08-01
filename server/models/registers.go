package models

type Registers struct {
	User_Id  uint64 `json:"user_id" gorm:"primary_key;auto_increment:false"`
	Event_Id uint64 `json:"event_id" gorm:"primary_key;auto_increment:false"`
}
