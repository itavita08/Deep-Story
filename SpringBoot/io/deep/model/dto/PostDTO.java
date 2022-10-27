package io.deep.model.dto;

import io.deep.model.entity.AccountEntity;
import io.deep.model.entity.PostEntity;
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
		return PostEntity.builder().postId(postId).postName(postName).postContents(postContents).accountId(AccountEntity.builder().accountId(accountId).build()).build();
	}
	
}
