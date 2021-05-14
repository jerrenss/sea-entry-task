package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type CreateUserInput struct {
	First_Name string `json:"first_name" binding:"required"`
	Last_Name  string `json:"last_name" binding:"required"`
	Username   string `json:"username" binding:"required"`
	Password   string `json:"password" binding:"required"`
	Is_Admin   bool   `json:"is_admin"`
}

type LoginInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func GetAllUsers(c *gin.Context) {
	var users []models.Users
	models.DB.Find(&users)
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func GetSingleUser(c *gin.Context) {
	var user models.Users

	if err := models.DB.Where("user_id = ?", c.Param("userId")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func CreateUser(c *gin.Context) {
	// Validate input
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	// Hash password
	hashedPassword, err := models.Hash(input.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to hash password!"})
		return
	}

	// Create user
	user := models.Users{First_Name: input.First_Name, Last_Name: input.Last_Name, Username: input.Username, Password_Hash: string(hashedPassword), Is_Admin: input.Is_Admin}
	if err := models.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creation of user failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func LoginUser(c *gin.Context) {
	var input LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	var user models.Users

	// Verify if user exists
	if err := models.DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Verify if password is correct
	if err := models.VerifyPassword(user.Password_Hash, input.Password); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid password!"})
		return
	}

	// Create JWT token
	token, err := models.CreateToken(user.User_Id, user.Is_Admin)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, "Unable to create JWT token")
		return
	}

	// Set cookie and return respose to client
	c.SetCookie("jwt", token, 3600, "/", "localhost", false, true)
	c.SetCookie("admin", strconv.FormatBool(user.Is_Admin), 3600, "/", "localhost", false, false)

	c.JSON(http.StatusOK, gin.H{"data": "Login successful!"})

}

func SignoutUser(c *gin.Context) {
	// Delete JWT token
	token, err := models.DeleteToken()
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, "Unable to delete JWT token")
		return
	}

	// Set cookie and return respose to client
	c.SetCookie("jwt", token, -1, "/", "localhost", false, true)
	c.SetCookie("admin", "expired", -1, "/", "localhost", false, false)

	c.JSON(http.StatusOK, gin.H{"data": "Signout successful!"})

}
