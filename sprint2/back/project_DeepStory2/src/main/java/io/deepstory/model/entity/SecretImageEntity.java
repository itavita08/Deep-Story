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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@Table(name = "secret_image")
public class SecretImageEntity {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = " secret_image_id")
	private int secretImageId;
	
	@Column(name = "secret_image_name")
	private String secretImageName;
	
	@ManyToOne(targetEntity = SecretPostEntity.class,
			   fetch = FetchType.LAZY)
	@JoinColumn(name = "secret_post_id")
	private SecretPostEntity secretPostId;

}
