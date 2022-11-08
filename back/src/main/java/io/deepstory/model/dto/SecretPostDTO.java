package io.deepstory.model.dto;

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
public class SecretPostDTO {
	
	private int secretPostId;
	
	private String secretPostName;
	
	private String secretPostContents;
	
	private int secretFriendId;
	
	private int secretWriterId;

	
}
