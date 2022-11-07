package io.deepstory.model.dto;

import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.PostEntity;
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
public class PostDTO {
	
	private int postId;
	
	private String postName;
	
	private String postContents;
	
	private int accountId;
	
	public PostEntity toEntity() {
		return PostEntity.builder().postName(postName).postContents(postContents).accountId(AccountEntity.builder().accountId(accountId).build()).build();
	}
}
