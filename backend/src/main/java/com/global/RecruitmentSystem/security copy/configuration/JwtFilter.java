package com.global.RecruitmentSystem.security.configuration;

import com.global.RecruitmentSystem.security.service.CustomUserDetailsService;
import com.global.RecruitmentSystem.security.service.JWTService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JWTService jwtService;

    @Autowired
    ApplicationContext applicationContext;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, jakarta.servlet.FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            log.debug("JwtFilter: token extracted (len={}) for request {}", token.length(), request.getRequestURI());
            try {
                username = jwtService.extractUserName(token);
                log.debug("JwtFilter: username extracted from token: {}", username);
            } catch (JwtException ex) {
                log.warn("Invalid JWT token received in request {}: {}", request.getRequestURI(), ex.getMessage());
                // Ignore invalid JWT and continue without authentication
                filterChain.doFilter(request, response);
                return;
            }
        } else {
            log.debug("JwtFilter: no Authorization header present for request {}", request.getRequestURI());
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = applicationContext.getBean(CustomUserDetailsService.class).loadUserByUsername(username);
            if (userDetails == null) {
                log.warn("JwtFilter: no user details found for username {}", username);
            } else if (jwtService.validateToken(token, userDetails)){
                log.debug("JwtFilter: token validated for user {}", username);
                log.debug("JwtFilter: userAuthorities={} for user {}", userDetails.getAuthorities(), username);
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                log.debug("JwtFilter: authentication set. isAuthenticated={}", SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
            } else {
                log.warn("JwtFilter: token validation failed for user {}", username);
            }
        }

        filterChain.doFilter(request,response);

    }
}
