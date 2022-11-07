package io.deepstory.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.exception.SeverErrorRequestException;
import io.deepstory.jwt.Subject;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
import io.deepstory.model.dto.SecretFriendAccountDTO;
import io.deepstory.model.dto.SecretFriendListDTO;
import io.deepstory.model.dto.SecretImageDTO;
import io.deepstory.model.dto.SecretPostDTO;
import io.deepstory.model.dto.SecretPostImageDTO;
import io.deepstory.model.dto.SecretPostListDTO;
import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.ImageEntity;
import io.deepstory.model.entity.PostEntity;
import io.deepstory.model.entity.SecretFriendsEntity;
import io.deepstory.model.entity.SecretImageEntity;
import io.deepstory.model.entity.SecretPostEntity;
import io.deepstory.model.repository.AccountRepository;
import io.deepstory.model.repository.SecretFreindsRecpository;
import io.deepstory.model.repository.SecretImageRepository;
import io.deepstory.model.repository.SecretPostRecpository;

@Service
public class SecretService {

	@Autowired
	private SecretFreindsRecpository secretFreindsRepository;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private SecretPostRecpository secretPostRecpository;

	@Autowired
	private SecretImageRepository secretImageRepository;

	// account 조회 시, 헤딩 계정 데이터 없을 경우 예외 처리
	public void notExistAccount(int accountId) throws Exception {

		boolean isExist = accountRepository.existsById(accountId);

		if (!isExist) {
			throw new SeverErrorRequestException("존재하지 않은 계정 입니다.");
		}
	}

	// post 조회 시, 해당 글 데이터 없을 경우 예외 처리
	public void notExistPost(int postId) throws Exception {

		boolean isExist = secretPostRecpository.existsById(postId);

		if (!isExist) {
			throw new SeverErrorRequestException("게시글이 존재 하지 않습니다.");
		}
	}

	// 비밀 친구 요청
	@Transactional
	public boolean secretReqeust(int hostId, String guestEmail, String secretBoard) throws Exception {
		AccountEntity host = accountRepository.findById(hostId).get();
		AccountEntity guest = accountRepository.findByAccountEmail(guestEmail).get();
		SecretFriendsEntity secretFriends = SecretFriendsEntity.builder().secretBoard(secretBoard).state("신청상태")
				.hostId(host).guestId(guest).build();
		SecretFriendsEntity secretResult = secretFreindsRepository.save(secretFriends);
		if (secretResult == null) {
			System.out.println("친구 추가에 실패하였습니다.");
			return true;
		}
		return false;
	}

	// 비밀 친구 알람
	@Transactional
	public ArrayList<SecretFriendAccountDTO> secretAlarm(int guestId) throws Exception {

		AccountEntity guest = accountRepository.findById(guestId).get();

		System.out.println(guestId);

		List<SecretFriendsEntity> secretList = secretFreindsRepository.findAllByGuestId(guest);

		System.out.println(secretList.get(0).getHostId().getAccountEmail());

		ArrayList<SecretFriendAccountDTO> friendAccountList = new ArrayList<SecretFriendAccountDTO>();

		secretList.stream().forEach(s -> friendAccountList.add(new SecretFriendAccountDTO(s.getSecretFriendId(),
				s.getHostId().getAccountId(), s.getHostId().getAccountEmail(), s.getHostId().getAccountName())));

		System.out.println(friendAccountList);

		return friendAccountList;

	}

	// 비밀 친구 수락
	@Transactional
	public boolean secretAccept(int guestId, String hostEmail) throws Exception {
		System.out.println(hostEmail);
		AccountEntity host = accountRepository.findByAccountEmail(hostEmail).get();
		AccountEntity guest = accountRepository.findById(guestId).get();
		secretFreindsRepository.updateStateByHostIdAndGuestId(host, guest);
		return true;
	}

