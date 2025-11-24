package com.furkankayam.mapper;

import com.furkankayam.dto.request.UserRequestDto;
import com.furkankayam.dto.response.UserResponseDto;
import com.furkankayam.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class UserMapper {

    public abstract User toUser(UserRequestDto userRequestDto);
    public abstract UserResponseDto toUserResponseDto(User user);

    // --- List ---
    public abstract List<User> toUserList(List<UserRequestDto> userRequestDtos);
    public abstract List<UserResponseDto> toUserResponseDtoList(List<User> users);
}
