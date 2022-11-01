package io.deepstory.model.dto;

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
public class CommentsDTO {
	
    private int commentId;

    private String commentCreate;
    
    private String commentModify;

    private String commentData;
    
    private int accountId;
    
    private int postId;
    
}
