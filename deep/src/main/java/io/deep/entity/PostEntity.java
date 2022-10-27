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

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@RequiredArgsConstructor
@Table(name = "post")
public class PostEntity {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
	private int postId;
	
	@Column(name = "post_name")
	@NotNull
	private String postName;
	
	@Column(name = "post_contents")
	private String postContents;
	
	@ManyToOne(targetEntity = AccountEntity.class,
			   fetch = FetchType.LAZY)
	@JoinColumn(name = "account_id")
	@NotNull
	private AccountEntity accountId;
	
	
}