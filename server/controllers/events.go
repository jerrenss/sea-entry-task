package controllers

import (
	"event-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type CreateEventInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Event_Date  string `json:"event_date" binding:"required"`
	Location    string `json:"location" binding:"required"`
	Category    string `json:"category" binding:"required"`
}

type EventResult struct {
	Event_Id    uint64
	Created_At  string
	Title       string
	Description string
	Event_Date  string
	Location    string
	Category    string
	Photo_Url   string
}

type EventCategoryResult struct {
	Category string
}

func GetAllEvents(c *gin.Context) {
	var events []models.Events
	page := c.Request.URL.Query().Get("page")
	category := c.Request.URL.Query().Get("category")
	pageInt, _ := strconv.Atoi(page)

	if category != "" {
		models.DB.Limit(10).Offset(10*(pageInt-1)).Order("created_at").Where("category = ?", category).Find(&events)
	} else {
		models.DB.Limit(10).Offset(10 * (pageInt - 1)).Order("created_at").Find(&events)
	}

	c.JSON(http.StatusOK, gin.H{"data": events})
}

func GetEventsCount(c *gin.Context) {
	var count int
	category := c.Request.URL.Query().Get("category")

	if category != "" {
		models.DB.Model(models.Events{}).Where("category = ?", category).Count(&count)
	} else {
		models.DB.Model(models.Events{}).Count(&count)
	}

	c.JSON(http.StatusOK, gin.H{"data": count})
}

func GetEventCategories(c *gin.Context) {
	var categories []EventCategoryResult
	models.DB.Model(models.Events{}).Select("distinct(events.category)").Scan(&categories)
	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func GetSingleEvent(c *gin.Context) {
	var event EventResult
	models.DB.Model(models.Events{}).Select("events.event_id, events.created_at, events.title, events.description, events.event_date, events.location, events.category, photos.photo_url").Joins("left join photos on events.event_id = photos.event_id").Where("events.event_id = ?", c.Param("eventId")).Scan(&event)
	c.JSON(http.StatusOK, gin.H{"data": event})
}

func CreateEvent(c *gin.Context) {
	// Validate input
	var input CreateEventInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	// Create event
	event := models.Events{Title: input.Title, Description: input.Description, Event_Date: input.Event_Date, Location: input.Location, Category: input.Category}
	if err := models.DB.Create(&event).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creation of event failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": event})
}
