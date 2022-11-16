import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./MypageComponent.css";
import Card from "../CardGroup/Card";
import SecretFriendModal from "./SecretFriendModal";
import profile from "../assets/profile.jpg";

function MypageComponent(props) {
  const [accountEmail, setAccountEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountGender, setAccountGender] = useState("");
  const [accountDate, setAaccountDate] = useState("");

  const [postCount, setPostCount] = useState(0);

  const [postList, setPostList] = useState([]);
  const [secretRequest, setSecretRequest] = useState([]);
  const [secretRequestCount, setSecretRequestCount] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

  const getProfil = async () => {
    await axios.get("/api/v1/board/profil").then((response) => {
      setAccountEmail(response.data.accountEmail);
      setAccountName(response.data.accountName);
      setAaccountDate(response.data.accountDate);
      setAccountGender(response.data.accountGender);
    });
  };

  const getAlarm = async () => {
    await axios.get("/api/v1/secret/alarm").then((response) => {
      const data = JSON.stringify(response.data);
      const data2 = JSON.parse(data);
      data2.map((a) => {
        secretRequest.push(a);
      });
      setSecretRequestCount(data2.length);
    });
  };

  const getPostList = async () => {
    await axios.get("/api/v1/board/list").then((response) => {
      setPostCount(response.data.length);
      setPostList(response.data);
    });
  };

  useEffect(() => {
    getAlarm();
    getProfil();
    getPostList();
  }, []);

  return (
    <div className="App">
      <div>
        <LoginHeader></LoginHeader>
        <SidebarAll />

        <div>
          <section className="vh-100" style={{ backgroundColor: "white" }}>
            <MDBContainer className="py-5 h-100">
              <MDBRow
                className="justify-content-center align-items-center h-100"
                style={{}}
              >
                <MDBCol lg="6" className="mb-4 mb-lg-0">
                  {secretRequestCount !== 0 ? (
                    <div>
                      <br />
                      <input
                        alt="alarm"
                        type="image"
                        style={{ width: 30, height: 30 }}
                        src="/static/alarm/alarm1.png"
                        onClick={openModal}
                      />
                      <SecretFriendModal
                        open={modalOpen}
                        close={closeModal}
                        header="공유 다이어리 신청한 친구 목록"
                        data={secretRequest}
                      />
                    </div>
                  ) : (
                    <div>
                      Add Friend :
                      <input
                        alt="no-alarm"
                        type="image"
                        style={{ width: 30, height: 30 }}
                        src="/static/alarm/alarm.png"
                      />
                    </div>
                  )}
                  <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                    <MDBRow className="g-0">
                      <MDBCol
                        md="12"
                        className="gradient-custom text-center text-white"
                        style={{
                          borderTopLeftRadius: ".5rem",
                          borderBottomLeftRadius: ".5rem",
                        }}
                      >
                        <MDBCardImage
                          src={profile}
                          alt="Avatar"
                          className="my-5"
                          style={{ width: "200px" }}
                          fluid
                        />
                        <MDBTypography tag="h5">{accountName}</MDBTypography>
                        <MDBCardText>Developer</MDBCardText>
                        <MDBIcon far icon="edit mb-5" />
                      </MDBCol>
                      <MDBCol md="8">
                        <MDBCardBody className="p-4">
                          <MDBTypography tag="h6">Information</MDBTypography>
                          <hr className="mt-10 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Email</MDBTypography>
                              <MDBCardText className="text-muted">
                                {accountEmail}
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Gender</MDBTypography>
                              <MDBCardText className="text-muted">
                                {accountGender}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                        <MDBBtn
                          outline
                          rounded
                          color="warning"
                          button
                          id="createPost"
                          onClick={() => navigate("/postCreate")}
                        >
                          글쓰기
                        </MDBBtn>

                        <MDBBtn
                          outline
                          rounded
                          color="warning"
                          button
                          id="updateProfil"
                          onClick={() =>
                            navigate("/updateProfil", {
                              state: {
                                Email: accountEmail,
                                Name: accountName,
                                Gender: accountGender,
                                Birth: accountDate,
                              },
                            })
                          }
                        >
                          회원 정보 수정
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
      </div>

      {postList.map((post) =>
        post.image === null ? (
          <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="row">
              <div className="col-md-4" key={post.postId}>
                <Card
                  postId={post.postId}
                  imageSource="/static/image/noimage.png"
                  title={post.title}
                  text={post.content}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="row">
              <div className="col-md-4" key={post.postId}>
                <Card
                  postId={post.postId}
                  imageSource={
                    `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
                    post.image +
                    ".png"
                  }
                  title={post.title}
                  text={post.content}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default React.memo(MypageComponent);