	// 마이페이지 친구 목록
	@Transactional
	public ArrayList<SecretFriendListDTO> getSecretFriend(int accountId) throws Exception {

		AccountEntity account = accountRepository.findById(accountId).get();
		List<SecretFriendsEntity> guestFriend = null;
		List<SecretFriendsEntity> hostFriend = null;

		try {
			System.out.println(accountId);
			guestFriend = secretFreindsRepository.findGuestId(account);
			System.out.println(guestFriend.get(0).getHostId().getAccountEmail());
		} catch (Exception e) {
			System.out.println("친구 없음.");
		}

		try {
			hostFriend = secretFreindsRepository.findHostId(account);
			System.out.println(hostFriend);
		} catch (Exception e) {
			System.out.println("친구 없음.");
		}

		ArrayList<SecretFriendListDTO> friendAccountList = new ArrayList<SecretFriendListDTO>();
		ArrayList<String> boardNames = new ArrayList<String>();
		guestFriend.stream().forEach(
				s -> friendAccountList.add(new SecretFriendListDTO(s.getSecretFriendId(), s.getHostId().getAccountId(),
						s.getHostId().getAccountEmail(), s.getHostId().getAccountName(), s.getSecretBoard())));
		guestFriend.stream().forEach(a -> boardNames.add(a.getSecretBoard()));
		hostFriend.stream().forEach(
				s -> friendAccountList.add(new SecretFriendListDTO(s.getSecretFriendId(), s.getHostId().getAccountId(),
						s.getHostId().getAccountEmail(), s.getHostId().getAccountName(), s.getSecretBoard())));

		System.out.println(friendAccountList);
		return friendAccountList;
	}

	// 비밀 메인 페이지 정보 반환 - 각자 프로필 정보 (이름, 이메일)
	@Transactional
	public HashMap<String, SecretFriendAccountDTO> getSecretProfil(Subject account, int secretFriendId,
			String friendEmail) throws Exception {

		AccountEntity friend = accountRepository.findByAccountEmail(friendEmail).get();

		SecretFriendAccountDTO myAccount = new SecretFriendAccountDTO(secretFriendId, account.getAccountId(),
				account.getAccountEmail(), account.getAccountName());

		SecretFriendAccountDTO friendAccount = new SecretFriendAccountDTO(secretFriendId, friend.getAccountId(),
				friend.getAccountEmail(), friend.getAccountName());

		HashMap<String, SecretFriendAccountDTO> profil = new HashMap<String, SecretFriendAccountDTO>();

		profil.put("myAccount", myAccount);
		profil.put("friendAccount", friendAccount);

		return profil;

	}

	// 비밀 메인 페이지 정보 반환 - 게시글 목록 반환
	@Transactional
	public ArrayList<SecretPostListDTO> getSecretPostList(int secretFriendId) throws Exception {

		ArrayList<SecretPostListDTO> secretPostList = new ArrayList<SecretPostListDTO>() ;

		try {
			SecretFriendsEntity secretFriend = secretFreindsRepository.findById(secretFriendId).get();

			List<SecretPostEntity> secretPost = secretPostRecpository.findAllBySecretFriendId(secretFriend);
		
			List<SecretImageEntity> secretImageList = secretPost.stream()
					.map(p -> secretImageRepository.findImageName(p)).collect(Collectors.toList());
			
			System.out.println("*********"+ secretImageList);
			for (int i = 0; i < secretPost.size(); i++) {
				if (secretImageList.get(i) != null) {
						secretPostList.add(new SecretPostListDTO(secretPost.get(i).getSecretPostId(),
								secretPost.get(i).getSecretPostName(), secretPost.get(i).getSecretPostContents(),
								secretPost.get(i).getSecretWriterId().getAccountId(), secretFriendId,
								secretImageList.get(i).getSecretImageName()));

				} else {

					secretPostList.add(new SecretPostListDTO(secretPost.get(i).getSecretPostId(),
							secretPost.get(i).getSecretPostName(), secretPost.get(i).getSecretPostContents(),
							secretPost.get(i).getSecretWriterId().getAccountId(), secretFriendId, null));
				}
			}

		} catch (Exception e) {
			System.out.println("해당 게시물이 없습니다. ");
		}

		return secretPostList;
	}

