package io.deep.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.deep.model.entity.PostEntity;

@Repository
public interface PostRecpository extends JpaRepository<PostEntity, Integer>{

}
