package encode

import (
	"encoding/base64"
)

func Encode(txt string) string {
	return base64.StdEncoding.EncodeToString([]byte(txt))
}
func Decode(txt string) string {
	de, err := base64.StdEncoding.DecodeString(txt)
	if err != nil {
		return "Error Decoding"
	}

	return string(de)
}
