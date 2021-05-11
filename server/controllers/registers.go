package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateRegistrationInput struct {
	User_Id  uint64 `json:"user_id" binding:"required"`
	Event_Id uint64 `json:"event_id" binding:"required"`
}

func GetAllRegistrations(c *gin.Context) {
	var registrations []models.Registers
	models.DB.Find(&registrations)
	c.JSON(http.StatusOK, gin.H{"data": registrations})
}

func GetEventRegistrations(c *gin.Context) {
	var registrations []models.Registers
	models.DB.Where("event_id = ?", c.Param("eventId")).Find(&registrations)
	c.JSON(http.StatusOK, gin.H{"data": registrations})
}

func CreateRegistration(c *gin.Context) {
	// Validate input
	var input CreateRegistrationInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create registration
	registration := models.Registers{User_Id: input.User_Id, Event_Id: input.Event_Id}
	if err := models.DB.Create(&registration).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registration})
}
