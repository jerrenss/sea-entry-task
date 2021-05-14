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

func GetAllEvents(c *gin.Context) {
	var events []models.Events
	models.DB.Find(&events)
	c.JSON(http.StatusOK, gin.H{"data": events})
}

func GetSingleEvent(c *gin.Context) {
	var event models.Events

	if err := models.DB.Where("event_id = ?", c.Param("eventId")).First(&event).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

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
