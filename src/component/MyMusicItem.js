import React, { useState } from 'react';
import styled from 'styled-components';
import { useMusicDispatch, usePlayPauseDispatch, usePlayPauseState } from '../MusicContext';
import { usePlaylistDispatch, usePlaylistState } from '../PlaylistContext';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import QueueIcon from '@material-ui/icons/Queue';
import PauseIcon from '@material-ui/icons/Pause';

const OptionBox = styled.ul`
    position: absolute;
    right: -50%; top: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    width:180px;
    margin:0;
    padding: 12px 0;
    background:#212121;

    z-index:5;

    border:1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
`;

const OptionList = styled.li`
    display: flex;
    align-items: center;
    backgound: #212121;

    width:100%;
    height: 36px;
    padding:0 8px;

    cursor: pointer;

    &:hover{
        background:#323232;
    }
`;

const OptionListText = styled.div`
    font-size: 12px;
    margin:0 4px;
`;

const ThumbBoxHover = styled.div`
    position: absolute;
    left:0; top:0;
    background:rgba(0,0,0,0.5);

    width:100%;
    height:100%;

    display: ${props => props.nowPlaying ? "initial" : "none"};

`;

const MoreVertContainer = styled.a`
    position: absolute;
    right: 5%; top:6%;
    width: 20px;
    height: 20px;
    background: none;
`;


const ThumbBox = styled.div`
    position: relative;
    width:100%;

    cursor: pointer;

    &:hover{
        ${ThumbBoxHover}{
            display: initial;
        }
    }
`;

const ItemBox = styled.div`
    width:180px;
    display:flex;
    flex-direction: column;
    align-items: left;
    justify-content:space-between;
    margin:10px 20px 10px 0;

    position:relative;
    
`;

const ItemInfo = styled.div`
    margin: 15px 0 0 0;
`;

const ItemTitle = styled.div`
    font-weight: bold;
    font-size:12px;
`;

const ItemArtist = styled.div`
    font-size:12px;
`;

const ItemThumb = styled.img`
    width:100%;
    border-radius: 4px;
`;

const NowPlayingIcon = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "45px"
}

function MyMusicItem({ id, title, thumb, artist, url, nowPlaying }) {
    const dispatch = useMusicDispatch();
    const playlistDispatch = usePlaylistDispatch();
    const playDispatch = usePlayPauseDispatch();
    const playState = usePlayPauseState();
    const list = usePlaylistState();

    const [option, setOption] = useState(false);
    const [hover, setHover] = useState(false);

    const onMusicPlay = () => {
        dispatch({ type: "PLAY", id });
        playlistDispatch({ type: 'ADD_PLAYLIST', id, title, artist, thumb, url, nowPlaying });
        playlistDispatch({ type: "SET_NOWPLAYING", id });
        playDispatch({ type: 'PLAY' });
        // if (list.length === 0) {
        //     onOpenPop();
        // }
    }

    const onJustAdd = () => {
        playlistDispatch({ type: 'ADD_PLAYLIST', id, title, artist, thumb, url, nowPlaying });
        setOption(!option);
    }
    const onMore = (e) => {
        e.stopPropagation();
        setOption(!option);
    }

    const onMouseEnter = () => {
        setHover(true);
    }

    const onMouseLeave = () => {
        setHover(false);
    }

    const onPlayPause = (e) => {
        e.stopPropagation();
        if (playState) {
            playDispatch({ type: 'PAUSE' });
        } else {
            playDispatch({ type: 'PLAY' });
        }
    }

    return (
        <ItemBox>
            <ThumbBox onClick={onMusicPlay}>
                {!nowPlaying &&
                    <div>
                        <ThumbBoxHover>
                            <MoreVertContainer onClick={onMore}>
                                <MoreVertIcon />
                            </MoreVertContainer>
                        </ThumbBoxHover>
                        <PlayArrowIcon style={NowPlayingIcon} />
                    </div>}
                {nowPlaying &&
                    <div>
                        <ThumbBoxHover nowPlaying>
                            <MoreVertContainer onClick={onMore}>
                                <MoreVertIcon />
                            </MoreVertContainer>
                        </ThumbBoxHover>
                        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            {!playState && <PlayArrowIcon style={NowPlayingIcon} onClick={onPlayPause} />}
                            {playState && <div>
                                {!hover && <VolumeUpIcon style={NowPlayingIcon} />}
                                {hover && <PauseIcon style={NowPlayingIcon} onClick={onPlayPause} />}
                            </div>}
                        </div>
                    </div>
                }
                <ItemThumb src={thumb} style={{ cursor: "pointer" }} />
            </ThumbBox>
            {option && <OptionBox>
                <OptionList onClick={onJustAdd}>
                    <QueueMusicIcon style={{ fontSize: "20px", margin: "0 4px" }} />
                    <OptionListText>목록에 추가</OptionListText>
                </OptionList>
                <OptionList>
                    <QueueIcon style={{ fontSize: "20px", margin: "0 4px" }} />
                    <OptionListText>보관함에 추가</OptionListText>
                </OptionList>
            </OptionBox>}
            <ItemInfo>
                <ItemTitle>{title}</ItemTitle>
                <ItemArtist>{artist}</ItemArtist>
            </ItemInfo>
        </ItemBox>
    );
}

export default React.memo(MyMusicItem);