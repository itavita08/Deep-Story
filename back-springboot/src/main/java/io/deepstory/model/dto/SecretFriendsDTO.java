package io.deepstory.model.dto;

import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.SecretFriendsEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class SecretFriendsDTO {

	private int secretFriendId;

	private String secretBoard;

	private String state;

	private int hostId;

	private int guestId;

	public SecretFriendsEntity toEntity() {

		return SecretFriendsEntity.builder().secretBoard(secretBoard).state(state)
				.hostId(AccountEntity.builder().accountId(hostId).build())
				.guestId(AccountEntity.builder().accountId(guestId).build()).build();
	}

}
