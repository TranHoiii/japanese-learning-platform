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

    @Value("${app.admin.email:${ADMIN_EMAIL:}}")
    private String adminEmail;

    @Value("${app.admin.password:${ADMIN_PASSWORD:}}")
    private String adminPassword;

    @Value("${app.admin.full-name:${ADMIN_FULL_NAME:Administrator}}")
    private String adminFullName;

    @Override
    @Transactional
    public void run(String... args) {
        if (adminEmail == null || adminEmail.isBlank() || adminPassword == null || adminPassword.isBlank()) {
            log.info("Bỏ qua tự động khởi tạo Admin: ADMIN_EMAIL hoặc ADMIN_PASSWORD chưa được cấu hình.");
            return;
        }

        if (adminPassword.length() < 6) {
            log.error("ADMIN_PASSWORD không đủ độ dài yêu cầu (tối thiểu 6 ký tự). Bỏ qua khởi tạo ADMIN.");
            return;
        }

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
                    admin.setFullName(adminFullName != null && !adminFullName.isBlank() ? adminFullName.trim() : "Administrator");
                    admin.setRole(Role.ADMIN);
                    admin.setStatus(true);
                    userRepository.save(admin);
                    log.info("Đã khởi tạo tài khoản ADMIN từ cấu hình bảo mật: {}", email);
                }
        );
    }
}
