package controllers

import (
	"fmt"
	"strconv"
)

func ConvertStringToUint64(str string) uint64 {
	newStr, _ := strconv.ParseUint(str, 10, 64)
	return newStr
}

func ProcessUserId(user_id interface{}) uint64 {
	user_id_str := fmt.Sprintf("%v", user_id)
	return ConvertStringToUint64(user_id_str)
}
