package main

import "time"

type CustomReward struct {
	// RewardID the ID that uniquely identifies the custom reward.
	RewardID string `json:"id"`
	// BroadcasterID is the ID of the broadcaster that created the custom reward.
	BroadcasterID string `json:"broadcaster_id"`
	// BroadcasterLogin is the login name of the broadcaster that created the custom reward.
	BroadcasterLogin string `json:"broadcaster_login"`
	// BroadcasterName is the display name of the broadcaster that created the custom reward.
	BroadcasterName string `json:"broadcaster_name"`
	// BackgroundColor is a hex formatted color code representing the background color of the reward.
	BackgroundColor string `json:"background_color"`
	// Title is the title of the custom reward.
	Title string `json:"title"`
	// Prompt is the prompt for the custom reward.
	Prompt string `json:"prompt"`
	// Image is a set of images for the custom reward.
	// Image *SizedImage `json:"image"`
	// DefaultImage is a set of default images for the custom reward.
	// DefaultImage SizedImage `json:"default_image"`
	// MaxPerStreamSetting is the setting for the custom rewards maximum number of redemptions per stream.
	MaxPerStreamSetting CustomRewardMaxPerStreamSetting `json:"max_per_stream_setting"`
	// MaxPerUserPerStreamSetting is the setting for the custom rewards maximum number of redemptions per user per stream.
	MaxPerUserPerStreamSetting CustomRewardMaxPerUserPerStreamSetting `json:"max_per_user_per_stream_setting"`
	// GlobalCooldownSetting is the setting for the custom rewards global cooldown.
	GlobalCooldownSetting CustomRewardGlobalCooldownSetting `json:"global_cooldown_setting"`
	// Cost is the cost of the custom reward.
	Cost int64 `json:"cost"`
	// TimesRedeemedThisStream is the number of redemptions of the reward in the current stream.
	TimesRedeemedThisStream int `json:"redemptions_redeemed_current_stream"`
	// Enabled indicates whether the custom reward is enabled.
	Enabled bool `json:"is_enabled"`
	// Paused indicates whether the custom reward is paused.
	Paused bool `json:"is_paused"`
	// InStock indicates whether the custom reward is currently in stock.
	InStock bool `json:"is_in_stock"`
	// IsUserInputRequired indicates whether the custom reward requires user input.
	IsUserInputRequired bool `json:"is_user_input_required"`
	// RedemptionsSkipRequestQueue indicates whether redemptions for the reward skip the request queue.
	RedemptionsSkipRequestQueue bool `json:"should_redemptions_skip_request_queue"`
	// CooldownExpiresAt is the UTC timestamp of when the cooldown for the reward expires.
	CooldownExpiresAt *time.Time `json:"cooldown_expires_at,omitempty"`
}

// CustomRewardMaxPerStreamSetting represents the maximum redemptions per stream setting for a custom reward.
type CustomRewardMaxPerStreamSetting struct {
	// Enabled  indicates whether the max redemptions per stream setting is enabled.
	Enabled bool `json:"is_enabled"`
	// Value is the maximum number of redemptions a user can make per stream.
	Value int64 `json:"max_per_stream"`
}

// CustomRewardMaxPerUserPerStreamSetting represents the per user per stream setting for a custom reward.
type CustomRewardMaxPerUserPerStreamSetting struct {
	// Enabled indicates whether the max per user per stream setting is enabled.
	Enabled bool `json:"is_enabled"`
	// Value is the maximum number of redemptions a user can make per stream.
	Value int64 `json:"max_per_user_per_stream"`
}

// CustomRewardGlobalCooldownSetting represents the global cooldown setting for a custom reward.
type CustomRewardGlobalCooldownSetting struct {
	// Enabled indicates whether the global cooldown setting is enabled.
	Enabled bool `json:"is_enabled"`
	// Value is the length of the global cooldown in seconds.
	Value int64 `json:"global_cooldown_seconds"`
}

// CustomRewardRedemption represents a Twitch Channel Point custom reward redemption.
type CustomRewardRedemption struct {
	// ID is the ID that uniquely identifies the custom reward redemption.
	ID string `json:"id"`
	// BroadcasterID is the ID of the broadcaster that created the custom reward.
	BroadcasterID string `json:"broadcaster_id"`
	// BroadcasterLogin is the login name of the broadcaster that created the custom reward.
	BroadcasterLogin string `json:"broadcaster_login"`
	// BroadcasterName is the display name of the broadcaster that created the custom reward.
	BroadcasterName string `json:"broadcaster_name"`
	// UserID is the ID of the user that redeemed the custom reward.
	UserID string `json:"user_id"`
	// UserLogin is the login name of the user that redeemed the custom reward.
	UserLogin string `json:"user_login"`
	// UserName is the display name of the user that redeemed the custom reward.
	UserName string `json:"user_name"`
	// UserInput is the user input provided by the user when redeeming the custom reward.
	UserInput string `json:"user_input"`
	// Status is the current status of the custom reward redemption.
	Status string `json:"status"`
	// Reward is basic information about the custom reward that was redeemed.
	Reward RedemptionRewardInfo `json:"reward"`
	// RedeemedAt is the UTC timestamp of when the custom reward was redeemed.
	RedeemedAt time.Time `json:"redeemed_at"`
}

// RedemptionRewardInfo represents basic reward info for a custom reward redemption.
type RedemptionRewardInfo struct {
	// RewardID is the ID of the custom reward.
	RewardID string `json:"id"`
	// Title is the title of the custom reward.
	Title string `json:"title"`
	// Prompt is the prompt of the custom reward.
	Prompt string `json:"prompt"`
	// Cost is the cost of the custom reward.
	Cost int64 `json:"cost"`
}
