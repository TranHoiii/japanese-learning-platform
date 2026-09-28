package com.japanese.learning.progress.entity;

import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.progress.enums.LearningStatus;
import com.japanese.learning.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        name = "user_lesson_progress",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_user_lesson_progress",
                        columnNames = {"user_id", "lesson_id"}
                )
        }
)
public class UserLessonProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(name = "progress_percent", nullable = false)
    private Integer progressPercent = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private LearningStatus status = LearningStatus.NOT_STARTED;

    @Column(name = "last_accessed_at")
    private LocalDateTime lastAccessedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
