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
@Builder
@Entity
@RequiredArgsConstructor
@Table(name = "image")
public class ImageEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private int imageId;
	
	@Column(name = "image_name")
	@NotNull
	private String imageName;
	
	@ManyToOne(targetEntity = AccountEntity.class)
	@JoinColumn(name = "account_id")
	@NotNull
	private AccountEntity accountId;
	
	@ManyToOne(targetEntity = PostEntity.class,
			   fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	@NotNull
	private PostEntity postId;
	
}
