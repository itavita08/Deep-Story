import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { Back_And_Close } from '.';
import axios from 'axios';



class search_id extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result : false,
        }
    }
    
    

    _searchUserID = async function() {
        const user_name = document.getElementsByName('search_id_name')[0].value.trim();
        // const user_birthday = Number(document.getElementsByName('search_id_birthday')[0].value.trim());
        // const user_sex = Number(document.getElementsByName('search_id_sex')[0].value.trim());
    
        const email_id = document.getElementsByName('search_id_email')[0].value.trim();
        const email_host = document.getElementsByName('search_id_write_email')[0].value.trim();
    
        const user_email = email_id + '@' + email_host;
    
        // 이메일 체크
        const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        
        
        const obj = {
            user_name : user_name,
            user_email : user_email
        }
        
        const res = await axios('/search/id', {
            method : 'POST',
            data : obj,
            headers: new Headers()
          })
        if(user_name === "" || user_name.length < 1) {
          return alert('이름을 작성해주세요.');
    
        } else if(user_name.length < 2) {
          return alert('이름은 최소 2글자 이상이여야 합니다.');
        }
    
      
    
        if(email_id === "" || email_host === "") {
          return alert('이메일을 모두 입력해주세요.');
    
        } else if(!user_email.match(email_check)) {
          return alert('올바른 이메일 형식을 입력해주세요.');
        }
        if(res.data.length === 0) {
            return alert('일치하는 데이터가 없습니다 \n다시 확인해주세요.');
         }
         this.setState({ result : res.data })
      }
      _resetIDResult = () => {
        this.setState({ result : false })
      }
      
      
  render() {
    const { 
        _closeSearchModal, _backSearchModal, target 
      } = this.props;
    
    
    const {result} = this.state;
    return (
        <div>
            <Modal visible={this.props.search_id_modal} 
                    width="400" height="380"
                    effect="fadeInDown" 
                >
            <Back_And_Close 
            _closeSearchModal = {_closeSearchModal}
            _backSearchModal = {_backSearchModal}
            _resetIDResult = {this._resetIDResult}
            target = {target}/>
            {!result?
            <div className='Search_div'>
                <h4> 아이디 찾기 </h4>
                <div>  
                  <h5> 이름 </h5>
                  <input type='text' maxLength='15' name='search_id_name'/>
                </div>

          

                <div>  
                  <h5> 이메일 </h5>
                  <input type='text' maxLength='20' name='search_id_email'/> 
                
                  <div id='search_id_email_div'>
                    @
                    <input type='text' maxLength='15' name='search_id_write_email'/>
                  </div>
                </div>

                <div>
                  <input type='button' value='조회하기' name='search_id_submit'/>
                </div>
              </div>
                : //아이디를 조회한 경우
                <div>
                <h4> 아이디 찾기 </h4>

                <div className='Search_id_result'>
                  <p> 아래의 회원 정보를 찾았습니다. </p>

                  <div className='Search_id_result_div'>
                    <div>
                      <h5> 아이디 </h5>
                      {result[0].id}
                    </div>

                    
                  </div>

                  <div>
                    <input type='button' value='돌아가기' name='search_id_back'
                    onClick={() => this.resetBack()}/>
                  </div>
                </div>
              </div>
                    
            }
            </Modal>
        </div>
    );
  }
}

export default search_id;



