package io.deepstory.model.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.AccountEntity;

@Repository
public interface AccountRepository extends CrudRepository<AccountEntity, Integer> {

	// 중복 가입 방지 위해서 확인
    boolean existsByAccountEmail(String accountEmail);

    Optional<AccountEntity> findByAccountEmail(String accountEmail);
    
    @Query("select count(a.accountGender) from AccountEntity a group by a.accountGender")
    List<Integer> getCountGender();
    
    @Query("select count(a.accountId) from AccountEntity a")
    int getTotalUser();
    
    @Query("select year(a.accountDate) from AccountEntity a where a.accountGender = 'F'")
    List<String> getYearF();
    
    @Query("select year(a.accountDate) from AccountEntity a where a.accountGender = 'M'")
    List<String> getYearM();

//    List<String> findAccountDate();
}