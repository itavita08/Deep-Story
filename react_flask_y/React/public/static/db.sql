-- create database deep_story;

-- show databases;

USE deep_story;

DROP TABLE IF EXISTS elk_table;
DROP TABLE IF EXISTS secret_comments;
DROP TABLE IF EXISTS secret_love;
DROP TABLE IF EXISTS secret_image;
DROP TABLE IF EXISTS secret_post;
DROP TABLE IF EXISTS secret_friends;
DROP TABLE IF EXISTS guest_user;
DROP TABLE IF EXISTS host_user;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS love;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS account_privacy;


CREATE TABLE account_privacy (
	account_id              int 	        AUTO_INCREMENT  	PRIMARY KEY 	COMMENT  'Auto Increament',
	account_email   	    Varchar(30) 	NOT NULL    	                    COMMENT  '사용자 이메일',
	account_name	        Varchar(30)	    NOT NULL	                        COMMENT '사용자 이름',
	account_password	    Varchar(100)	NOT NULL	                        COMMENT '사용자 비밀번호, 암호화해서 저장',
	account_gender	        Varchar(10)	    NOT NULL	                        COMMENT '사용자 성별',
	account_date	        Date	        NOT NULL	                        COMMENT '사용자 생년월일',
	account_type	        Varchar(30)	    NULL	                            COMMENT '사용자 구별 (관리자, 일반 유저)'
);

CREATE TABLE post (
	post_id	                int	            AUTO_INCREMENT	    PRIMARY KEY	    COMMENT 'Auto Increament',
	post_name	            VARCHAR(255)	NOT NULL,
	post_contents	        text	        NULL,
	account_id	            int	            NOT NULL	                        COMMENT 'Auto Increament',
    
	CONSTRAINT fk_post_account  FOREIGN KEY(account_id) REFERENCES account_privacy(account_id) ON DELETE CASCADE

);

CREATE TABLE love (
	love_id	                Bigint	        AUTO_INCREMENT	    PRIMARY KEY	    COMMENT 'Auto Increament',
	account_id	            int	            NOT NULL                            COMMENT 'Auto Increament',
	post_id	                int	            NOT NULL	                        COMMENT 'Auto Increament',
    
	CONSTRAINT fk_love_account  FOREIGN KEY(account_id) REFERENCES account_privacy(account_id) ON DELETE CASCADE,
	CONSTRAINT fk_love_post  FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE
);

CREATE TABLE comments (
	comment_id	            Bigint	        AUTO_INCREMENT	    PRIMARY KEY	    COMMENT 'Auto Increment',
	comment_create	        Datetime	    NOT NULL	                        COMMENT '댓글 생성날짜 - 시각',
	comment_modify	        Datetime	    NULL	                            COMMENT '댓글 수정날짜 - 시각',
	comment_data	        varchar(200)	NOT NULL	                        COMMENT '댓글내용',
    account_id	            int	            NOT NULL	                        COMMENT 'Auto Increament',
	post_id	                int	            NOT NULL	                        COMMENT 'Auto Increament',
	
	CONSTRAINT fk_comments_account  FOREIGN KEY(account_id) REFERENCES account_privacy(account_id) ON DELETE CASCADE,
	CONSTRAINT fk_comments_post  FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE
);

CREATE TABLE image (
	image_id	            int	            AUTO_INCREMENT	    PRIMARY KEY,
	image_name	            Varchar(500)	NOT NULL,
	account_id	            int	            NOT NULL,
	post_id	                int	            NOT NULL	                        COMMENT 'Auto Increament',
    
	CONSTRAINT fk_image_account  FOREIGN KEY(account_id) REFERENCES account_privacy(account_id) ON DELETE CASCADE,
	CONSTRAINT fk_image_post  FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE
    
);

CREATE TABLE host_user (
	host_id	                int	            AUTO_INCREMENT	     PRIMARY KEY    COMMENT 'Auto increament',
	account_id	            int	            NOT NULL	                        COMMENT 'Auto Increament',
    
	CONSTRAINT fk_host_account  FOREIGN KEY(account_id) REFERENCES account_privacy(account_id) ON DELETE CASCADE
    
);

