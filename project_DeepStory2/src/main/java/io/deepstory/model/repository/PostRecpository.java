package io.deepstory.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.PostEntity;
import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface PostRecpository extends JpaRepository<PostEntity, Integer>{

//    @Modifying
//    @Query("select p.postId from PostEntity p where postName = :postName and postContents = :postContents and accountId = :accountId")
//    int findPostId(@Param("postName") String postName, @Param("postContents") String postContents, @Param("accountId") int accountId);
}
