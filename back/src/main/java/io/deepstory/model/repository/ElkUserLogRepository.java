package io.deepstory.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.ElkUserLogEntity;

@Repository
public interface ElkUserLogRepository extends JpaRepository<ElkUserLogEntity, Integer> {

    @Query("select count(hour(e.elkLoginTime)) from ElkUserLogEntity e group by hour (elkLoginTime) order by hour (elkLoginTime) ")
    List<Integer> getTime();
    
    @Query("select count(hour(e.elkLoginTime)) from ElkUserLogEntity e where month(e.elkLoginTime) = 1 group by hour (elkLoginTime) order by hour (elkLoginTime) ")
    List<Integer> getTime1();
    
    @Query("select count(hour(e.elkLoginTime)) from ElkUserLogEntity e where month(e.elkLoginTime) = 2 group by hour (elkLoginTime) order by hour (elkLoginTime) ")
    List<Integer> getTime2();
    
}