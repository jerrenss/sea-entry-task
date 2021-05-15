package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateCommentInputManual struct {
	User_Id  uint64 `json:"user_id" binding:"required"`
	Event_Id uint64 `json:"event_id" binding:"required"`
	Content  string `json:"content" binding:"required"`
}

type CreateCommentInput struct {
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
	Username   string
}

func GetAllComments(c *gin.Context) {
	var comments []models.Comments
	models.DB.Find(&comments)
	c.JSON(http.StatusOK, gin.H{"data": comments})
}

func GetEventComments(c *gin.Context) {
	var commentResult []CommentResult
	models.DB.Model(models.Comments{}).Select("comments.user_id, comments.event_id, comments.content, comments.created_at, users.first_name, users.last_name, users.username").Joins("join users on comments.user_id = users.user_id").Where("event_id = ?", c.Param("eventId")).Order("comments.created_at desc").Scan(&commentResult)
	c.JSON(http.StatusOK, gin.H{"data": commentResult})
}

func CreateComment(c *gin.Context) {
	user_id, _ := c.Get("user_id")
	// Validate input
	var input CreateCommentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	// Create comment
	comment := models.Comments{User_Id: ProcessUserId(user_id), Event_Id: input.Event_Id, Content: input.Content}
	if err := models.DB.Create(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creation of comment failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comment})
}

func CreateCommentManual(c *gin.Context) {
	// Validate input
	var input CreateCommentInputManual
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	// Create comment
	comment := models.Comments{User_Id: input.User_Id, Event_Id: input.Event_Id, Content: input.Content}
	if err := models.DB.Create(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creation of comment failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comment})
}
