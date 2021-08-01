package models

type Photos struct {
	Event_Id  uint64 `json:"event_id" gorm:"primary_key;auto_increment:false"`
	Photo_Url string `json:"photo_url" gorm:"primary_key"`
}
