package main

import (
	"event-server/controllers"
	"event-server/models"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
)

var Router *gin.Engine

func main() {
	Router = gin.Default()
	Router.Static("/uploads", "./uploads")

	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	models.SetupDB()

	api := Router.Group("/api")
	{
		api.GET("/", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "Welcome to the Event App server!",
			})
		})
	}

	// User Routes
	Router.GET("/api/users", controllers.GetAllUsers)
	Router.GET("/api/users/:userId", controllers.GetSingleUser)
	Router.POST("/api/users/create", controllers.CreateUser)
	Router.POST("/api/users/login", controllers.LoginUser)
	Router.GET("/api/users/signout", controllers.SignoutUser)

	// Event Routes
	Router.GET("/api/events", controllers.GetAllEvents)
	Router.GET("/api/events/:eventId", controllers.GetSingleEvent)
	Router.POST("/api/events/create", controllers.CreateEvent)

	// Photo Routes
	Router.GET("/api/photos", controllers.GetAllPhotos)
	Router.GET("/api/photos/:eventId", controllers.GetEventPhotos)
	Router.POST("/api/photos/uploadSingle", controllers.UploadSinglePhoto)
	Router.POST("/api/photos/uploadMultiple", controllers.UploadMultiplePhotos)

	// Registers Routes
	Router.GET("/api/registers", controllers.GetAllRegistrations)
	Router.GET("/api/registers/event/:eventId", controllers.GetEventRegistrations)
	Router.POST("/api/registers/create", controllers.CreateRegistration)

	// Likes Routes
	Router.GET("/api/likes", controllers.GetAllLikes)
	Router.GET("/api/likes/event/:eventId", controllers.GetEventLikes)
	Router.POST("/api/likes/create", controllers.CreateLike)

	// Comments Routes
	Router.GET("/api/comments", controllers.GetAllComments)
	Router.GET("/api/comments/event/:eventId", controllers.GetEventComments)
	Router.POST("/api/comments/create", controllers.CreateComment)

	if err := Router.Run(":5000"); err != nil {
		log.Fatal("Error launching API server")
	}
}
