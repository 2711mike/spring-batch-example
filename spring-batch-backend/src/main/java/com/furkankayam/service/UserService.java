package com.furkankayam.service;

import com.furkankayam.dto.request.UserRequestDto;
import com.furkankayam.dto.response.UserResponseDto;
import com.furkankayam.mapper.UserMapper;
import com.furkankayam.model.User;
import com.furkankayam.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserResponseDto createUser(UserRequestDto userRequestDto) {
        User user = userMapper.toUser(userRequestDto);
        userRepository.save(user);
        return userMapper.toUserResponseDto(user);
    }

    public Page<UserResponseDto> findAll(int page) {
        Pageable pageable = PageRequest.of(page, 100);
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(userMapper::toUserResponseDto);
    }
}
