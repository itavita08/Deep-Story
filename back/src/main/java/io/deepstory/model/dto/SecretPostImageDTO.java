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
public class SecretPostImageDTO {
	
	private int secretPostId;
	
    private String secretTitle;
    
    private String secretContents;
    
	private int secretFriendId;
	
	private int secretWriterId;

    private List<Map<String,String>> secretImage;
}
