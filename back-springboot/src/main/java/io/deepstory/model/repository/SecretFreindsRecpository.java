package io.deepstory.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.SecretFriendsEntity;

@Repository
public interface SecretFreindsRecpository extends JpaRepository<SecretFriendsEntity, Integer>{

	List<SecretFriendsEntity> findAllByGuestId (AccountEntity guestId);
		
	List<SecretFriendsEntity> findByHostId(AccountEntity id);
	
	@Query(value = "select * from secret_friends where host_id = :#{#hostId.accountId} and state = '수락완료'", nativeQuery = true)
	List<SecretFriendsEntity> findHostId(@Param("hostId") AccountEntity hostId);
	
	@Query(value = "select * from secret_friends where guest_id = :#{#guestId.accountId} and state = '수락완료'", nativeQuery = true)
	List<SecretFriendsEntity> findGuestId (@Param("guestId") AccountEntity guestId);

	@Modifying
	@Query(value = "update SecretFriendsEntity s set s.state = '수락완료' where s.hostId = :hostId and s.guestId = :guestId")
	void updateStateByHostIdAndGuestId (@Param("hostId") AccountEntity hostId, @Param("guestId") AccountEntity guestId);

}
