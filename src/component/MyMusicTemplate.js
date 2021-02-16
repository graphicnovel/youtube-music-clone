import React from 'react';
import styled from 'styled-components';
import MyMusicList from './MyMusicList';

const MyMusicTemplateStyle = styled.div`
    width:80%;
    margin:0 auto;
`;

function MyMusicTemplate({ myMusicPop }) {

    return (
        <MyMusicTemplateStyle>
            <h1>보관함에 담은 음악</h1>
            <MyMusicList myMusicPop={myMusicPop} />
        </MyMusicTemplateStyle>
    );
}

export default React.memo(MyMusicTemplate);