CREATE TABLE guest_user (
	guest_id	            int	            AUTO_INCREMENT	     PRIMARY KEY    COMMENT 'Auto increament',
	account_id	            int	            NOT NULL	                        COMMENT 'Auto Increament',
    
	CONSTRAINT fk_guest_account  FOREIGN KEY(account_id) REFERENCES account_privacy(account_id) ON DELETE CASCADE

);

CREATE TABLE secret_friends (
	secret_friend_id	    int	            AUTO_INCREMENT	     PRIMARY KEY    COMMENT 'Auto increament',
	secret_board	        Varchar(50)	    NOT NULL,
	state	                Varchar(30)	    NULL	             DEFAULT '신청상태'     COMMENT '비밀 요청 수락 상태',
	host_id	                int	            NOT NULL	                        COMMENT 'Auto increament',
	guest_id	            int	            NOT NULL	                        COMMENT 'Auto increament',
    
	CONSTRAINT fk_secret_friends_host  FOREIGN KEY(host_id) REFERENCES host_user(host_id) ON DELETE CASCADE,
	CONSTRAINT fk_secret_friends_guest  FOREIGN KEY(guest_id) REFERENCES guest_user(guest_id) ON DELETE CASCADE

);

CREATE TABLE secret_post (
	secret_post_id	        int	            AUTO_INCREMENT	    PRIMARY KEY	    COMMENT 'Auto increament',
	secret_post_name	    VARCHAR(255)    NOT NULL,
	secret_post_contents    text	        NULL,
	secret_friend_id	    int         	NOT NULL	                        COMMENT 'Auto increament',
    
	CONSTRAINT fk_secret_post_secret_friend  FOREIGN KEY(secret_friend_id) REFERENCES secret_friends(secret_friend_id) ON DELETE CASCADE

);


CREATE TABLE secret_image (
	secret_image_id	        int	            AUTO_INCREMENT	    PRIMARY KEY	    COMMENT 'Auto increament',
	secret_image_name	    Varchar(500)    NOT NULL,
	secret_post_id	        int	            NOT NULL	                        COMMENT 'Auto increament',
    
	CONSTRAINT fk_secret_image_secret_post  FOREIGN KEY(secret_post_id) REFERENCES secret_post(secret_post_id) ON DELETE CASCADE

);

CREATE TABLE secret_love (
	love_id	                Bigint	        AUTO_INCREMENT	    PRIMARY KEY	    COMMENT 'Auto Increament',
	account_id	            int	            NOT NULL	                        COMMENT 'Auto Increament',
	secret_post_id	        int	            NOT NULL	                        COMMENT 'Auto increament',
    
	CONSTRAINT fk_secret_love_account  FOREIGN KEY(account_id) REFERENCES account_privacy(account_id) ON DELETE CASCADE,
	CONSTRAINT fk_secret_love_secret_post  FOREIGN KEY(secret_post_id) REFERENCES secret_post(secret_post_id) ON DELETE CASCADE

);

CREATE TABLE secret_comments (
	comment_id	            Bigint	        AUTO_INCREMENT      PRIMARY KEY	    COMMENT 'Auto Increment',
	comment_create	        Datetime	    NOT NULL	                        COMMENT '댓글 생성날짜 - 시각',
	comment_modify	        Datetime	    NULL	                            COMMENT '댓글 수정날짜 - 시각',
	comment_data	        varchar(200)    NOT NULL	                        COMMENT '댓글내용',
	account_id	            int	            NOT NULL	                        COMMENT 'Auto Increament',
	secret_post_id	        int         	NOT NULL	                        COMMENT 'Auto increament',
    
	CONSTRAINT fk_secret_comments_account  FOREIGN KEY(account_id) REFERENCES account_privacy(account_id) ON DELETE CASCADE,
	CONSTRAINT fk_secret_comments_secret_post  FOREIGN KEY(secret_post_id) REFERENCES secret_post(secret_post_id) ON DELETE CASCADE

);

CREATE TABLE elk_table (
	elk_id	                int	            AUTO_INCREMENT	    PRIMARY KEY	    COMMENT 'Auto increament'
);