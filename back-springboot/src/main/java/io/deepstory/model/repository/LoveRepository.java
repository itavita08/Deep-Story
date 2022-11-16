package io.deepstory.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.LoveEntity;
import io.deepstory.model.entity.PostEntity;

@Repository
public interface LoveRepository extends JpaRepository<LoveEntity, Integer> {

    @Query("select l.loveId from LoveEntity l where l.accountId = :accountId")
    int findAccount(@Param("accountId") AccountEntity accountEntity);
    
    @Query("select l from LoveEntity l where l.postId = :postId")
    LoveEntity findPost(@Param("postId") PostEntity postEntity);
    
    @Query("select l from LoveEntity l where l.postId = :postId")
    List<LoveEntity> findAllByPostId(@Param("postId") PostEntity postEntity);
    
    @Query("select count(l.loveId) as loveId, l.postId from LoveEntity l group by l.postId order by count(l.loveId) desc")
    List<Object[][]> findCountLove();
    
    @Query("select l.postId from LoveEntity l where l.accountId = :accountId")
    List<PostEntity> findpostIdByAccountId(@Param("accountId") AccountEntity accountEntity);
    
}