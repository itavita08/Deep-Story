package io.playdata.lo.model.repositoy;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.playdata.lo.domain.etity.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {

	// 중복 가입 방지 위해서 확인
    boolean existsByAccountEmail(String accountEmail);

    Optional<Account> findByAccountEmail(String accountEmail);
}