package main

import (
	"event-server/controllers"
	"event-server/models"
	"github.com/gin-gonic/gin"
)

var Router *gin.Engine

func main() {
	Router = gin.Default()
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

	Router.Run(":5000")
}
