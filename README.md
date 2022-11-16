# 🎨 Deep-Story


 <span style="color:gray">*__Project Summary__*</span>
 
✔️ **프로젝트 명** 

딥러닝 GAN 을 이용한 그림 일기 블로그 

**✔️ 프로젝트 기간**

2022.10.13 ~ 2022.11.11

**✔️ 홈페이지 url** 

deepstories.online

**✔️ 프로젝트 설명**


  ![Untitled](https://user-images.githubusercontent.com/66711073/202166183-1e0b959d-6ece-4e27-95a7-c4158cac4c94.png)

- 딥러닝 인공지능 모델을 이용한 그림 포스팅 서비스
- 사용자 간의 소통을 돕는 서비스
- 서버 관리 편의성을 돕는 관리자 전용 서비스

## 01. 팀 소개

**✔️ 팀 ‘ 알사모 ’**

![Untitled (3)](https://user-images.githubusercontent.com/66711073/202217475-48dd6cd5-6a69-488c-b0fb-9279a162bf78.png)
d58.png)


| 이름 | 주 포지션 | 세부 담당  | GITHUB 주소 |
| --- | --- | --- | --- |
| 김영준 | Leader |  | https://github.com/itavita08 |
| 은혜선 | Front Back | React와 Flask 연동 작업, 게시물 만들기 Front - Back, 게시물 상세 페이지 Front - Back, 비밀 게시물 신청, 수락, 비밀 게시물 관련 페이지 생성 및 React - Spring Boot와 연동 | https://github.com/EunHyeSeon |
| 이명호 |  |  | https://github.com/MyM999 |
| 최소영 | Back, AWS DevOps | Back REST-API 생성, Spring boot-React AXIOS 및 JSON 데이터 통신, Back 단 HTTP 상태코드 및 사용자 정의 예외 처리, 회원가입/로그인 관련 Token 인증 back, front 작업, AWS EC2 서버 환경 구축 및 관리, AWS RDS ,Elasticache 로 Mysql, Redis DB 관리, AWS SDK for java 작업, AWS 빌드 및 배포, React SideBar, Header 생성, React router 작업 | https://github.com/cso6005 |



## 02. 프로젝트 기획

**✔️ 주제 선정 이유 및 기획 의도**

팀원 모두 딥러닝에 관심이 많아 이에 대해 조사하던 중, GAN 이미지 생성 모델에 관심을 가지게 되었습니다.

그리고 이를 활용한 서비스는 무엇일까 고민한 끝에 인공지능이 생성한 이미지로 

그림 일기를 작성 할 수 있는 블로그가 있다면, 기존의 블로그와 차별화된 서비스가 될 것이라는 생각에서 본 프로젝트를 기획하게 되었습니다.


**✔️ 주요 서비스**

**🙋‍♀️ 일반 User 공통 서비스**

- **그림 포스팅 서비스 “Create Post”**
    
    👉 **인공지능 이미지 생성** 
    
    - 사용자가 입력한 텍스트에 대해 인공지능이 그린 이미지를 제공하여,
        
        자신만의 그림 일기를 만들 수 있는 서비스
        
    
- **사용자 간의 소통을 돕는 서비스 “Secret Diary”**
    - 비밀 친구 맺기 서비스
    - 친구와 함께 공유 다이어리를 쓸 수 있는 서비스
    
- **사용자 갤러리 기능 “Gallery”**
    - 유저가 생성한 이미지를 모아둔 갤러리 서비스

- **공유 게시글 좋아요 기능 “Interest”**
    - 마음에 드는 게시물에 좋아요 을 누를 수 있는 서비스
    - 좋아요 상위 게시물 메인 페이지에 노출

**🧑‍💼 Admin 전용 서비스**

- **로그 시각화 그래프 “Dash Board”**
    - ‘전체 유저 수’, ‘전체 포스팅 수 ’,  ‘시간대 별 유저 접속 분포(월 별 필터)’,
        
         ‘성비 별 유저 비율’ ,  ‘나이 대 별 성비 유저 비율’  분석 및 시각화 그래프를 확인할 수 있는 서비스
        
    
- **Deep Learning model Flask AWS 서버 ON/OFF 기능**
    - 딥러닝 Flask EC2 인스턴스 를 시작 중지를 제어할 수 있는 서비
        
        클라우드 서비스에 대해 비용 절감을 도움.

## 03. 프로젝트 설계

✔️ **서비스 아키텍처**

![Untitled (1)](https://user-images.githubusercontent.com/66711073/202168742-86ce9773-6339-4b48-881e-c3a09bdfad19.png)

**✔️ 개발 스택 및 사용 TOOL**

- **OS**

<img src="https://img.shields.io/badge/Windows-0078D6?style=flat&logo=Windows&logoColor=white"> <img src="https://img.shields.io/badge/Linux-FCC624?style=flat&logo=Linux&logoColor=white">  <img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat&logo=Ubuntu&logoColor=white">

- **Back**

<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=Spring Boot&logoColor=white"> ![](https://img.shields.io/badge/Java-007396?style=flat&logo=OpenJDK&logoColor=white") <img src="https://img.shields.io/badge/Apache Tomcat-F8DC75?style=flat&logo=Apache Tomcat&logoColor=white"> <img src="https://img.shields.io/badge/Apache Maven-C71A36?style=flat&logo=Apache Maven&logoColor=white">

- **Back**

<img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=Flask&logoColor=white"> <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=Python&logoColor=white">

- **Front**

<img src="https://img.shields.io/badge/React-1DAFB?style=flat&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white">


- **Server Cloud**

<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat&logo=Amazon AWS&logoColor=white">  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2&logoColor=white"> <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat&logo=Amazon RDS&logoColor=white"> <img src="https://img.shields.io/badge/AWS elasticache-008DE4?style=flat&logo=AWS elasticache&logoColor=white"> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat&logo=Amazon S3&logoColor=white">  <img src="https://img.shields.io/badge/Amazon SDK-007AAC?style=flat&logo=Amazon SDK&logoColor=white">

- **인공지능**

<img src="https://img.shields.io/badge/GAN Deep Learning-000000?style=flat&logo=GAN Deep Learning&logoColor=white"> <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=PyTorch&logoColor=white">


- **DB**

<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/Redis-DC382D?style=flat&logo=Redis&logoColor=white">


- **기타**

<img src="https://img.shields.io/badge/Eclipse-2C2255?style=flat&logo=Eclipse IDE&logoColor=white"> <img src="https://img.shields.io/badge/VSC-007ACC?style=flat&logo=VisualStudioCode&logoColor=white"> <img src="https://img.shields.io/badge/Anaconda-44A833?style=flat&logo=Anaconda&logoColor=white"> 

<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/REST API-5A29E4?style=flat&logo=REST API&logoColor=white">  <img src="https://img.shields.io/badge/JSON-000000?style=flat&logo=JSON&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON Web Tokens&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=Swagger&logoColor=white">

<img src="https://img.shields.io/badge/FileZilla-BF0000?style=flat&logo=FileZilla&logoColor=white"> <img src="https://img.shields.io/badge/Putty-283274?style=flat&logo=Putty&logoColor=white"> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white">


- **프로젝트 관리**

<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Zenhub backlog-0865AD?style=flat&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Agile-E20074?style=flat&logo=A&logoColor=white"> 
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white">


**✔️ DB ERD**

![Untitled (2)](https://user-images.githubusercontent.com/66711073/202168831-87a85bd1-db9c-482c-b90a-41ef487b9d58.png)

**✔️ 웹 페이지 와이어프레임**  

https://www.figma.com/file/TEpQwcZiBwEdyXZKpzHipy/projec?node-id=11%3A1387

## 04. 프로젝트 수행 내용

✔️ **프로젝트 진행 및 협업 방식**

- **애자일 프로세스 운영 - git zenhub 활용**
    - **Back Log & 칸반보드 & Burndown report**
        
        스토리 포인트, 포지션, 에픽의 상태 등을 기술하여 효율적 업무 처리를 유도
        
    - **Daliy Check in out**
        
        TODOLIST 를 공유하며, 업무 끝에 일일 회고를 진행하여 서로의 작업 경과를 공유
        
    - **스프린트 회고**
        
        스프린트 종료일에 회고를 진행하여, 느낌점, 아쉬운 점을 나누고 다음 스프린트를 위해 보완되어야 할 점을 논의
        
        [https://github.com/itavita08/DailyCheck](https://github.com/itavita08/DailyCheck)
        
- **Git Hub 소스코드 관리**
    - Git-flow 을 활용한 코드 형상관리

- **Swagger**
    - API명세서 작성 및 관리
    

**✔️ 개발 및 기술 구현 결과**

- **Front End**
    - 서비스 기능에 적합한 `React JavaScript`  구현
    - Figma 와이어 프레임에 적합한 `Front CSS`  구현
    
    - 재사용성을 높이기 위한 `component` 화
    - 화면 이동에 적합한 `Router`, `navigate` 설계 및 구현
    
    - Back Spring boot, Flask 와  `AXIOS HTTP` 통신 및 `JSON` 포맷 데이터 통신
    - `Log data` 분석 및 `apexchart` 시각화
    - 예외 발생에 따른 페이지 화면 이동 설계 및 구현

- **Back**
    - 로직에 적합한 `DB table` 설계
    - 일반 데이터 관리 DB `Mysql`, 토큰 데이터 관리 DB `Redis` 구축
    
    - Spring Boot 단 `MVC` 디자인 패턴 구현
    - 서비스 기능에 필요한 `REST API` 구현
    - `SpringSecurity` + `JWT` + `Redis` 사용한 Token 인증 로직으로 회원을 관리
    - `Log data` 수집 및 분석
    
    - Front 과 `JSON` 포맷 데이터 통신
    
    - HTTP 상태 코드 `exception` 처리 (400, 401, 404, 405, 500)
    - 사용자 정의 예외 발생 및 처리
    
    - 효율적 API 관리를 위해 `Swagger` 사용
    - `Junit`, `Postman` 을 통해 `Test` & `debugging`
    - 배포를 위한 `maven build`

- **Server Cloud**
    - `React`, `Spring boot`, `Flask` 서버 각각 다른 `EC2 인스턴스` 생성
    - React, Spring boot, Flask 배포 서버 통신 `CORS` 문제 해결
    - DB Mysql 을 위한 `AWS RDS` 구축
    - DB Redis 을 위한 `AWS  elasticache` 구축
    - 이미지 데이터 관리를 위한 `AWS S3` 구축
    - Deep Learning Flask 서버 제어를 위한 `SDK for java` `Start Instance`, `Stop Instance` 구현

**✔️ 회고**
| 이름 | 회고 |
| --- | --- |
| 김영준 | 큰 틀을 잡아 놓고 각자 기능 별로 분담을 하고 Agile 형식으로 진행하니 좋았다. 모든 팀원들이 잘 따라 와주고 알아서 너무나 잘해서 팀 프로젝트 하는 것에는 별 문제가 없지만 이제까지 살아오면서 제일 길었던 3주였던 것 같다. 일주일만 시간이 더 있었으면 좋겠다. |
| 은혜선 | 모르는 것이나 에러를 찾아보고 공부를 하면서 코드를 짜니 시간이 많이 들고 하나의 기능을 구현하는데도 생각보다 오래 걸린 적이 많았다. 체력적으로 힘든 것을 많이 느끼지만 팀원들이 열심히 하는 모습에 나도 해야겠다는 생각이 들었던 것 같다. |
| 이명호 | 공부를 담 쌓고 지낸 것이 후회되었다. React, Node.js 생각보다 재밌다. 모르는 것에 대해 팀원들과 소통을 통해 해결한 일이 많아 혼자 하는 것보다 협업의 중요성을 확실히 깨우친 듯 하다. 고생한 팀원과 노트북 토닥토닥 해주기! |
| 최소영 | 지금까지 함께하며 도와주신 팀원들 다 너무너무 감사하다. 좋은 팀원을 만나서 다행이라고 느꼈다. 시간이 조금 더 있다면 완성도 있는 작품이 나올 수 있었을텐데.. 아쉽긴 하다. 프로젝트를 하면서 느낀 점도 많고 실력이 쌓이는 것이 느껴지면서 진로도 어느 정도 정할 수 있었다. |
