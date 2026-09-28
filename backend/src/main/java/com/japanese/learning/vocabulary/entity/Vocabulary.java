package com.japanese.learning.vocabulary.entity;

import com.japanese.learning.common.entity.BaseTimeEntity;
import com.japanese.learning.lesson.entity.Lesson;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vocabularies")
public class Vocabulary extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(nullable = false, length = 255)
    private String hiragana;

    @Column(length = 255)
    private String kanji;

    @Column(name = "han_viet", length = 255)
    private String hanViet;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String meaning;

    @Column(name = "part_of_speech", length = 100)
    private String partOfSpeech;

    @Column(name = "audio_url", length = 500)
    private String audioUrl;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
