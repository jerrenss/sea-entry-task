package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateCommentInput struct {
	User_Id  uint64 `json:"user_id" binding:"required"`
	Event_Id uint64 `json:"event_id" binding:"required"`
	Content  string `json:"content" binding:"required"`
}

type CommentResult struct {
	User_Id    uint64
	Event_Id   uint64
	Content    string
	CreatedAt  string
	First_Name string
	Last_Name  string
}

func GetAllComments(c *gin.Context) {
	var comments []models.Comments
	models.DB.Find(&comments)
	c.JSON(http.StatusOK, gin.H{"data": comments})
}

func GetEventComments(c *gin.Context) {
	var commentResult []CommentResult
	models.DB.Model(models.Comments{}).Select("comments.user_id, comments.event_id, comments.content, comments.created_at, users.first_name, users.last_name").Joins("join users on comments.user_id = users.user_id").Where("event_id = ?", c.Param("eventId")).Scan(&commentResult)
	c.JSON(http.StatusOK, gin.H{"data": commentResult})
}

func CreateComment(c *gin.Context) {
	// Validate input
	var input CreateCommentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create comment
	comment := models.Comments{User_Id: input.User_Id, Event_Id: input.Event_Id, Content: input.Content}
	if err := models.DB.Create(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comment})
}
