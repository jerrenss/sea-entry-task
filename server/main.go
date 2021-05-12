package main

import (
	"event-server/controllers"
	"event-server/models"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var Router *gin.Engine

func main() {
	Router = gin.Default()
	godotenv.Load()
	models.SetupDB()

	api := Router.Group("/api")
	{
		api.GET("/test", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "test successful",
			})
		})
	}

	// Registers Routes
	Router.GET("/api/registers/getAllRegistrations", controllers.GetAllRegistrations)
	Router.GET("/api/registers/getEventRegistrations/:eventId", controllers.GetEventRegistrations)
	Router.POST("/api/registers/createRegistration", controllers.CreateRegistration)

	// Likes Routes
	Router.GET("/api/likes/getAllLikes", controllers.GetAllLikes)
	Router.GET("/api/likes/getEventLikes/:eventId", controllers.GetEventLikes)
	Router.POST("/api/likes/createLike", controllers.CreateLike)

	// Comments Routes
	Router.GET("/api/comments/getAllComments", controllers.GetAllComments)
	Router.GET("/api/comments/getEventComments/:eventId", controllers.GetEventComments)
	Router.POST("/api/comments/createComment", controllers.CreateComment)

	// User Routes
	Router.GET("/api/users/getAllUsers", controllers.GetAllUsers)
	Router.GET("/api/users/getSingleUser/:userId", controllers.GetSingleUser)
	Router.POST("/api/users/createUser", controllers.CreateUser)
	Router.POST("/api/users/loginUser", controllers.LoginUser)

	// Event Routes
	Router.GET("/api/events/getAllEvents", controllers.GetAllEvents)
	Router.GET("/api/events/getSingleEvent/:eventId", controllers.GetSingleEvent)
	Router.POST("/api/events/createEvent", controllers.CreateEvent)

	// Photo Routes
	Router.GET("/api/photos/getAllPhotos", controllers.GetAllPhotos)
	Router.GET("/api/photos/getEventPhotos/:eventId", controllers.GetEventPhotos)
	Router.POST("/api/photos/createPhoto", controllers.CreatePhoto)

	Router.Run(":5000")
}
