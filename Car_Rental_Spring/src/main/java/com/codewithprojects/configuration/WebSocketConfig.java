package com.codewithprojects.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // Use allowedOriginPatterns instead of setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(org.springframework.messaging.simp.config.MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue"); // Supports both topics & private queues
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user"); // Enables user-specific messages
    }
}
