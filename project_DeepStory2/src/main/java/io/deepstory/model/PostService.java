package io.deepstory.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.ImageEntity;
import io.deepstory.model.entity.PostEntity;
import io.deepstory.model.repository.AccountRepository;
import io.deepstory.model.repository.ImageRepository;
import io.deepstory.model.repository.PostRecpository;

@Service
public class PostService {
	
	@Autowired
	private PostRecpository postRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private ImageRepository imageRepository;
	
	@Transactional
	public Integer addPost(PostDTO postDTO) {
		
		
		Optional<AccountEntity> accountId = accountRepository.findById(postDTO.getAccountId());
		
		System.out.println("-------------3. 게시물 저장 Post DAO 확인----------");
		System.out.println("3-1. addPost accountName");
		System.out.println(accountId.get().getAccountName());
		System.out.println("3-2. addPost accountId");
		System.out.println(accountId.get().getAccountId());
		
		PostEntity postEntity = new PostEntity(postDTO.getPostId(), postDTO.getPostName(), postDTO.getPostContents(), accountId.get());
		
		System.out.println("3-3. addPost postEntity accountId");
		System.out.println(postEntity.getAccountId().getAccountId());
		
		System.out.println("-------------4. 게시물 저장 save 확인----------");
		PostEntity post = postRepository.save(postEntity);
		System.out.println("-----------5. save후 post반환값 확인------------");
		System.out.println(post.toString());
		
		if(post != null) {
			return post.getPostId();
		}
		return 0;
	}


	public PostDTO getPost(int postId) {
		
		Optional<PostEntity> postEntity = postRepository.findById(postId);
		
		System.out.println("--------------1234--------------");
		System.out.println(postEntity.get().getPostId());
		
		PostDTO postDTO = PostDTO.builder().postId(postId).postName(postEntity.get().getPostName()).postContents(postEntity.get().getPostContents()).accountId(postEntity.get().getAccountId().getAccountId()).build();
		
		System.out.println(postDTO.toString());
		
		return postDTO;
	}

	@Transactional
    public Integer addImage(ImageDTO newImage) {
	    
	    System.out.println("-------------8. 게시물 저장 Image DAO 확인----------");
        Optional<AccountEntity> accountId = accountRepository.findById(newImage.getAccountId());
        Optional<PostEntity> postId = postRepository.findById(newImage.getPostId());
        System.out.println("8-1 addImage accountId");
        System.out.println(accountId.get().toString());
        System.out.println("8-2 addImage postId");
        System.out.println(postId.get().toString());
        
        ImageEntity imageEntity = ImageEntity.builder().imageName(newImage.getImageName()).accountId(accountId.get()).postId(postId.get()).build();
        
        ImageEntity image = imageRepository.save(imageEntity);
        System.out.println("-----------9. save후 image 반환값 확인------------");
        System.out.println(image.toString());
        if(image != null) {
            return image.getPostId().getPostId();
        }
        return null;
        
    }


	
    public String getImage(int postId) {
        
	    Optional<PostEntity> postEntity = postRepository.findById(postId);
        String imageName = imageRepository.findImageName(postEntity.get()).getImageName();
//        Optional<ImageEntity> imageName = imageRepository.findById(imageId);
//        System.out.println(imageName.get().getImageName());
        System.out.println(imageName);
        
//        return imageName.get().getImageName();
        return imageName;
    }

    @Transactional
    public boolean deletePost(int postId) {
        
        postRepository.deleteById(postId);
//        if(postRepository.findById(postId) == null) {
//            return true;
//        }
        
        return true;
    }
	
    
    @Transactional
    public Integer updatePost(PostImageDTO postImageDTO) {
        
        
//        Optional<AccountEntity> accountId = accountRepository.findById(postDTO.getAccountId());
        
//        System.out.println("-------------3. 게시물 저장 Post DAO 확인----------");
//        System.out.println("3-1. addPost accountName");
//        System.out.println(accountId.get().getAccountName());
//        System.out.println("3-2. addPost accountId");
//        System.out.println(accountId.get().getAccountId());
        
//        PostEntity postEntity = new PostEntity(postDTO.getPostId(), postDTO.getPostName(), postDTO.getPostContents(), accountId.get());
        System.out.println("127번 post 조회");
        PostEntity postEntity = postRepository.findById(postImageDTO.getPostId()).get();
        System.out.println(postEntity.toString());
        System.out.println("127번 image 조회");
        ImageEntity imageEntity = imageRepository.findImageName(postEntity);
        System.out.println(imageEntity.toString());
        
        postEntity.setPostName(postImageDTO.getTitle());
        postEntity.setPostContents(postImageDTO.getContent());
                
        imageEntity.setImageName(postImageDTO.getImage().get(0).get("name"));
        
        
        
//        System.out.println("3-3. addPost postEntity accountId");
//        System.out.println(postEntity.getAccountId().getAccountId());
        
//        System.out.println("-------------4. 게시물 저장 save 확인----------");
        PostEntity post = postRepository.save(postEntity);
        ImageEntity image = imageRepository.save(imageEntity);
//        System.out.println("-----------5. save후 post반환값 확인------------");
        System.out.println(post.toString());
        System.out.println(image.toString());
        
        return post.getPostId();
    }

}
