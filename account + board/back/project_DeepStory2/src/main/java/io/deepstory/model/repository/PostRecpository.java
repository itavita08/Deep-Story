package io.deepstory.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.PostEntity;

@Repository
public interface PostRecpository extends JpaRepository<PostEntity, Integer>{

}
