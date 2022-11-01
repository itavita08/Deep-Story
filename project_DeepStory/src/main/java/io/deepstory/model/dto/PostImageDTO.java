package io.deepstory.model.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PostImageDTO {
	
	private int postId;
	
    private String title;
    
    private String content;
    
    private List<Map<String,String>> image;
    
    private int accountId;
}