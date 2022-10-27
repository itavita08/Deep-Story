package io.playdata.lo.model.domain;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="secret_love")
public class SecretLoveEntity {
	
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "love_id")
    private int loveId;

    @JoinColumn(name = "account_id")
	@ManyToOne(targetEntity = AccountEntity.class, fetch = FetchType.LAZY)
    private AccountEntity accountId;

    @JoinColumn(name = "secret_post_id")
	@ManyToOne(targetEntity = SecretPostEntity.class, fetch = FetchType.LAZY)
    private SecretPostEntity secretPostId;

}
