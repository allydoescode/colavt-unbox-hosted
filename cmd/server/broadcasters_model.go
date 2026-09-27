package main

import (
	"database/sql"
	"time"
	"uuid"

	"golang.org/x/oauth2"
)

type Broadcaster struct {
	UserID       string `json:"user_id"`
	Username     string `json:"username"`
	OverlayToken string `json:"overlay_token"`
	RewardID     string `json:"reward_id"`
}

func CreateBroadcaster(broadcaster Broadcaster, tok *oauth2.Token) error {
	_, err := DB.Exec(
		`INSERT INTO broadcasters VALUES (?, ?, ?, ?, ?, ?, ?)`,
		broadcaster.UserID,
		broadcaster.Username,
		tok.AccessToken,
		tok.RefreshToken,
		tok.Expiry.Unix(),
		broadcaster.OverlayToken,
		broadcaster.RewardID,
	)
	if err != nil {
		return err
	}
	return nil
}

func UpdateOverlayTokenForID(userId string) (string, error) {
	overlayToken := uuid.NewV4().String()
	_, err := DB.Exec(`UPDATE broadcasters SET overlay_token = ? WHERE user_id = ?`, overlayToken, userId)
	if err != nil {
		return "", err
	}
	return overlayToken, nil
}

func UpdateRewardIDForID(userId string, rewardId string) error {
	_, err := DB.Exec(`UPDATE broadcasters SET reward_id = ? WHERE user_id = ?`, rewardId, userId)
	if err != nil {
		return err
	}
	return nil
}

func GetTokenForID(userId string) (*oauth2.Token, error) {
	tok := oauth2.Token{}
	row := DB.QueryRow(`SELECT access_token, refresh_token, expiry FROM broadcasters WHERE user_id = ?`, userId)

	var tempExpiry int64
	err := row.Scan(
		&tok.AccessToken,
		&tok.RefreshToken,
		&tempExpiry,
	)
	tok.Expiry = time.Unix(tempExpiry, 0)

	if err != nil {
		if err == sql.ErrNoRows {
			return &oauth2.Token{}, nil
		}
		return nil, err
	}

	return &tok, nil
}

func UpdateTokenForID(userId string, tok *oauth2.Token) error {
	_, err := DB.Exec(
		`UPDATE broadcasters SET access_token = ?, refresh_token = ?, expiry = ? WHERE user_id = ?`,
		tok.AccessToken,
		tok.RefreshToken,
		tok.Expiry.Unix(),
		userId,
	)
	if err != nil {
		return err
	}

	return nil
}

func GetBroadcasterByID(userId string) (*Broadcaster, error) {
	broadcaster := Broadcaster{}
	row := DB.QueryRow(`SELECT user_id, username, overlay_token, reward_id FROM broadcasters WHERE user_id = ?`, userId)

	err := row.Scan(
		&broadcaster.UserID,
		&broadcaster.Username,
		&broadcaster.OverlayToken,
		&broadcaster.RewardID,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return &Broadcaster{}, nil
		}
		return nil, err
	}

	return &broadcaster, nil
}

func CountBroadcasterByID(userId string) (int, error) {
	count := 0
	row := DB.QueryRow(`SELECT COUNT(*) FROM broadcasters WHERE user_id = ?`, userId)
	err := row.Scan(&count)
	if err != nil {
		return count, err
	}

	return count, nil
}

func DeleteBroadcasterByID(userId string) error {
	_, err := DB.Exec(`DELETE FROM broadcasters WHERE user_id = ?`, userId)
	return err
}
