package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateUserInput struct {
	First_Name    string `json:"first_name" binding:"required"`
	Last_Name     string `json:"last_name" binding:"required"`
	Username      string `json:"username" binding:"required"`
	Password_Hash string `json:"password_hash" binding:"required"`
	Is_Admin      bool   `json:"is_admin"`
}

func GetAllUsers(c *gin.Context) {
	var users []models.Users
	models.DB.Find(&users)
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func GetSingleUser(c *gin.Context) {
	var user models.Users

	if err := models.DB.Where("user_id = ?", c.Param("userId")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func CreateUser(c *gin.Context) {
	// Validate input
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create user
	user := models.Users{First_Name: input.First_Name, Last_Name: input.Last_Name, Username: input.Username, Password_Hash: input.Password_Hash, Is_Admin: input.Is_Admin}
	if err := models.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}
