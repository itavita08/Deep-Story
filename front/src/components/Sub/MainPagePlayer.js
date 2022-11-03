import ReactPlayer from 'react-player/lazy';
import React from 'react';
import image44 from '../assets/image44.jpg';


function videoplayer() {

    return (

        <>
            <h2>Player Test</h2>
            <div className='player-wrapper' style={{float:'left'}}>
                <ReactPlayer
                    className='react-player'
                    url={'https://www.youtube.com/watch?v=cIyAqMRVecc&ab_channel=%EC%9E%AC%EB%B2%94'}    // 플레이어 url
                    width='500px'         // 플레이어 크기 (가로)
                    height='300px'        // 플레이어 크기 (세로)
                    playing={true}        // 자동 재생 on
                    muted={true}          // 자동 재생 on
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    light={false}         // 플레이어 모드
                    pip={true}            // pip 모드 설정 여부
                    
                    // onEnded={() => handleVideo()}  // 플레이어 끝났을 때 이벤트
                />
            </div>
            <img src={image44} width="auto" height="330"style={{float:'inline-start'}} />
        </>


    )
}

export default videoplayer;