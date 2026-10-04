package com.japanese.learning.review.repository;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.review.entity.ReviewItem;
import com.japanese.learning.review.enums.ReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewItemRepository extends JpaRepository<ReviewItem, Long> {

    List<ReviewItem> findByUserIdOrderByPriorityDescNextReviewAtAsc(Long userId);

    List<ReviewItem> findByUserIdAndStatusOrderByPriorityDescNextReviewAtAsc(Long userId, ReviewStatus status);

    Optional<ReviewItem> findByUserIdAndId(Long userId, Long id);

    Optional<ReviewItem> findByUserIdAndContentTypeAndContentId(Long userId, ContentType contentType, Long contentId);

    boolean existsByUserIdAndContentTypeAndContentId(Long userId, ContentType contentType, Long contentId);

    @Query("SELECT r FROM ReviewItem r WHERE r.user.id = :userId AND (r.nextReviewAt IS NULL OR r.nextReviewAt <= :now) ORDER BY r.priority DESC, r.nextReviewAt ASC, r.id ASC")
    List<ReviewItem> findDueItemsByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);

    @Query("SELECT COUNT(r) FROM ReviewItem r WHERE r.user.id = :userId AND (r.nextReviewAt IS NULL OR r.nextReviewAt <= :now)")
    long countDueItemsByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
}
