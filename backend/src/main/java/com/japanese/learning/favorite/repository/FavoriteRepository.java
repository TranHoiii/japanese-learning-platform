package com.japanese.learning.favorite.repository;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.favorite.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Favorite> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<Favorite> findByUserIdAndId(Long userId, Long id);

    Optional<Favorite> findByIdAndUserId(Long id, Long userId);

    Optional<Favorite> findByUserIdAndContentTypeAndContentId(Long userId, ContentType contentType, Long contentId);

    boolean existsByUserIdAndContentTypeAndContentId(Long userId, ContentType contentType, Long contentId);
}
