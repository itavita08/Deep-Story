package io.deepstory.model;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.aspectj.weaver.ast.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.ImageEntity;
import io.deepstory.model.entity.LoveEntity;
import io.deepstory.model.entity.PostEntity;
import io.deepstory.model.repository.AccountRepository;
import io.deepstory.model.repository.ImageRepository;
import io.deepstory.model.repository.LoveRepository;
import io.deepstory.model.repository.PostRecpository;

@Service
public class PostService {
	
	@Autowired
	private PostRecpository postRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private ImageRepository imageRepository;
	@Autowired
	private LoveRepository loveRepository;
	
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
        
        PostEntity postEntity = postRepository.findById(postImageDTO.getPostId()).get();
        ImageEntity imageEntity = imageRepository.findImageName(postEntity);
        
        postEntity.setPostName(postImageDTO.getTitle());
        postEntity.setPostContents(postImageDTO.getContent());
                
        imageEntity.setImageName(postImageDTO.getImage().get(0).get("name"));
        
        PostEntity post = postRepository.save(postEntity);
        ImageEntity image = imageRepository.save(imageEntity);
        
        return post.getPostId();
    }

    
    @Transactional
    public boolean addLove(int accountId, int postId) {
        
        PostEntity postEntity = postRepository.findById(postId).get();
        AccountEntity accountEntity = accountRepository.findById(accountId).get();
        
        boolean result = false;
        
        List<LoveEntity> allLove = loveRepository.findAllByPostId(postEntity);
        
        if(!allLove.isEmpty()) {
            for(LoveEntity love : allLove) {
                if(love.getAccountId().getAccountId() != accountId) {
                    result = true;
                } else {
                    return result;
                }
            }
        } else {
            LoveEntity loveEntity = LoveEntity.builder().accountId(accountEntity).postId(postEntity).build();
            loveRepository.save(loveEntity);
            result = true;
            return result;
        }
        
        if(result = true) {
            LoveEntity loveEntity = LoveEntity.builder().accountId(accountEntity).postId(postEntity).build();
            loveRepository.save(loveEntity);
        }
        
        return result;
    }


    public HashMap<String, Map<String, String>> showBestPost() {
        List<Object[][]> bestPosts = loveRepository.findCountLove();
        
        HashMap<String, Map<String, String>> map = new HashMap<String, Map<String, String>>();
       
        for(int i = 0; i<3; i++) {
            PostDTO post = getPost(((PostEntity)(bestPosts.get(i))[1][0]).getPostId());
            String imageName = getImage(((PostEntity)(bestPosts.get(i))[1][0]).getPostId());
            
            HashMap<String, String> mapDetail = new HashMap<String, String>();
            mapDetail.put("title", post.getPostName());
            mapDetail.put("content", post.getPostContents());
            mapDetail.put("image", imageName);
            
            map.put(Integer.toString(i), mapDetail);
        }
       
        System.out.println(map.toString());
        
        return map;
       
    }
}




