package io.deepstory.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
import io.deepstory.model.dto.PostListDTO;
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

	// 게시물 추가
	@Transactional
	public Integer addPost(PostDTO postDTO) {

		Optional<AccountEntity> accountId = accountRepository.findById(postDTO.getAccountId());

		PostEntity postEntity = new PostEntity(postDTO.getPostId(), postDTO.getPostName(), postDTO.getPostContents(),
				accountId.get());

		PostEntity post = postRepository.save(postEntity);

		if (post != null) {
			return post.getPostId();
		}
		return 0;
	}

	// 게시물 조회
	@Transactional
	public PostDTO getPost(int postId) {

		Optional<PostEntity> postEntity = postRepository.findById(postId);

		PostDTO postDTO = PostDTO.builder().postId(postId).postName(postEntity.get().getPostName())
				.postContents(postEntity.get().getPostContents())
				.accountId(postEntity.get().getAccountId().getAccountId()).build();

		return postDTO;
	}

	// 이미지 추가
	@Transactional
	public Integer addImage(ImageDTO newImage) {

		Optional<AccountEntity> accountId = accountRepository.findById(newImage.getAccountId());
		Optional<PostEntity> postId = postRepository.findById(newImage.getPostId());

		ImageEntity imageEntity = ImageEntity.builder().imageName(newImage.getImageName()).accountId(accountId.get())
				.postId(postId.get()).build();

		ImageEntity image = imageRepository.save(imageEntity);

		if (image != null) {
			return image.getPostId().getPostId();
		}
		return null;
	}

	// 이미지 조회
	@Transactional
	public String getImage(int postId) {

		Optional<PostEntity> postEntity = postRepository.findById(postId);
		String imageName = imageRepository.findImageName(postEntity.get()).getImageName();

		return imageName;
	}

	// 해당 유저의 게시물 조회 메소드
	@Transactional
	public ArrayList<PostListDTO> getPostListByUser(int accountId) {

		Optional<AccountEntity> account = accountRepository.findById(accountId);

		List<PostEntity> postList = postRepository.findAllByAccountId(account.get());

		List<ImageEntity> imageList = postList.stream().map(p -> imageRepository.findImageName(p))
				.collect(Collectors.toList());

		ArrayList<PostListDTO> PostList = new ArrayList<PostListDTO>();

		for (int i = 0; i < postList.size(); i++) {

			if (imageList.get(i) != null) {
				if (imageList.get(i).getPostId().getPostId() == i + 1) {
					
					PostList.add(new PostListDTO(postList.get(i).getPostId(), postList.get(i).getPostName(),
							postList.get(i).getPostContents(), imageList.get(i).getImageName()));
				}
			} else {
				
				PostList.add(new PostListDTO(postList.get(i).getPostId(), postList.get(i).getPostName(),
						postList.get(i).getPostContents(), null));
			}
		}
		
		return PostList;
	}

	// 검색 기능 (제목, 내용)
	@Transactional
	public ArrayList<PostListDTO> searchUserPost(String keyword) throws Exception {
		
//		System.out.println("유저 검색");
//		Optional<AccountEntity> account = accountRepository.findByAccountEmail(keyword);
//		int accountId = account.get().getAccountId();
		
		List<PostEntity> postTitleList = null;
		List<PostEntity> postContentsList = null;
		
		List<Integer> postTitleId = null;
		List<Integer> postContentsId = null;
		List<Integer> postIdList = new ArrayList<Integer>();
		
		ArrayList<PostListDTO> searchPost = new ArrayList<PostListDTO>();
				
		try {	
			
			postTitleList = postRepository.findByPostNameIgnoreCaseContaining(keyword);
			postTitleId = postTitleList.stream().map(p -> p.getPostId()).collect(Collectors.toList());
						
		} catch (Exception eTitle) {
			System.out.println("타이틀 검색 결과 없음.");			
		} 
		
		try {
			
			postContentsList = postRepository.findByPostContentsIgnoreCaseContaining(keyword);		
			postContentsId = postContentsList.stream().map(p -> p.getPostId()).collect(Collectors.toList());								
			
		} catch (Exception eContents) {
			System.out.println("내용 검색 결과 없음.");	
		} 

		postIdList.addAll(postTitleId);	
		postIdList.addAll(postContentsId);
		
		List<Integer> newPostIdList = postIdList.stream().distinct().collect(Collectors.toList());
		List<PostEntity> postList = newPostIdList.stream().map(n -> postRepository.findById(n).get()).collect(Collectors.toList()); 
		List<ImageEntity> imageList = postList.stream().map(p -> imageRepository.findImageName(p))
				.collect(Collectors.toList());

		for (int i = 0; i < postList.size(); i++) {

			if (imageList.get(i) != null) {

				if (imageList.get(i).getPostId().getPostId() == i + 1) {
					
					searchPost.add(new PostListDTO(postList.get(i).getPostId(), postList.get(i).getPostName(),
							postList.get(i).getPostContents(), imageList.get(i).getImageName()));
				} else {
					
					searchPost.add(new PostListDTO(postList.get(i).getPostId(), postList.get(i).getPostName(),
							postList.get(i).getPostContents(), imageList.get(i).getImageName()));
				}
			} else {
				
				searchPost.add(new PostListDTO(postList.get(i).getPostId(), postList.get(i).getPostName(),
						postList.get(i).getPostContents(), null));
			}
		}
		
		return searchPost;	
	}
    
    // 글 수정 기능
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
    
	// 글 삭제 기능
    @Transactional
    public boolean deletePost(int postId) {
        
        postRepository.deleteById(postId);
        
        return true;
    }

    // 좋아요 누르기 기능
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


    // 좋아요 상위 게시물 
    @Transactional
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

    // 갤러리 기능. 유저의 모든 이미지 조회
    @Transactional
    public List<String> getAllImage(int accountId) {

        AccountEntity accountEntity = accountRepository.findById(accountId).get();
        
        List<String> imageNameList = imageRepository.findImageNameByAccountId(accountEntity);
        
        System.out.println(imageNameList);
        
        return imageNameList;
        
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
