package com.brainwave.backend.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTService {
    @Value("${jwt.expiration}")
    private long expiration;
    @Value("${jwt.token}")
    private String jwtSecretKey;

    public Date getExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public String getUserName(String token){
        return extractClaim(token, Claims::getSubject);
    }

    private <R> R extractClaim(String token, Function<Claims, R> function){
        Claims allClaims = extractAllClaims(token);
        return function.apply(allClaims);
    }

    public String generateToken(String username){
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration ))
                .signWith(getSignKey())
                .compact();
    }

    private Claims extractAllClaims(String token){

        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignKey(){
        byte[] decodedString = Base64.getDecoder().decode(jwtSecretKey);
        return Keys.hmacShaKeyFor(decodedString);
    }
}
