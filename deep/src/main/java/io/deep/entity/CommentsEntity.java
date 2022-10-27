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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name="comments")
public class CommentsEntity {
	
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "comments_create")
    @NotNull
    private String commentCreate;
    
    @Column(name = "comment_modify")
    private String commentModify;

    @Column(name = "comment_data")
    @NotNull
    private String commentData;
    
    @NotNull
	@ManyToOne(targetEntity = AccountEntity.class,
			   fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private AccountEntity accountId;
    
    @NotNull
	@ManyToOne(targetEntity = PostEntity.class,
	           fetch = FetchType.LAZY)
    @JoinColumn(name = "post_Id")
    private PostEntity postId;

}
