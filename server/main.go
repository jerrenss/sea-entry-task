package main

import (
	"event-server/controllers"
	"event-server/models"
	// "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
)

var Router *gin.Engine

func main() {
	Router = gin.Default()
	Router.Static("/uploads", "./uploads")
	// Router.Use(cors.Default())

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

	// Auth Routes
	Router.GET("/api/auth/user", controllers.ValidateAuth(), controllers.IsLoggedInUser)
	Router.GET("/api/auth/admin", controllers.ValidateAuth(), controllers.ValidateAdmin(), controllers.IsLoggedInAdmin)

	// User Routes
	Router.GET("/api/users", controllers.ValidateAuth(), controllers.GetAllUsers)
	Router.GET("/api/users/current", controllers.ValidateAuth(), controllers.GetSingleUser)
	Router.POST("/api/users/create", controllers.CreateUser)
	Router.POST("/api/users/login", controllers.LoginUser)
	Router.GET("/api/users/signout", controllers.ValidateAuth(), controllers.SignoutUser)

	// Event Routes
	Router.GET("/api/events", controllers.ValidateAuth(), controllers.GetAllEvents)
	Router.GET("/api/events/count", controllers.ValidateAuth(), controllers.GetEventsCount)
	Router.GET("/api/events/:eventId", controllers.ValidateAuth(), controllers.GetSingleEvent)
	Router.POST("/api/events/create", controllers.ValidateAuth(), controllers.ValidateAdmin(), controllers.CreateEvent)

	// Photo Routes
	Router.GET("/api/photos", controllers.ValidateAuth(), controllers.GetAllPhotos)
	Router.GET("/api/photos/:eventId", controllers.ValidateAuth(), controllers.GetEventPhotos)
	Router.POST("/api/photos/uploadSingle", controllers.ValidateAuth(), controllers.UploadSinglePhoto)
	Router.POST("/api/photos/uploadMultiple", controllers.ValidateAuth(), controllers.UploadMultiplePhotos)

	// Registers Routes
	Router.GET("/api/registers", controllers.ValidateAuth(), controllers.GetAllRegistrations)
	Router.GET("/api/registers/event/:eventId", controllers.ValidateAuth(), controllers.GetEventRegistrations)
	Router.GET("/api/registers/create/:eventId", controllers.ValidateAuth(), controllers.CreateRegistration)
	Router.DELETE("/api/registers/delete/:eventId", controllers.ValidateAuth(), controllers.DeleteRegistration)
	Router.POST("/api/registers/createManual", controllers.CreateRegistrationManual)

	// Likes Routes
	Router.GET("/api/likes", controllers.ValidateAuth(), controllers.GetAllLikes)
	Router.GET("/api/likes/event/:eventId", controllers.ValidateAuth(), controllers.GetEventLikes)
	Router.GET("/api/likes/create/:eventId", controllers.ValidateAuth(), controllers.CreateLike)
	Router.DELETE("/api/likes/delete/:eventId", controllers.ValidateAuth(), controllers.DeleteLike)
	Router.POST("/api/likes/create", controllers.CreateLikeManual)

	// Comments Routes
	Router.GET("/api/comments", controllers.ValidateAuth(), controllers.GetAllComments)
	Router.GET("/api/comments/event/:eventId", controllers.ValidateAuth(), controllers.GetEventComments)
	Router.POST("/api/comments/create", controllers.ValidateAuth(), controllers.CreateComment)
	Router.POST("/api/comments/createManual", controllers.ValidateAuth(), controllers.CreateCommentManual)

	if err := Router.Run(":5000"); err != nil {
		log.Fatal("Error launching API server")
	}
}
