package io.deepstory.model;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.PostEntity;
import io.deepstory.model.repository.AccountRepository;
import io.deepstory.model.repository.PostRecpository;

@Service
public class PostService {
	
	@Autowired
	private PostRecpository postRepository;
	@Autowired
	private AccountRepository accountRepository;
	
	public boolean addPost(PostDTO postDTO) {
		
		
		Optional<AccountEntity> accountId = accountRepository.findById(postDTO.getAccountId());
		
		System.out.println("--확인----------------------------------");
		System.out.println(accountId.get().getAccountName());
		System.out.println(accountId.get().getAccountId());
		
		PostEntity postEntity = new PostEntity(postDTO.getPostId(), postDTO.getPostName(), postDTO.getPostContents(), accountId.get());
		
		System.out.println(postEntity.getAccountId());
		
		
		postEntity = postRepository.save(postEntity);
		
		if(postEntity != null) {
			return true;
		}
		return false;
	}


	public PostDTO getPost(int postId) {
		
		Optional<PostEntity> postEntity = postRepository.findById(postId);
		System.out.println(postEntity.toString());
		
		PostDTO postDTO = PostDTO.builder().postId(postId).postName(postEntity.get().getPostName()).postContents(postEntity.get().getPostContents()).accountId(postEntity.get().getAccountId().getAccountId()).build();
		
		System.out.println(postDTO.toString());
		
		return postDTO;
	}
	

}
