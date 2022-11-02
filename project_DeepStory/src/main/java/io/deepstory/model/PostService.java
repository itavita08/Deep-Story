package io.deepstory.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
import io.deepstory.model.dto.PostListDTO;
import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.ImageEntity;
import io.deepstory.model.entity.PostEntity;
import io.deepstory.model.repository.AccountRepository;
import io.deepstory.model.repository.ImageRepostory;
import io.deepstory.model.repository.PostRecpository;

@Service
public class PostService {
	
	@Autowired
	private PostRecpository postRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private ImageRepostory imageRepository;
	
	private ModelMapper mapper = new ModelMapper();
		
		@Transactional
        public Integer addPost(PostDTO postDTO) {
		
        Optional<AccountEntity> accountId = accountRepository.findById(postDTO.getAccountId());
		
        PostEntity postEntity = new PostEntity(postDTO.getPostId(), postDTO.getPostName(), postDTO.getPostContents(), accountId.get());
		
        PostEntity post = postRepository.save(postEntity);
		if(post != null) {
			return post.getPostId();
		}
		return 0;
	}

	@Transactional
	public PostDTO getPost(int postId) {
		Optional<PostEntity> postEntity = postRepository.findById(postId);
		PostDTO postDTO = PostDTO.builder().postId(postId).postName(postEntity.get().getPostName()).postContents(postEntity.get().getPostContents()).accountId(postEntity.get().getAccountId().getAccountId()).build();
		if(postDTO != null) {
			return postDTO;
		}
		return null;
	}
	
	@Transactional
    public Integer addImage(ImageDTO newImage) {
        Optional<AccountEntity> accountId = accountRepository.findById(newImage.getAccountId());
        Optional<PostEntity> postId = postRepository.findById(newImage.getPostId());

        ImageEntity imageEntity = ImageEntity.builder().imageName(newImage.getImageName()).accountId(accountId.get()).postId(postId.get()).build();
        
        ImageEntity image = imageRepository.save(imageEntity);
        if(image != null) {
            return image.getPostId().getPostId();
        }
        return null;
        
    }


	@Transactional
    public String getImage(int postId) {
	    Optional<PostEntity> postEntity = postRepository.findById(postId);
        String imageName = imageRepository.findImageName(postEntity.get()).getImageName();
        return imageName;
    }
    
    @Transactional
	public boolean deletePost(int postId) {
		postRepository.deleteById(postId);
		if(getPost(postId) == null) {
			return true;
		}
		return false;
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
    
    // 홈페이지에 이미지 있는 모든 게시물 조회 
    @Transactional
	public ArrayList<PostListDTO> getPostAll( ) {
        System.out.println("------post service------");
        
        List<PostEntity> postEntityList = postRepository.findAll();
		System.out.println("postentity post name" + postEntityList.get(0).getPostName());
		
		List<ImageEntity> imageEntityList = imageRepository.findAll();
		System.out.println("imageEntityList 0 image name: "+imageEntityList.get(0).getImageName());
		
		ArrayList<PostListDTO> postListDTOList = new ArrayList<PostListDTO>();
		int index = 0;
        for (ImageEntity i : imageEntityList) {
        	
        	int postId = i.getPostId().getPostId();
        	
        	if(postListDTOList.size() == 0) {
        		postListDTOList.add(PostListDTO.builder().postId(postId).title(postEntityList.get(index).getPostName()).content(postEntityList.get(index).getPostContents()).image(i.getImageName()).build());
        		index = index + 1;
        	} 
        	else if (postListDTOList.get(postListDTOList.size() - 1).getPostId() == postId){
        		String preImage = postListDTOList.get(index).getImage();
        		postListDTOList.get(index).setImage(preImage +", " +i.getImageName());
        		index = index + 1;
        	}else {
        		postListDTOList.add(PostListDTO.builder().postId(postId).title(postEntityList.get(index).getPostName()).content(postEntityList.get(index).getPostContents()).image(i.getImageName()).build());
            	index = index + 1;
        	}
        	
		}

		return postListDTOList;
	}




	
	

}
