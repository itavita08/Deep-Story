package io.deepstory.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.deepstory.jwt.Subject;
import io.deepstory.model.dto.SecretFriendAccountDTO;
import io.deepstory.model.dto.SecretFriendListDTO;
import io.deepstory.model.dto.SecretPostListDTO;
import io.deepstory.model.entity.AccountEntity;
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
	private SecretFreindsRecpository secretFreindsRecpository;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private SecretPostRecpository secretPostRecpository;

	@Autowired
	private SecretImageRepository secretImageRepository;

	// 비밀 친구 요청
		@Transactional
		public boolean secretReqeust(int hostId, String guestEmail, String secretBoard) throws Exception {
			AccountEntity host = accountRepository.findById(hostId).get();
			AccountEntity guest = accountRepository.findByAccountEmail(guestEmail).get();
			SecretFriendsEntity secretFriends = SecretFriendsEntity.builder().secretBoard(secretBoard).state("신청상태")
					.hostId(host).guestId(guest).build();
			SecretFriendsEntity secretResult = secretFreindsRecpository.save(secretFriends);
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

		List<SecretFriendsEntity> secretList = secretFreindsRecpository.findAllByGuestId(guest);

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
			secretFreindsRecpository.updateStateByHostIdAndGuestId(host, guest);
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
				guestFriend = secretFreindsRecpository.findGuestId(account);
				System.out.println(guestFriend.get(0).getHostId().getAccountEmail());
			} catch (Exception e) {
				System.out.println("친구 없음.");
			}
			
			try {
				hostFriend = secretFreindsRecpository.findHostId(account);
				System.out.println(hostFriend);
			} catch (Exception e) {
				System.out.println("친구 없음.");
			}
			
			ArrayList<SecretFriendListDTO> friendAccountList = new ArrayList<SecretFriendListDTO>();
			ArrayList<String> boardNames = new ArrayList<String>();
			guestFriend.stream().forEach(s -> friendAccountList.add(new SecretFriendListDTO(s.getSecretFriendId(),
					s.getHostId().getAccountId(), s.getHostId().getAccountEmail(), s.getHostId().getAccountName(), s.getSecretBoard())));
			guestFriend.stream().forEach(a -> boardNames.add(a.getSecretBoard()));
			hostFriend.stream().forEach(s -> friendAccountList.add(new SecretFriendListDTO(s.getSecretFriendId(),
					s.getHostId().getAccountId(), s.getHostId().getAccountEmail(), s.getHostId().getAccountName(), s.getSecretBoard())));
			
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

		ArrayList<SecretPostListDTO> secretPostList = null;

		try {

			SecretFriendsEntity secretFriend = secretFreindsRecpository.findById(secretFriendId).get();

			List<SecretPostEntity> secretPost = secretPostRecpository.findAllBySecretFriendId(secretFriend);

			List<SecretImageEntity> secretImageList = secretPost.stream()
					.map(p -> secretImageRepository.findImageName(p)).collect(Collectors.toList());

			for (int i = 0; i < secretPost.size(); i++) {

				if (secretImageList.get(i) != null) {
					if (secretImageList.get(i).getSecretPostId().getSecretPostId() == i + 1) {

						secretPostList.add(new SecretPostListDTO(secretPost.get(i).getSecretPostId(),
								secretPost.get(i).getSecretPostName(), secretPost.get(i).getSecretPostContents(),
								secretPost.get(i).getSecretWriterId().getAccountId(), secretFriendId,
								secretImageList.get(i).getSecretImageName()));
					}
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

}
