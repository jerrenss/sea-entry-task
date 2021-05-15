package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateEventInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Event_Date  string `json:"event_date" binding:"required"`
	Location    string `json:"location" binding:"required"`
	Category    string `json:"category" binding:"required"`
}

type EventResult struct {
	Event_Id    uint64
	Created_At  string
	Title       string
	Description string
	Event_Date  string
	Location    string
	Category    string
	Photo_Url   string
}

func GetAllEvents(c *gin.Context) {
	var events []models.Events
	models.DB.Find(&events)
	c.JSON(http.StatusOK, gin.H{"data": events})
}

func GetSingleEvent(c *gin.Context) {
	var event EventResult
	models.DB.Model(models.Events{}).Select("events.event_id, events.created_at, events.title, events.description, events.event_date, events.location, events.category, photos.photo_url").Joins("left join photos on events.event_id = photos.event_id").Where("events.event_id = ?", c.Param("eventId")).Scan(&event)
	c.JSON(http.StatusOK, gin.H{"data": event})
}

func CreateEvent(c *gin.Context) {
	// Validate input
	var input CreateEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	// Create event
	event := models.Events{Title: input.Title, Description: input.Description, Event_Date: input.Event_Date, Location: input.Location, Category: input.Category}
	if err := models.DB.Create(&event).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creation of event failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": event})
}
