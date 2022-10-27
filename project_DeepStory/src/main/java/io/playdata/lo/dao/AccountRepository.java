package io.playdata.lo.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.playdata.lo.model.domain.AccountEntity;

@Repository
public interface AccountRepository extends CrudRepository<AccountEntity, Integer> {

	// 중복 가입 방지 위해서 확인
    boolean existsByAccountEmail(String accountEmail);

    Optional<AccountEntity> findByAccountEmail(String accountEmail);
}