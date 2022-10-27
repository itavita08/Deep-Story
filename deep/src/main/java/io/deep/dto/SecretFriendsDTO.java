package io.deep.dto;

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

}
