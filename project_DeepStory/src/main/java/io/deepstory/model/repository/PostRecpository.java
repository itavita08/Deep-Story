package io.deepstory.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.PostEntity;

@Repository
public interface PostRecpository extends JpaRepository<PostEntity, Integer>{

	List<PostEntity> findAllByAccountId(AccountEntity account); 
	
	
}


