import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { Back_And_Close } from '.';

class search_pw extends Component {
  render() {
    const {
    _closeSearchModal, _backSearchModal, target 
      } = this.props;

    return (
        <div>
            <Modal visible={this.props.search_pw_modal} 
                    width="400" height="380"
                    effect="fadeInDown" 
                >
            <Back_And_Close
            _closeSearchModal = {_closeSearchModal}
            _backSearchModal = {_backSearchModal}
            target = {target}/>
                <div className='Search_div'>
                <h4> 비밀번호 찾기 </h4>

                <div>  
                  <h5> 아이디 </h5>
                  <input type='text' maxLength='15' name='search_pw_id'/>
                </div>

                <div>  
                  <h5> 이메일 </h5>
                  <input type='text' maxLength='20' name='search_pw_email'/> 
                
                  <div id='search_id_email_div'>
                    @
                    <input type='text' maxLength='15' name='search_pw_write_email'/>
                  </div>
                </div>

                <div>
                  <input type='button' value='조회하기' name='search_pw_submit'/>
                </div>
              </div>
            </Modal>
        </div>
    );
  }
}

export default search_pw;
