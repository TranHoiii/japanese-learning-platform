package com.japanese.learning.grammar.entity;

import com.japanese.learning.common.entity.BaseTimeEntity;
import com.japanese.learning.lesson.entity.Lesson;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "grammars")
public class Grammar extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(nullable = false, length = 255)
    private String pattern;

    @Column(columnDefinition = "TEXT")
    private String meaning;

    // Database column: usage_text
    @Column(name = "usage_text", columnDefinition = "TEXT")
    private String usage;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @OneToMany(
            mappedBy = "grammar",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy("sortOrder ASC")
    private List<GrammarExample> examples = new ArrayList<>();
}
