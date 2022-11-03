package io.deepstory.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.PostEntity;
import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface PostRecpository extends JpaRepository<PostEntity, Integer>{

//    @Query("select p.postId from postEntity p")
//    List<Integer> findAccount();
    @Query("select count(p.postId) from PostEntity p")
    int getTotalPost();
}
