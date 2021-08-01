package controllers

import (
	"event-server/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
)

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

func UploadSinglePhoto(c *gin.Context) {
	// Extract request information
	event_id := c.PostForm("event_id")
	file, err := c.FormFile("photo")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to extract photo!"})
		return
	}

	// Create /uploads folder if necessary
	path := filepath.Join(".", "uploads")

	if _, err := os.Stat(path); os.IsNotExist(err) {
		if err := os.Mkdir(path, 0700); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to create path!"})
			return
		}
	}

	filename := "./uploads/event" + event_id + "-" + filepath.Base(file.Filename)

	// Upload photo
	if err := c.SaveUploadedFile(file, filename); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to save file!"})
		return
	}

	photoUrl := filename[2:]
	eventId, err := strconv.ParseUint(string(event_id), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to parse event ID!"})
	}

	// Save photo information in DB
	photo := models.Photos{Event_Id: eventId, Photo_Url: photoUrl}
	if err := models.DB.Create(&photo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not save photo information to database!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": photo})
}

func UploadMultiplePhotos(c *gin.Context) {
	// Extract request information
	event_id := c.PostForm("event_id")
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to extract photos!"})
		return
	}

	files := form.File["photo"]

	for _, file := range files {
		// Create /uploads folder if necessary
		path := filepath.Join(".", "uploads")

		if _, err := os.Stat(path); os.IsNotExist(err) {
			if err := os.Mkdir(path, 0700); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to create path!"})
				return
			}
		}

		filename := "./uploads/event" + event_id + "-" + filepath.Base(file.Filename)

		// Upload photo
		if err := c.SaveUploadedFile(file, filename); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to save file!"})
			return
		}

		photoUrl := filename[2:]
		eventId, err := strconv.ParseUint(string(event_id), 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to parse event ID!"})
		}

		// Save photo information in DB
		photo := models.Photos{Event_Id: eventId, Photo_Url: photoUrl}
		if err := models.DB.Create(&photo).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Could not save photo information to database!"})
			return
		}
	}

	c.String(http.StatusOK, fmt.Sprintf("Successfully uploaded %d files", len(files)))
}
