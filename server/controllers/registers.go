package controllers
import (
"event-server/models"
"net/http"
"github.com/gin-gonic/gin"
"github.com/jinzhu/gorm"
)

// Get all tasks
func GetRegistrations(c *gin.Context) {
db := c.MustGet("db").(*gorm.DB)
var registrations []models.Registers
db.Find(&registrations)
c.JSON(http.StatusOK, gin.H{"data": registrations})
}