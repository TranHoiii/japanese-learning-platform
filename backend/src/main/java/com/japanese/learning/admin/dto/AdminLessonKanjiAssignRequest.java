package com.japanese.learning.admin.dto;

import jakarta.validation.constraints.Min;

public record AdminLessonKanjiAssignRequest(
        @Min(value = 0, message = "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0")
        Integer sortOrder
) {
}
