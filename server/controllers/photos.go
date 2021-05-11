package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreatePhotoInput struct {
	Event_Id  uint64 `json:"event_id" binding:"required"`
	Photo_Url string `json:"photo_url" binding:"required"`
}

func GetAllPhotos(c *gin.Context) {
	var photos []models.Photos
	models.DB.Find(&photos)
	c.JSON(http.StatusOK, gin.H{"data": photos})
}

func GetEventPhotos(c *gin.Context) {
	var photos []models.Photos
	models.DB.Where("event_id = ?", c.Param("eventId")).Find(&photos)
	c.JSON(http.StatusOK, gin.H{"data": photos})
}

func CreatePhoto(c *gin.Context) {
	// Validate input
	var input CreatePhotoInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create photo
	photo := models.Photos{Event_Id: input.Event_Id, Photo_Url: input.Photo_Url}
	if err := models.DB.Create(&photo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": photo})
}
