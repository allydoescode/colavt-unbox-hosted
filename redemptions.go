package main

import (
	"context"
	"errors"
	"log"
	"maps"
	"slices"
	"sync"
)

var ErrClientDisconnected = errors.New("websocket client disconnected")

type Redemptions struct {
	mu     sync.RWMutex
	data   map[string]struct{}
	closed bool
}

func NewRedemptions(parentCtx context.Context) *Redemptions {
	return &Redemptions{data: map[string]struct{}{}, closed: false}
}

func (r *Redemptions) Set(key string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.closed {
		return ErrClientDisconnected
	}

	r.data[key] = struct{}{}
	log.Printf("event: + %s (%d)\n", key, len(r.data))
	return nil
}

func (r *Redemptions) Del(key string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.closed {
		return ErrClientDisconnected
	}

	delete(r.data, key)
	log.Printf("event: - %s (%d)\n", key, len(r.data))
	return nil
}

func (r *Redemptions) Drain() []string {
	r.mu.Lock()
	defer r.mu.Unlock()
	defer clear(r.data)
	return slices.Collect(maps.Keys(r.data))
}
