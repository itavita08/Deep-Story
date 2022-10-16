package io.playdata.lo.model.repositoy;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.playdata.lo.domain.etity.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {

    boolean existsByEmail(String email);

    Optional<Account> findByEmail(String email);
}