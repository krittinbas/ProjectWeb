package hostMangerkey

import (
	"API/encode"
	"API/historykey"
	"database/sql"

	"github.com/gin-gonic/gin"
)

var HostMangerDb *sql.DB

func ListMemberJoinkey(c *gin.Context) {
	codeKey := c.DefaultQuery("codeKey", "")
	query := "select A.email,AK.id from accounts_has_key AK,accounts A,mykey MK where AK.mykey_codeKey = MK.codeKey and Mk.codeKey= ? and A.id = AK.accounts_id and MK.idhostkey != A.id;"
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
	query := "UPDATE mykey set idhostkey= (select id from accounts where email = ?) where codeKey = ?"
	row, err := HostMangerDb.Query(query, email, codeKey)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	row.Close()
	c.JSON(200, gin.H{"data": "susees"})
	historykey.ReportSend(codeKey, "Host tranfer to "+encode.Decode(email))
}

func Kick(c *gin.Context) {
	idaccountskey := c.PostForm("idaccountskey")
	query := "select mykey_codekey , (select email from accounts where id = accounts_id) from accounts_has_key where id = ?"
	rows := HostMangerDb.QueryRow(query, idaccountskey)
	var email string
	var codeKey string
	rows.Scan(&codeKey, &email)
	historykey.ReportSend(codeKey, "host was kick "+encode.Decode(email))
	query = "DELETE FROM accounts_has_key WHERE (id = ?)"
	row, err := HostMangerDb.Query(query, idaccountskey)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	row.Close()
	c.JSON(200, gin.H{"data": "susees"})

}
