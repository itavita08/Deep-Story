package io.deep.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.deep.entity.AccountEntity;

@Repository
public interface AccountRepository extends CrudRepository<AccountEntity, Integer> {
	
	int findAccountIdBy
}
