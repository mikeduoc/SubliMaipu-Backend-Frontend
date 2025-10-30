package com.backend.sublimaipu.sublimaipu.sublimaipu.dto;

public record AuthResponse(
        String token,
        String email,
        String nombre,
        String rol) {
}