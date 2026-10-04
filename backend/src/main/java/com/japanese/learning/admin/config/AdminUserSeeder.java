package com.japanese.learning.admin.config;

import com.japanese.learning.user.entity.User;
import com.japanese.learning.user.enums.Role;
import com.japanese.learning.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@Order(1)
@RequiredArgsConstructor
public class AdminUserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@gmail.com}")
    private String adminEmail;

    @Value("${app.admin.password:admin123}")
    private String adminPassword;

    @Value("${app.admin.full-name:Administrator}")
    private String adminFullName;

    @Override
    @Transactional
    public void run(String... args) {
        String email = adminEmail.trim().toLowerCase();
        userRepository.findByEmail(email).ifPresentOrElse(
                user -> {
                    boolean changed = false;
                    if (user.getRole() != Role.ADMIN) {
                        user.setRole(Role.ADMIN);
                        changed = true;
                    }
                    if (!Boolean.TRUE.equals(user.getStatus())) {
                        user.setStatus(true);
                        changed = true;
                    }
                    if (changed) {
                        userRepository.save(user);
                        log.info("Đã cập nhật quyền ADMIN và kích hoạt cho tài khoản: {}", email);
                    }
                },
                () -> {
                    User admin = new User();
                    admin.setEmail(email);
                    admin.setPasswordHash(passwordEncoder.encode(adminPassword));
                    admin.setFullName(adminFullName);
                    admin.setRole(Role.ADMIN);
                    admin.setStatus(true);
                    userRepository.save(admin);
                    log.info("Đã tự động khởi tạo tài khoản ADMIN mặc định: {} / {}", email, adminPassword);
                }
        );
    }
}
