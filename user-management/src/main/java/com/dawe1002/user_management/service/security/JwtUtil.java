package com.dawe1002.user_management.service.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final Key key =
            Keys.hmacShaKeyFor("super-secret-key-super-secret-key".getBytes());

    public static String generateToken(Integer benutzer_id) {
        return Jwts.builder()
                .setSubject(benutzer_id.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24h
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
