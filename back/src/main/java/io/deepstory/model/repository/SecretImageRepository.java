package io.deepstory.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.SecretImageEntity;
import io.deepstory.model.entity.SecretPostEntity;

@Repository
public interface SecretImageRepository extends JpaRepository<SecretImageEntity, Integer> {

	@Query("select e from SecretImageEntity e where e.secretPostId = :secretPostId")
	SecretImageEntity findImageName(@Param("secretPostId") SecretPostEntity p);

    }
