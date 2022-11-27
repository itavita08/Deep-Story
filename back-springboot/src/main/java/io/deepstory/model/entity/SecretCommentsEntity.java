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
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name="comments")
public class SecretCommentsEntity {
	
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "comments_create")
    private String commentCreate;
    
    @Column(name = "comment_modify")
    private String commentModify;

    @Column(name = "comment_data")
    private String commentData;
    
    @JoinColumn(name = "account_id")
	@ManyToOne(targetEntity = AccountEntity.class, fetch = FetchType.LAZY)
    private AccountEntity accountId;
    
    @JoinColumn(name = "secret_post_id")
	@ManyToOne(targetEntity = SecretPostEntity.class, fetch = FetchType.LAZY)
    private SecretPostEntity secretPostId;

}