	// 비밀 게시물 추가
	public Integer secretPostInsert(SecretPostDTO secretPostDTO) throws Exception {
		
		try {
			notExistAccount(secretPostDTO.getSecretWriterId());
			
			Optional<AccountEntity> accountId = accountRepository.findById(secretPostDTO.getSecretWriterId());
			Optional<AccountEntity> host = accountRepository.findById(secretPostDTO.getSecretFriendId());

			Optional<SecretFriendsEntity> secretFriend = secretFreindsRepository.findByHostId(host.get());
			
			SecretPostEntity secretPostEntity = new SecretPostEntity(secretPostDTO.getSecretPostId(), secretPostDTO.getSecretPostName(), secretPostDTO.getSecretPostContents(), secretFriend.get(),
					 accountId.get());

			SecretPostEntity secretPost = secretPostRecpository.save(secretPostEntity);
			System.out.println(secretPost.getSecretPostId());

			return secretPost.getSecretPostId();
			
		} catch (Exception e) {
			System.out.println(e);
			throw new SeverErrorRequestException("해당 게시글에 저장을 실패하였습니다.");
		}

	}
	
	// 이미지 추가
	@Transactional
	public Integer addSecretImage(SecretImageDTO newImage) throws Exception {
		
		notExistPost(newImage.getSecretPostId());
		
		Optional<SecretPostEntity> secretPost = secretPostRecpository.findById(newImage.getSecretPostId());

		SecretImageEntity imageEntity = SecretImageEntity
				.builder().secretImageName(newImage.getSecretImageName())
				.secretPostId(secretPost.get()).build();

		SecretImageEntity image = secretImageRepository.save(imageEntity);

		if (image != null) {
			return image.getSecretImageId();
		}
		return null;
	}
	
	// 게시물 상세 조회
	@Transactional
	public SecretPostDTO getSecretPost(int secretPostId) throws Exception {
		
		notExistPost(secretPostId);

		SecretPostEntity secretPostEntity = secretPostRecpository.findById(secretPostId).get();

		SecretPostDTO secretPostDTO = SecretPostDTO.builder().secretPostId(secretPostId).secretPostName(secretPostEntity.getSecretPostName())
				.secretPostContents(secretPostEntity.getSecretPostContents())
				.secretFriendId(secretPostEntity.getSecretFriendId().getSecretFriendId()).secretWriterId(secretPostEntity.getSecretWriterId().getAccountId()).build();

		return secretPostDTO;
	}
	
	// 이미지 조회
	@Transactional
	public String getSecretImage(int postId) throws Exception {

		Optional<SecretPostEntity> secretPostEntity = secretPostRecpository.findById(postId);
		String imageName = secretImageRepository.findImageName(secretPostEntity.get()).getSecretImageName();

		return imageName;
	}
	
	// 글 수정 기능
	@Transactional
	public Integer updateSecretPost(SecretPostImageDTO secretPost) throws Exception {

		SecretPostEntity secretPostEntity = secretPostRecpository.findById(secretPost.getSecretPostId()).get();

		SecretImageEntity secretImageEntity = secretImageRepository.findImageName(secretPostEntity);

		secretPostEntity.setSecretPostName(secretPost.getSecretTitle());
		secretPostEntity.setSecretPostContents(secretPost.getSecretContents());

		secretImageEntity.setSecretImageName(secretPost.getSecretImage().get(0).get("name"));

		SecretPostEntity post = secretPostRecpository.save(secretPostEntity);
		SecretImageEntity image = secretImageRepository.save(secretImageEntity);

		return post.getSecretPostId();
	}

	// 글 삭제 기능
	@Transactional
	public boolean deleteSecretPost(int secretPostId) throws Exception {

		secretPostRecpository.deleteById(secretPostId);

		return true;
	}

}

