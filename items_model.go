package main

import (
	"database/sql"
	"errors"
)

type Item struct {
	ID          int    `json:"id"`
	ChannelID   string `json:"channel_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
	Rarity      string `json:"rarity"`
}

func CreateItem(item Item) error {
	_, err := DB.Exec(`INSERT INTO items VALUES (NULL, ?, ?, ?, ?, ?)`, item.ChannelID, item.Name, item.Description, item.ImageURL, item.Rarity)
	if err != nil {
		return err
	}
	return nil
}

func GetItems(channelId string) ([]Item, error) {
	rows, err := DB.Query(`SELECT * FROM items WHERE channel_id = ?`, channelId)
	if err != nil {
		return nil, err
	}
	if rows.Err() != nil {
		return nil, rows.Err()
	}
	defer rows.Close()

	items := []Item{}
	for rows.Next() {
		item := Item{}
		err := rows.Scan(&item.ID, &item.ChannelID, &item.Name, &item.Description, &item.ImageURL, &item.Rarity)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	return items, nil
}

func GetItemsByRarity(channelId string, rarity string) ([]Item, error) {
	rows, err := DB.Query(`SELECT * FROM items WHERE channel_id = ?`, channelId)
	if err != nil {
		return nil, err
	}
	if rows.Err() != nil {
		return nil, rows.Err()
	}
	defer rows.Close()

	items := []Item{}
	for rows.Next() {
		item := Item{}
		err := rows.Scan(&item.ID, &item.ChannelID, &item.Name, &item.Description, &item.ImageURL, &item.Rarity)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	return items, nil
}

func GetItemByID(id string) (*Item, error) {
	item := Item{}
	row := DB.QueryRow(`SELECT * FROM items WHERE id = ?`, id)

	err := row.Scan(&item.ID, &item.ChannelID, &item.Name, &item.Description, &item.ImageURL, &item.Rarity)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("item not found")
		}
		return nil, err
	}
	return &item, nil
}

func CountItemByName(name string, channelId string) (int, error) {
	count := 0
	row := DB.QueryRow(`SELECT COUNT(*) FROM items WHERE name = ? AND channel_id = ?`, name, channelId)
	err := row.Scan(&count)
	if err != nil {
		return count, err
	}

	return count, nil
}

func CountItemByImageURL(imageUrl string, channelId string) (int, error) {
	count := 0
	row := DB.QueryRow(`SELECT COUNT(*) FROM items WHERE image_url = ? AND channel_id = ?`, imageUrl, channelId)
	err := row.Scan(&count)
	if err != nil {
		return count, err
	}

	return count, nil
}

func DeleteItem(id string) error {
	_, err := DB.Exec(`DELETE FROM items WHERE id = ?`, id)
	return err
}
