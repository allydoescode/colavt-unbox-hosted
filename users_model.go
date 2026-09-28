package main

import "database/sql"

type User struct {
	OpaqueUserID string `json:"opaque_user_id"`
	UserID       string `json:"user_id"`
}

func CreateUser(user User) error {
	_, err := DB.Exec(`INSERT INTO users VALUES (?, ?)`, user.OpaqueUserID, user.UserID)
	if err != nil {
		return err
	}
	return nil
}

func GetUserForOpaqueID(opaqueUserId string) (*User, error) {
	user := User{}
	row := DB.QueryRow(`SELECT * FROM users WHERE opaque_user_id = ?`, opaqueUserId)
	err := row.Scan(user.OpaqueUserID, user.UserID)
	if err != nil {
		if err == sql.ErrNoRows {
			return &User{}, nil
		}
		return nil, err
	}

	return &user, nil
}
