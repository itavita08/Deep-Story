import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import SignComponets from "./components/Account/SignComponents";
import MainPageLoginComponent from "./components/Sub/MainPageLoginComponent";
import LogoutComponet from "./components/Account/LogoutComponet";
import LoginComponent from "./components/Account/LoginComponent";
import PostCreateComponent from "./components/Board/PostCreateComponent";
import MypageComponent from "./components/Sub/MypageComponent";
import store from "./store";
import { CookiesProvider } from "react-cookie";
import Detail from "./components/Board/Detail";
import Update from "./components/Board/Update";
import PostAllLogin from "./components/Board/PostAllLogin";
import PostAllLogout from "./components/Board/PostAllLogout";
import PostAllViewLogin from "./components/Board/PostAllViewLogin";
import PostAllViewLogout from "./components/Board/PostAllViewLogout";
import InputFriendRequest from "./components/Friendrequest/InputFriendRequest";
import SecretMain from "./components/Secret/SecretMainComponent";
import NotFound from "./NotFound";
import SecretList from "./components/Secret/SecretListComponent";
import SearchResultLoginComponent from "./components/Sub/SearchResultLoginComponent";
import SearchResultLogoutComponent from "./components/Sub/SearchResultLogoutComponent";
import GelleryResultComponent from "./components/Gallery/GelleryResultComponent";
import GetGelleryComponent from "./components/Gallery/GetGelleryComponent";
import SecretPostCreateComponent from "./components/Secret/SecretPostCreateComponent";
import SecretDetailComponent from "./components/Secret/SecretDetailComponent";
import SecretPostUpdate from "./components/Secret/SecretPostUpdate";
import DashBoard from "./components/Chart/DashBoard";
import InterestPostConponent from "./components/Board/InterestPostConponent";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <CookiesProvider>
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<App />} />
              <Route path="/main" exact element={<MainPageLoginComponent />} />
              <Route path="/sign" exact element={<SignComponets />} />
              <Route path="/login" exact element={<LoginComponent />} />
              <Route path="/logout" exact element={<LogoutComponet />} />
              <Route path="/save" exact element={<PostCreateComponent />} />
              <Route path="/mypage" exact element={<MypageComponent />} />
              <Route path="/searchboard" exact element={<SearchResultLoginComponent />} />
              <Route path="/search" exact element={<SearchResultLogoutComponent />} />
              <Route path="/getgellery" exact element={<GetGelleryComponent />} />
              <Route path="/gellery" exact element={<GelleryResultComponent />} />
              <Route path="/getboardall" element={<PostAllLogin />} />
              <Route path="/getall" element={<PostAllLogout />} />
              <Route path="/boardall" element={<PostAllViewLogin />} />
              <Route path="/all" element={<PostAllViewLogout />} />
              <Route path="/read" exact element={<Detail />} />
              <Route path="/requestfriend" element={<InputFriendRequest />} />
              <Route path="/secretfriend" element={<SecretMain />} />
              <Route path="/interest" element={<InterestPostConponent />} />
              <Route path="/white" exact element={<Update />} />
              <Route path="/secret" element={<SecretList />} />
              <Route path="/secret/save" element={<SecretPostCreateComponent />} />
              <Route path="/secret/read" element={<SecretDetailComponent />} />
              <Route path="/secret/white" element={<SecretPostUpdate />} />
              <Route path="/dashBoard" element={<DashBoard />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </CookiesProvider>
  </React.Fragment>
);

reportWebVitals();
