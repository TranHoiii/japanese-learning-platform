package com.japanese.learning.kaiwa.entity;

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
@Table(name = "kaiwa_lines")
public class KaiwaLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "kaiwa_id", nullable = false)
    private KaiwaContent kaiwa;

    @Column(nullable = false, length = 100)
    private String speaker;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String japanese;

    @Column(columnDefinition = "TEXT")
    private String furigana;

    @Column(columnDefinition = "TEXT")
    private String translation;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;
}
