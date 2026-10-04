package com.japanese.learning.exercise.entity;

import com.japanese.learning.common.entity.BaseTimeEntity;
import com.japanese.learning.exercise.enums.ContentType;
import com.japanese.learning.exercise.enums.ExerciseType;
import com.japanese.learning.lesson.entity.Lesson;
import com.japanese.learning.progress.entity.UserAnswer;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "exercises")
public class Exercise extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "exercise_type", nullable = false, length = 50)
    private ExerciseType exerciseType;

    @Enumerated(EnumType.STRING)
    @Column(name = "content_type", nullable = false, length = 50)
    private ContentType contentType;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @OneToMany(
            mappedBy = "exercise",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy("sortOrder ASC")
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "exercise")
    private List<UserAnswer> userAnswers = new ArrayList<>();
}
