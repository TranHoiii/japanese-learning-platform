package com.japanese.learning.admin.config;

import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminUserSeederTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AdminUserSeeder adminUserSeeder;

    @Test
    @DisplayName("1. Khi không cấu hình ADMIN_EMAIL hoặc ADMIN_PASSWORD: bỏ qua và không tạo user")
    void testRun_MissingCredentials_SkipsGracefully() {
        ReflectionTestUtils.setField(adminUserSeeder, "adminEmail", "");
        ReflectionTestUtils.setField(adminUserSeeder, "adminPassword", "");
        ReflectionTestUtils.setField(adminUserSeeder, "adminFullName", "Administrator");

        adminUserSeeder.run();

        verify(userRepository, never()).findByEmail(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("2. Khi ADMIN_PASSWORD quá ngắn (< 6 ký tự): bỏ qua và không tạo user")
    void testRun_ShortPassword_SkipsGracefully() {
        ReflectionTestUtils.setField(adminUserSeeder, "adminEmail", "admin@example.com");
        ReflectionTestUtils.setField(adminUserSeeder, "adminPassword", "123");
        ReflectionTestUtils.setField(adminUserSeeder, "adminFullName", "Administrator");

        adminUserSeeder.run();

        verify(userRepository, never()).findByEmail(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("3. Khi có đủ cấu hình và user chưa tồn tại: tạo mới user ADMIN với mật khẩu đã băm BCrypt")
    void testRun_ValidCredentials_UserNotExists_CreatesAdmin() {
        ReflectionTestUtils.setField(adminUserSeeder, "adminEmail", "admin@example.com");
        ReflectionTestUtils.setField(adminUserSeeder, "adminPassword", "secureAdminPassword123");
        ReflectionTestUtils.setField(adminUserSeeder, "adminFullName", "Quản Trị Viên");

        when(userRepository.findByEmail("admin@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("secureAdminPassword123")).thenReturn("$2a$10$hashedSecurePassword");

        adminUserSeeder.run();

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());

        User created = captor.getValue();
        assertEquals("admin@example.com", created.getEmail());
        assertEquals("$2a$10$hashedSecurePassword", created.getPasswordHash());
        assertEquals("Quản Trị Viên", created.getFullName());
        assertEquals(Role.ADMIN, created.getRole());
        assertTrue(created.getStatus());
        assertNotEquals("secureAdminPassword123", created.getPasswordHash(), "Mật khẩu tuyệt đối không được lưu dạng plaintext");
    }

    @Test
    @DisplayName("4. Khi user đã tồn tại nhưng có role USER: nâng cấp lên ROLE_ADMIN và kích hoạt status")
    void testRun_ValidCredentials_UserExistsAsUser_PromotesToAdmin() {
        ReflectionTestUtils.setField(adminUserSeeder, "adminEmail", "admin@example.com");
        ReflectionTestUtils.setField(adminUserSeeder, "adminPassword", "secureAdminPassword123");
        ReflectionTestUtils.setField(adminUserSeeder, "adminFullName", "Administrator");

        User existingUser = new User();
        existingUser.setId(10L);
        existingUser.setEmail("admin@example.com");
        existingUser.setPasswordHash("$2a$10$existingHash");
        existingUser.setRole(Role.USER);
        existingUser.setStatus(false);

        when(userRepository.findByEmail("admin@example.com")).thenReturn(Optional.of(existingUser));

        adminUserSeeder.run();

        verify(userRepository).save(existingUser);
        assertEquals(Role.ADMIN, existingUser.getRole());
        assertTrue(existingUser.getStatus());
    }

    @Test
    @DisplayName("5. Khi user đã là ADMIN và active: không cần gọi save lại")
    void testRun_ValidCredentials_UserAlreadyAdminAndActive_DoesNotSave() {
        ReflectionTestUtils.setField(adminUserSeeder, "adminEmail", "admin@example.com");
        ReflectionTestUtils.setField(adminUserSeeder, "adminPassword", "secureAdminPassword123");
        ReflectionTestUtils.setField(adminUserSeeder, "adminFullName", "Administrator");

        User existingAdmin = new User();
        existingAdmin.setId(10L);
        existingAdmin.setEmail("admin@example.com");
        existingAdmin.setPasswordHash("$2a$10$existingHash");
        existingAdmin.setRole(Role.ADMIN);
        existingAdmin.setStatus(true);

        when(userRepository.findByEmail("admin@example.com")).thenReturn(Optional.of(existingAdmin));

        adminUserSeeder.run();

        verify(userRepository, never()).save(any(User.class));
    }
}
