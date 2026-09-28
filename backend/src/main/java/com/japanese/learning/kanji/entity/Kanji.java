package com.japanese.learning.kanji.entity;

import com.japanese.learning.common.entity.BaseTimeEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "kanjis")
public class Kanji extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String kanji;

    @Column(name = "han_viet", length = 100)
    private String hanViet;

    @Column(length = 255)
    private String onyomi;

    @Column(length = 255)
    private String kunyomi;

    @Column(columnDefinition = "TEXT")
    private String meaning;

    @Column(name = "stroke_count")
    private Integer strokeCount;

    @Column(name = "stroke_order_url", length = 500)
    private String strokeOrderUrl;

    @Column(columnDefinition = "TEXT")
    private String mnemonic;

    @Column(name = "mnemonic_image_url", length = 500)
    private String mnemonicImageUrl;

    @OneToMany(
            mappedBy = "kanji",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<LessonKanji> lessonKanjis = new ArrayList<>();

    @OneToMany(
            mappedBy = "kanji",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<KanjiCompound> compounds = new ArrayList<>();
}
