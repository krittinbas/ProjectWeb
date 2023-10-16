package HostMangerkey

import (
	"API/encode"
	"database/sql"

	"github.com/gin-gonic/gin"
)

var HostMangerDb *sql.DB

func ListMemberJoinkey(c *gin.Context) {
	codeKey := c.DefaultQuery("codeKey", "")
	query := "select A.email,AK.id from accounts_has_key AK,accounts A,mykey MK where key_idkey = MK.idkey and Mk.prekey= ? and A.id = AK.accounts_id"
	row, err := HostMangerDb.Query(query, codeKey)
	if err != nil {
		c.JSON(400, gin.H{"error": "This key no member join!"})
		return
	}
	MenbersList := make([]map[string]interface{}, 0)
	for row.Next() {
		var email string
		var id string
		err := row.Scan(&email, &id)
		if err != nil {
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}
		Member := map[string]interface{}{
			"idaccountskey": id,
			"email":         encode.Decode(email),
		}
		MenbersList = append(MenbersList, Member)
	}
	row.Close()
	c.JSON(200, gin.H{"data": MenbersList})
}
func TranferHost(c *gin.Context) {
	email := encode.Encode(c.PostForm("email"))
	codeKey := c.PostForm("codeKey")
	query := "UPDATE mykey set idhostkey= (select id from accounts where email = ?) where prekey = ?"
	row, err := HostMangerDb.Query(query, email, codeKey)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	row.Close()
	c.JSON(200, gin.H{"data": "susees"})
}

func Kick(c *gin.Context) {
	idaccountskey := c.PostForm("idaccountskey")
	query := "DELETE FROM accounts_has_key WHERE (id = ?)"
	row, err := HostMangerDb.Query(query, idaccountskey)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	row.Close()
	c.JSON(200, gin.H{"data": "susees"})
}
