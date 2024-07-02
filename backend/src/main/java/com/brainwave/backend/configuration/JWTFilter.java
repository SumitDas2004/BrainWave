package com.brainwave.backend.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTFilter extends OncePerRequestFilter {
    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    JWTService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            if(SecurityContextHolder.getContext().getAuthentication()!=null || request.getRequestURI().startsWith("/user/login") || request.getRequestURI().startsWith("/user/register") || request.getRequestURI().startsWith("/console")){
                filterChain.doFilter(request, response);
                return ;
            }
            String token = null;

            token = request.getHeader("Authorization");
            if (token != null && token.startsWith("Bearer")) {
                token = token.substring(7);
                if (!token.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null) {
                    String username = jwtService.getUserName(token);
                    Date expiration = jwtService.getExpiration(token);
                    if (expiration.after(new Date(System.currentTimeMillis()))) {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                        filterChain.doFilter(request, response);
                    }else throw new Exception();
                }else throw new Exception();
            }else throw new Exception();
        }catch (Exception e){
            e.printStackTrace();
            response.setStatus(401);
            response.setContentType("application/json");
            Map<String, String> map = new HashMap<>();
            map.put("status", "1");
            map.put("error", "Unauthorized, please login.");
            ObjectMapper om= new ObjectMapper();
            response.getWriter().write(om.writeValueAsString(map));
        }
    }
}
