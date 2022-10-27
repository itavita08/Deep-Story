package io.deep.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.sun.istack.NotNull;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RequiredArgsConstructor
@Builder
@Entity
@Table(name = "secret_post")
public class SecretPostEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "secret_post_id")
	private int secretPostId;
	
	@Column(name = "secret_post_name")
	@NotNull
	private String secretPostName;
	
	@Column(name = "secret_post_contents")
	private String secretPostContents;
	
	@ManyToOne(targetEntity = SecretFriendsEntity.class,
			   fetch = FetchType.LAZY)
	@JoinColumn(name = "secret_friend_id")
	@NotNull
	private SecretFriendsEntity secretFriendId;

}
