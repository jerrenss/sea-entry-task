package controllers

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

func ExtractToken(r *http.Request) string {
	cookie, err := r.Cookie("jwt")
	if err != nil {
		return ""
	}
	return cookie.Value
}

func VerifyToken(r *http.Request) (*jwt.Token, jwt.MapClaims, error) {
	tokenString := ExtractToken(r)
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected Signing Method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("ACCESS_SECRET")), nil
	})
	if err != nil {
		return nil, nil, err
	}
	return token, claims, nil
}

func TokenValid(r *http.Request) (jwt.MapClaims, error) {
	token, claims, err := VerifyToken(r)
	if err != nil {
		return nil, err
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return nil, err
	}
	return claims, nil
}

func ValidateAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, err := TokenValid(c.Request)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorised - " + err.Error()})
			c.Abort()
			return
		}
		c.Set("is_admin", claims["is_admin"])
		c.Set("user_id", claims["user_id"])
		c.Next()
	}
}

func ValidateAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		is_admin, _ := c.Get("is_admin")
		if !is_admin.(bool) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorised access on admin resource"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func IsLoggedInUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "User logged in"})
}

func IsLoggedInAdmin(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "Admin logged in"})
}
