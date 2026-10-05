package com.japanese.learning.admin;

import com.japanese.learning.admin.controller.AdminLevelController;
import com.japanese.learning.admin.service.AdminLevelService;
import com.japanese.learning.common.security.SecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AdminLevelController.class)
@Import(SecurityConfig.class)
class AdminSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AdminLevelService adminLevelService;

    @Test
    @DisplayName("Anonymous access to /api/v1/admin/** returns 401 Unauthorized")
    void testAnonymousAccess_Returns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/levels"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Yêu cầu xác thực tài khoản"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("User with ROLE_USER access to /api/v1/admin/** returns 403 Forbidden")
    void testUserRoleAccess_Returns403() throws Exception {
        mockMvc.perform(get("/api/v1/admin/levels"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bạn không có quyền truy cập tài nguyên này"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Admin with ROLE_ADMIN access to /api/v1/admin/** returns 200 OK")
    void testAdminRoleAccess_Returns200() throws Exception {
        when(adminLevelService.getAllLevels()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/admin/levels"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Lấy danh sách cấp độ thành công"));
    }
}
