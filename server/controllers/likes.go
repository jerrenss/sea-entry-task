package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateLikeInput struct {
	User_Id  uint64 `json:"user_id" binding:"required"`
	Event_Id uint64 `json:"event_id" binding:"required"`
}

func GetAllLikes(c *gin.Context) {
	var likes []models.Likes
	models.DB.Find(&likes)
	c.JSON(http.StatusOK, gin.H{"data": likes})
}

func GetEventLikes(c *gin.Context) {
	var likes []models.Likes
	models.DB.Where("event_id = ?", c.Param("eventId")).Find(&likes)
	c.JSON(http.StatusOK, gin.H{"data": likes})
}

func CreateLike(c *gin.Context) {
	// Validate input
	var input CreateLikeInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create like
	like := models.Likes{User_Id: input.User_Id, Event_Id: input.Event_Id}
	if err := models.DB.Create(&like).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
		
	c.JSON(http.StatusOK, gin.H{"data": like})
}
