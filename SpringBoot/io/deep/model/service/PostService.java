package io.deep.model.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deep.model.dto.PostDTO;
import io.deep.model.entity.PostEntity;
import io.deep.model.repository.PostRecpository;

@Service
public class PostService {
	
	@Autowired
	private PostRecpository postRepository;
	
	
	public boolean addPost(PostDTO postDTO) {
		PostEntity postEntity = postDTO.toEntity();			
		System.out.println(postEntity.getPostId()+ " "+ postEntity.getAccountId());
		postEntity = postRepository.save(postEntity);
		if(postEntity != null) {
			return true;
		}
		return false;
	}


	public PostDTO getPost(int postId) {
		Optional<PostEntity> postEntity = postRepository.findById(postId);
		System.out.println(postEntity.toString());
		PostDTO postDTO = PostDTO.builder().postId(postId).postName(postEntity.get().getPostName()).postContents(postEntity.get().getPostContents()).build();
		System.out.println(postDTO.toString());
		return postDTO;
	}
	

}
