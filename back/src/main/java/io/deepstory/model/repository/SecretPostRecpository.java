package io.deepstory.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.SecretFriendsEntity;
import io.deepstory.model.entity.SecretPostEntity;

@Repository
public interface SecretPostRecpository extends JpaRepository<SecretPostEntity, Integer>{

	List<SecretPostEntity> findAllBySecretFriendId(SecretFriendsEntity secretFriendId);
	
}
