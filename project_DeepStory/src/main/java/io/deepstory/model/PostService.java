package io.deepstory.model;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
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
	
        public Integer addPost(PostDTO postDTO) {
		
        Optional<AccountEntity> accountId = accountRepository.findById(postDTO.getAccountId());
		
        PostEntity postEntity = new PostEntity(postDTO.getPostId(), postDTO.getPostName(), postDTO.getPostContents(), accountId.get());
		
        PostEntity post = postRepository.save(postEntity);
		if(post != null) {
			return post.getPostId();
		}
		return 0;
	}


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


	public List<PostDTO> getAccountPostAll(int accountId ) {
        System.out.println("------post service------");
        System.out.println("----accountId------" + accountId);
        Optional<AccountEntity> account = accountRepository.findById(accountId);
		System.out.println("accountEntity : "+account.get().getAccountId());
		
        List<PostEntity> postEntityAll = postRepository.findAllByAccountId(account.get());
		System.out.println(postEntityAll.get(0));
		
		List<PostDTO> postDTOAll = null;
		for(PostEntity p : postEntityAll) {
			boolean addResult = postDTOAll.add(PostDTO.builder().postId(p.getPostId()).postName(p.getPostName()).postContents(p.getPostContents()).accountId(accountId).build());
		}
		System.out.println(postDTOAll.get(0));
		return postDTOAll;
	}


	public List<PostDTO> PostAll() {
		// TODO Auto-generated method stub
		return null;
	}


	
	

}
