package io.deepstory.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "image")
public class ImageEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private int imageId;
	
	@Column(name = "image_name")
	private String imageName;
	
	@ManyToOne(targetEntity = AccountEntity.class)
	@JoinColumn(name = "account_id")
	private AccountEntity accountId;
	
	@ManyToOne(targetEntity = PostEntity.class,
			   fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private PostEntity postId;
	
}