package io.deepstory.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.ImageEntity;
import io.deepstory.model.entity.PostEntity;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {

	String findImageNameByPostId(int postId);

	@Query("select e from ImageEntity e where e.postId = :postId")
	ImageEntity findImageName(@Param("postId") PostEntity postEntity);

    @Query("select i.imageName from ImageEntity i where i.accountId =:accountId")
    List<String> findImageNameByAccountId(@Param("accountId") AccountEntity accountEntity);
    
    List<ImageEntity> findAllByAccountId(AccountEntity accountId);
}
