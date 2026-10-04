package com.japanese.learning.progress.repository;

import com.japanese.learning.common.enums.ContentType;
import com.japanese.learning.progress.entity.UserContentProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserContentProgressRepository extends JpaRepository<UserContentProgress, Long> {

    Optional<UserContentProgress> findByUserIdAndContentTypeAndContentId(Long userId, ContentType contentType, Long contentId);

    List<UserContentProgress> findByUserIdAndContentTypeInOrderByLastAccessedAtDesc(Long userId, Collection<ContentType> contentTypes);

    List<UserContentProgress> findByUserIdAndContentTypeOrderByLastAccessedAtDesc(Long userId, ContentType contentType);
}
