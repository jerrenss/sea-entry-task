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

type RegistrationResult struct {
	User_Id    uint64
	Event_Id   uint64
	First_Name string
	Last_Name  string
}

func GetAllRegistrations(c *gin.Context) {
	var registrations []models.Registers
	models.DB.Find(&registrations)
	c.JSON(http.StatusOK, gin.H{"data": registrations})
}

func GetEventRegistrations(c *gin.Context) {
	var registrationResult []RegistrationResult
	models.DB.Model(models.Registers{}).Select("registers.user_id, registers.event_id, users.first_name, users.last_name").Joins("join users on registers.user_id = users.user_id").Where("event_id = ?", c.Param("eventId")).Scan(&registrationResult)

	var userRegistered bool
	user_id, _ := c.Get("user_id")
	models.DB.Model(models.Registers{}).Where("event_id = ?", c.Param("eventId")).Where("user_id = ?", ProcessUserId(user_id)).Count(&userRegistered)
	c.JSON(http.StatusOK, gin.H{"data": registrationResult, "userRegistered": userRegistered})
}

func CreateRegistration(c *gin.Context) {
	user_id, _ := c.Get("user_id")

	// Create registration
	registration := models.Registers{User_Id: ProcessUserId(user_id), Event_Id: ConvertStringToUint64(c.Param("eventId"))}
	if err := models.DB.Create(&registration).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creation of registration failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registration})
}

func DeleteRegistration(c *gin.Context) {
	user_id, _ := c.Get("user_id")

	// Delete registration
	registration := models.Registers{User_Id: ProcessUserId(user_id), Event_Id: ConvertStringToUint64(c.Param("eventId"))}
	if err := models.DB.Delete(&registration).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Deletion of registration failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registration})
}

func CreateRegistrationManual(c *gin.Context) {
	// Validate input
	var input CreateRegistrationInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	// Create registration
	registration := models.Registers{User_Id: input.User_Id, Event_Id: input.Event_Id}
	if err := models.DB.Create(&registration).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creation of registration failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": registration})
}
