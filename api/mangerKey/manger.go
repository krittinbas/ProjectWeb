package mangerkey

import (
	"API/encode"
	"API/historykey"
	"database/sql"
	"math/rand"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

var MangerkeyDb *sql.DB

func ChangeNickName(c *gin.Context) {
	idaccountkey := c.PostForm("idaccountkey")
	namechange := c.PostForm("name")
	query := "UPDATE accounts_has_key SET nickname = ? WHERE id = ?"
	row, _ := MangerkeyDb.Query(query, namechange, idaccountkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": row.Err().Error()})
		return
	}
	c.JSON(200, gin.H{"status": 200, "data": "You change name is " + namechange})
	row.Close()
}

func GenKey(c *gin.Context) {
	min := 100000 // 6-digit number starts with 100000
	max := 999999 // 6-digit number ends with 999999
	randomNumber := rand.Intn(max-min+1) + min
	strNum := strconv.Itoa(randomNumber)

	codeKey := c.PostForm("codeKeypp")
	query := "UPDATE mykey SET shareKey = ? WHERE (codeKey = ?);"
	row, _ := MangerkeyDb.Query(query, strNum, codeKey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": row.Err().Error()})
		return
	}
	historykey.ReportSend(codeKey, "Host genarete sherekey :****"+strNum[5:])
	c.JSON(200, gin.H{"status": 200, "shareKey": strNum}) //we can use shareKey in react
	row.Close()
}

func DeleteKey(c *gin.Context) {
	codeKey := c.PostForm("codeKeypp")
	query := "UPDATE mykey SET shareKey = null WHERE (codeKey = ?);"
	row, _ := MangerkeyDb.Query(query, codeKey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": row.Err().Error()})
		return
	}
	historykey.ReportSend(codeKey, "Host Delete shereKey")
	c.JSON(200, gin.H{"status": 200}) //we can use shareKey in react
	row.Close()
}

func ConnectionKey(c *gin.Context) {
	keyKey := c.PostForm("key")
	user := c.PostForm("user")
	query1 := "select codeKey,shareKey,idhostkey,(select id from accounts where email= ?) from mykey where codeKey =? or shareKey =?"
	row, _ := MangerkeyDb.Query(query1, user, keyKey, keyKey)
	var shareKey sql.NullString
	var idhostkey sql.NullInt16
	var codeKey string
	var id int
	err := row.Scan(&codeKey, &shareKey, &idhostkey, &id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	times := time.Now().Format("15:04:05")
	dataNow := time.Now().Format("2006-01-02")
	idaccountkey := encode.Encode(user + times + dataNow)
	row.Close()
	//host key
	if (idhostkey == sql.NullInt16{}) {
		query2 := "UPDATE mykey SET idhostkey = ? WHERE codekey = ?"
		row, _ := MangerkeyDb.Query(query2, id, codeKey)
		if row.Err() != nil {
			c.JSON(500, gin.H{"error": "Error in server. Please try again."})
			return
		}
		row.Close()
		query3 := "INSERT INTO accounts_has_key (id,accounts_id, mykey_codeKey) VALUES (?,?, ?);"
		row1, _ := MangerkeyDb.Query(query3, idaccountkey, id, codeKey)
		if row1.Err() != nil {
			c.JSON(500, gin.H{"error": "Error in server. Please try again."})
			return
		}
		c.JSON(200, gin.H{"status": 200})
		historykey.ReportSend(codeKey, "Host join")
		row1.Close()
		return
	}
	//connect from shareKey
	if (shareKey != sql.NullString{}) && (shareKey.String == keyKey) {
		if int(idhostkey.Int16) == id {
			c.JSON(500, gin.H{"error": "This key is connected. Please dont put it add"})
			return
		}
		query3 := "INSERT INTO accounts_has_key (id,accounts_id, mykey_codeKey) VALUES (?,?, ?);"
		row2, _ := MangerkeyDb.Query(query3, idaccountkey, id, codeKey)
		if row2.Err() != nil {
			c.JSON(500, gin.H{"error": "This key is connected. Please dont put it add"})
			return
		}
		c.JSON(200, gin.H{"status": 200})
		historykey.ReportSend(codeKey, encode.Decode(user)+" join Key with sherekey ****"+shareKey.String)
		row2.Close()
		return
	} else {
		c.JSON(500, gin.H{"error": "Invalid Key in server. Please try again."})
	}
}

func Disconectkey(c *gin.Context) {
	idaccountkey := c.PostForm("idaccountkey")
	query := "select a.email,ll.mykey_codekey from accounts_has_key ll,accounts a where ll.id = ? and ll.accounts_id = a.id"
	rw, _ := MangerkeyDb.Query(query, idaccountkey)
	var email string
	var codekey string
	rw.Scan(&email, &codekey)
	rw.Close()
	query = "DELETE FROM accounts_has_key WHERE id = ?"
	row, _ := MangerkeyDb.Query(query, idaccountkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": "Server api error disconnect"})
		return
	}
	c.JSON(200, gin.H{"status": 200, "data": "disconnected!"})
	historykey.ReportSend(codekey, encode.Decode(email)+" disconnect key")
	row.Close()
}
