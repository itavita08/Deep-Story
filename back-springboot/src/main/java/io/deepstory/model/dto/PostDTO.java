package io.deepstory.model.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.PostEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@ApiModel(value = "게시물 상세보기 : postDetail", description = "게시물 상세보기")
@XmlRootElement(name= "postDetail")
@XmlType(propOrder = {"postId", "postName","postContents", "accountId"})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class PostDTO {
	@ApiModelProperty(value = "포스트 번호", required = true, example = "n")
	private int postId;
	@ApiModelProperty(value = "포스트 제목", required = true, example = "이것은 제목입니다.")
	private String postName;
	@ApiModelProperty(value = "포스트 내용", required = true, example = "이것은 내용입니다.")
	private String postContents;
	@ApiModelProperty(value = "유저 아이디", required = true, example = "n")
	private int accountId;
	
	public PostEntity toEntity() {
		return PostEntity.builder().postName(postName).postContents(postContents).accountId(AccountEntity.builder().accountId(accountId).build()).build();
	}
}
