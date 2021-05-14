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

type LikeResult struct {
	User_Id    uint64
	Event_Id   uint64
	CreatedAt  string
	First_Name string
	Last_Name  string
}

func GetAllLikes(c *gin.Context) {
	var likes []models.Likes
	models.DB.Find(&likes)
	c.JSON(http.StatusOK, gin.H{"data": likes})
}

func GetEventLikes(c *gin.Context) {
	var likeResult []LikeResult
	models.DB.Model(models.Likes{}).Select("likes.user_id, likes.event_id, likes.created_at, users.first_name, users.last_name").Joins("join users on likes.user_id = users.user_id").Where("event_id = ?", c.Param("eventId")).Scan(&likeResult)
	c.JSON(http.StatusOK, gin.H{"data": likeResult})
}

func CreateLike(c *gin.Context) {
	// Validate input
	var input CreateLikeInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	// Create like
	like := models.Likes{User_Id: input.User_Id, Event_Id: input.Event_Id}
	if err := models.DB.Create(&like).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creation of like failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": like})
}
