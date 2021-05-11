package main

import (
	"github.com/gin-gonic/gin"
	"event-server/models"
)

var Router *gin.Engine

func main() {
	Router = gin.Default()
	db := models.SetupDB()
	Router.Use(func(c *gin.Context) {
		c.Set("db", db)
	})
	api := Router.Group("/api")
	{
		api.GET("/test", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "test successful",
			})
		})
	}

	Router.Run(":5000")
}
