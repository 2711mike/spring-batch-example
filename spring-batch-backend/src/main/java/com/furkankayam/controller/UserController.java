package com.furkankayam.controller;

import com.furkankayam.dto.request.UserRequestDto;
import com.furkankayam.dto.response.UserResponseDto;
import com.furkankayam.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // --- POST Create User ---
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.createUser(userRequestDto));
    }

    // --- GET Users ---
    @GetMapping
    public ResponseEntity<Page<UserResponseDto>> getAllUsers(
            @RequestParam(defaultValue = "0") int page
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.findAll(page));
    }
}
