package io.deepstory.model;

import java.io.FilterWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.exception.SeverErrorRequestException;
import io.deepstory.model.dto.AccountDTO;
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
	
	
	// account 조회 시, 헤딩 계정 데이터 없을 경우 예외 처리
	public void notExistAccount(int accountId) throws Exception {

		boolean isExist = accountRepository.existsById(accountId);

		if (!isExist) {
			throw new SeverErrorRequestException("존재하지 않은 계정 입니다.");
		}
	}
	
	// post 조회 시, 해당 글 데이터 없을 경우 예외 처리
	public void notExistPost(int postId) throws Exception {

		boolean isExist = postRepository.existsById(postId);

		if (!isExist) {
			throw new SeverErrorRequestException("게시글이 존재 하지 않습니다.");
		}
	}

	// 게시물 추가
	@Transactional
	public Integer addPost(PostDTO postDTO) throws Exception {
		
		try {

			if (postDTO.getPostName() == null) {
				throw new SeverErrorRequestException("제목을 입력하지 않으셨습니다.");
			}
			
			notExistAccount(postDTO.getAccountId());
			
			Optional<AccountEntity> accountId = accountRepository.findById(postDTO.getAccountId());

			PostEntity postEntity = new PostEntity(postDTO.getPostId(), postDTO.getPostName(),
					postDTO.getPostContents(), accountId.get());

			PostEntity post = postRepository.save(postEntity);

			return post.getPostId();
			
		} catch (Exception e) {

			throw new SeverErrorRequestException("해당 게시글에 저장을 실패하였습니다.");
		}

	}

	// 게시물 조회
	@Transactional
	public PostDTO getPost(int postId) throws Exception {
		
		notExistPost(postId);

		Optional<PostEntity> postEntity = postRepository.findById(postId);

		PostDTO postDTO = PostDTO.builder().postId(postId).postName(postEntity.get().getPostName())
				.postContents(postEntity.get().getPostContents())
				.accountId(postEntity.get().getAccountId().getAccountId()).build();

		return postDTO;
	}
	@Transactional
	public AccountDTO getAccount(int postId) {
		Optional<AccountEntity> account = postRepository.findAccountIdByPostId(postId);
		AccountDTO accountDTO = AccountDTO.toDTO(account.get());
		if(accountDTO != null) {
			return accountDTO;
		}
		return null;
	}

	// 이미지 추가
	@Transactional
	public Integer addImage(ImageDTO newImage) throws Exception {
		
		notExistAccount(newImage.getAccountId());
		notExistPost(newImage.getPostId());

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
	public String getImage(int postId) throws Exception {

		Optional<PostEntity> postEntity = postRepository.findById(postId);
		String imageName = imageRepository.findImageName(postEntity.get()).getImageName();

		return imageName;
	}

	// 해당 유저의 게시물 목록 조회 메소드
	@Transactional
	public ArrayList<PostListDTO> getPostListByUser(int accountId) throws Exception {

		AccountEntity account = accountRepository.findById(accountId).get();

		List<PostEntity> postList = postRepository.findAllByAccountId(account);

		if (postList == null) {

			throw new SeverErrorRequestException("게시물이 존재하지 않습니다.");
		}

		List<ImageEntity> imageList = postList.stream().map(p -> imageRepository.findImageName(p))
				.collect(Collectors.toList());
		

		ArrayList<PostListDTO> PostList = new ArrayList<PostListDTO>();

		for (int i = 0; i < postList.size(); i++) {

			if (imageList.get(i) != null) {
//				if (imageList.get(i).getPostId().getPostId() == i + 1) {

					PostList.add(new PostListDTO(postList.get(i).getPostId(), postList.get(i).getPostName(),
							postList.get(i).getPostContents(), imageList.get(i).getImageName()));
//				}
			} else {

				PostList.add(new PostListDTO(postList.get(i).getPostId(), postList.get(i).getPostName(),
						postList.get(i).getPostContents(), null));
			}
		}

		return PostList;
	}
	
	//account Id 받아서 ArrayList<PostListDTO> 반환
	// 좋아요 누른 게시물 목록 
	@Transactional
	public ArrayList<PostListDTO> getInterestPost(int accountId) {
		ArrayList<PostListDTO> postList = new ArrayList<PostListDTO>();
		try {
			AccountEntity account = accountRepository.findById(accountId).get();
			
			List<PostEntity> postEntityList = loveRepository.findpostIdByAccountId(account);
			
			List<ImageEntity> imageEntityList = imageRepository.findAllByAccountId(account);
			
			List<ImageEntity> filterImageEntity = imageEntityList.stream().filter((ImageEntity image) -> postEntityList.contains(image.getPostId())).collect(Collectors.toList());

			int i =0;
			for(PostEntity p : postEntityList) {
				if(filterImageEntity.get(i) != null) {
					new PostListDTO();
					postList.add(PostListDTO.builder().postId(p.getPostId()).title(p.getPostName()).content(p.getPostContents()).image(filterImageEntity.get(i).getImageName()).build());
					i++;
				}else {
					new PostListDTO();
					postList.add(PostListDTO.builder().postId(p.getPostId()).title(p.getPostName()).content(p.getPostContents()).image(null).build());
					i++;
				}
			}			
		} catch (Exception e) {
			System.out.println(e);
		}
		return postList;
	}

	// 검색 기능 (제목, 내용)
	@Transactional
	public ArrayList<PostListDTO> searchUserPost(String keyword) throws Exception {
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
			throw new SeverErrorRequestException("해당 키워드에 관한 제목 검색 결과 없습니다.");
		}

		try {
			postContentsList = postRepository.findByPostContentsIgnoreCaseContaining(keyword);
			postContentsId = postContentsList.stream().map(p -> p.getPostId()).collect(Collectors.toList());

		} catch (Exception eContents) {
			throw new SeverErrorRequestException("해당 키워드에 관한 내용 검색 결과 없습니다.");
		}

		postIdList.addAll(postTitleId);
		postIdList.addAll(postContentsId);

		List<Integer> newPostIdList = postIdList.stream().distinct().collect(Collectors.toList());
		List<PostEntity> postList = newPostIdList.stream().map(n -> postRepository.findById(n).get())
				.collect(Collectors.toList());
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
	public Integer updatePost(PostImageDTO postImageDTO) throws Exception {

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
	public boolean deletePost(int postId) throws Exception {

		postRepository.deleteById(postId);

		return true;
	}

	// 좋아요 누르기 기능
	@Transactional
	public boolean addLove(int accountId, int postId) throws Exception {

		PostEntity postEntity = postRepository.findById(postId).get();
		AccountEntity accountEntity = accountRepository.findById(accountId).get();

		boolean result = false;

		List<LoveEntity> allLove = loveRepository.findAllByPostId(postEntity);

		if (!allLove.isEmpty()) {
			for (LoveEntity love : allLove) {
				if (love.getAccountId().getAccountId() != accountId) {
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

		if (result = true) {
			LoveEntity loveEntity = LoveEntity.builder().accountId(accountEntity).postId(postEntity).build();
			loveRepository.save(loveEntity);
		}

		return result;
	}

	// 좋아요 상위 게시물
	@Transactional
	public HashMap<String, Map<String, String>> showBestPost() throws Exception {
		List<Object[][]> bestPosts = loveRepository.findCountLove();

		HashMap<String, Map<String, String>> map = new HashMap<String, Map<String, String>>();

		for (int i = 0; i < 3; i++) {
			PostDTO post = getPost(((PostEntity) (bestPosts.get(i))[1][0]).getPostId());
			String imageName = getImage(((PostEntity) (bestPosts.get(i))[1][0]).getPostId());

			HashMap<String, String> mapDetail = new HashMap<String, String>();
			mapDetail.put("title", post.getPostName());
			mapDetail.put("content", post.getPostContents());
			mapDetail.put("image", imageName);

			map.put("key"+i, mapDetail);
		}

		System.out.println(map.toString());

		return map;

	}

	// 갤러리 기능. 유저의 모든 이미지 조회
	@Transactional
	public List<String> getAllImage(int accountId) throws Exception {

		AccountEntity accountEntity = accountRepository.findById(accountId).get();

		List<String> imageNameList = imageRepository.findImageNameByAccountId(accountEntity);

		System.out.println(imageNameList);

		return imageNameList;

	}

	// 홈페이지에 이미지 있는 모든 게시물 조회
	@Transactional
	public ArrayList<PostListDTO> getPostAll() throws Exception {
		System.out.println("------post service------");

		List<PostEntity> postEntityList = postRepository.findAll();
		System.out.println("postentity post name" + postEntityList.get(0).getPostName());

		List<ImageEntity> imageEntityList = imageRepository.findAll();
		System.out.println("imageEntityList 0 image name: " + imageEntityList.get(0).getImageName());

		ArrayList<PostListDTO> postListDTOList = new ArrayList<PostListDTO>();
		int index = 0;
		for (ImageEntity i : imageEntityList) {

			int postId = i.getPostId().getPostId();

			if (postListDTOList.size() == 0) {
				postListDTOList.add(PostListDTO.builder().postId(postId).title(postEntityList.get(index).getPostName())
						.content(postEntityList.get(index).getPostContents()).image(i.getImageName()).build());
				index = index + 1;
			} else if (postListDTOList.get(postListDTOList.size() - 1).getPostId() == postId) {
				String preImage = postListDTOList.get(index).getImage();
				postListDTOList.get(index).setImage(preImage + ", " + i.getImageName());
				index = index + 1;
			} else {
				postListDTOList.add(PostListDTO.builder().postId(postId).title(postEntityList.get(index).getPostName())
						.content(postEntityList.get(index).getPostContents()).image(i.getImageName()).build());
				index = index + 1;
			}

		}

		return postListDTOList;
	}
	
	// 전체 포스트 수 차트
    public int getTotalPost() {
        
        int totalPost = postRepository.getTotalPost();
        
        return totalPost;
        
    }

	public String checkId(int userId, int postId) {
		
		int postUserId = postRepository.findAccountId(postId).getAccountId();
		
		System.out.println(postUserId);
		
		if(userId == postUserId) {
			return "true";
		}
		return "false";
	}


}
