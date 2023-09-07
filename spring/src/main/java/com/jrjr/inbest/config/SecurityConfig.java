package com.jrjr.inbest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.filter.CorsFilter;

import com.jrjr.inbest.jwt.filter.JwtAuthenticationFilter;
import com.jrjr.inbest.jwt.filter.JwtExceptionFilter;
import com.jrjr.inbest.jwt.handler.JwtAccessDeniedHandler;
import com.jrjr.inbest.jwt.service.JwtProvider;
import com.jrjr.inbest.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.jrjr.inbest.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.jrjr.inbest.oauth.service.OAuth2UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

	private final CorsFilter corsFilter;
	private final JwtExceptionFilter jwtExceptionFilter;
	private final JwtProvider jwtProvider;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final OAuth2UserService oAuth2UserService;
	private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.csrf(AbstractHttpConfigurer::disable)
			.sessionManagement((sessionManagement) ->
				sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.formLogin(AbstractHttpConfigurer::disable)
			.httpBasic(AbstractHttpConfigurer::disable);

		http.authorizeHttpRequests((authorizeHttpRequests) ->
			authorizeHttpRequests
				.anyRequest().permitAll());

		http.logout(httpSecurityLogoutConfigurer ->
			httpSecurityLogoutConfigurer.logoutSuccessUrl("/login")
		);

		http.addFilterBefore(corsFilter, LogoutFilter.class)
			.addFilterBefore(jwtExceptionFilter, JwtAuthenticationFilter.class)
			.addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);

		http.exceptionHandling(
			httpSecurityExceptionHandlingConfigurer -> httpSecurityExceptionHandlingConfigurer.accessDeniedHandler(
				jwtAccessDeniedHandler));

		http.oauth2Login((oAuth2LoginConfigurer) ->
			oAuth2LoginConfigurer
				.loginPage("/login")
				.userInfoEndpoint((userInfoEndpointConfig) ->
					userInfoEndpointConfig.userService(oAuth2UserService))
				.successHandler(oAuth2AuthenticationSuccessHandler)
				.failureHandler(oAuth2AuthenticationFailureHandler)
		);

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
