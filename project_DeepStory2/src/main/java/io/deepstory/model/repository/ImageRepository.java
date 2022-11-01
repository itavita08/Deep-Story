package io.deepstory.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.entity.ImageEntity;
import io.deepstory.model.entity.PostEntity;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer>  {

    String findImageNameByPostId(int postId);
    
  @Query("select e from ImageEntity e where e.postId = :postId")
  ImageEntity findImageName(@Param("postId") PostEntity postEntity);

}
