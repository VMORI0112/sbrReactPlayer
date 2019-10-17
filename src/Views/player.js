import React, { useState, useEffect } from 'react';

import music from '../images/music.jpg';
import vinyl from '../images/vinyl.png';
import runMario from '../images/mario.gif';

const Player = () => {

    const [songs, setSongs] = useState(null);
    const [dataError, setDataError] = useState(null);
    const [myMusic, setMymusic] = useState(null);
    const [IndexMyMusic, setIndexMyMusic] = useState();
    const [msg, setMsg] = useState('');
    const [myMusicName, setMyMusicName] = useState("Please choose a music");
    const [playBtn, setPlayBtn] = useState("col btnPlay");
    const [pauseBtn, setPauseBtn] = useState("d-none");
    const [loopBtn, setLoopBtn] = useState('col looop');
    const [stopLoopBtn, setStopLoopBtn] = useState('d-none');
    const [album, setAlbum] = useState("albumSpin");
    const [marioGonnaRun, setMarioGonnaRun] = useState("mario");


    async function fetchData() {
        const res = await fetch("https://assets.breatheco.de/apis/sound/songs");
        res.json()
        .then(res => setSongs(res))
        .catch(err => setDataError(err))
    }

    useEffect(() => {
        fetchData();
    },[myMusic]);
    

    const switchMusic = (e) => {
        if (myMusic) pauseMusicHandler();
        let mus = e.target.dataset.url;
        let ind = Number(e.target.dataset.index);
        let name = e.target.dataset.name;
        let url = "https://assets.breatheco.de/apis/sound/"+mus;
        setMymusic(new Audio(url));
        setMyMusicName(name);
        setIndexMyMusic(ind);
    }

    console.log(myMusic);
    

    const playMusicHandler = () => {
        if (myMusic) {
            myMusic.play();
            setPlayBtn("d-none");
            setPauseBtn("col btnPlay");
            setAlbum("albumSpin rotate");
            if (myMusicName.includes("Mario")) {setMarioGonnaRun("mario run")};
        } else {
            setMsg("Choose a music you IDIOT!");
            setTimeout(() => {
                setMsg('');
            },2000)
        }
    }
    const pauseMusicHandler = () => {
        myMusic.pause();
        myMusic.currentTime = 0;
        setPlayBtn("col btnPlay");
        setPauseBtn("d-none");
        setAlbum("albumSpin");
        setMarioGonnaRun("d-none");
    }
    const loopAudio = () => {
        if (myMusic) {
            myMusic.loop = true;
            setLoopBtn("d-none");
            setStopLoopBtn("col looop");
        }
    }
    const stopLoopAudio = () => {
        myMusic.loop = false;
        setLoopBtn("col looop");
        setStopLoopBtn("d-none");
    }
    const nextMusic = () => {
        let leng = songs.length-1;
        let nexOne = IndexMyMusic+1;
        var nexName;
        var nexUrl;
        if (IndexMyMusic === leng) {
            nexName = songs[0].name;
            nexUrl = songs[0].url;
            setIndexMyMusic(0);
        } else {
            nexName = songs[nexOne].name;
            nexUrl = songs[nexOne].url;
            setIndexMyMusic(nexOne);
        }
        let newSong = "https://assets.breatheco.de/apis/sound/"+nexUrl;
        myMusic.pause();
        myMusic.currentTime = 0;
        setPlayBtn("col btnPlay");
        setPauseBtn("d-none");
        setAlbum("albumSpin");
        setMyMusicName(nexName);
        setMymusic('');
        setMymusic(new Audio(newSong)); 
    }
    const prevMusic = () => {
        let leng = songs.length-1;
        let prevOne = IndexMyMusic-1;
        var nexName;
        var nexUrl
        if (IndexMyMusic === 0) {
            setIndexMyMusic(leng);
            nexName = songs[leng].name;
            nexUrl = songs[leng].url;
        } else {
            setIndexMyMusic(prevOne);
            nexName = songs[prevOne].name;
            nexUrl = songs[prevOne].url;
        }
        let newSong = "https://assets.breatheco.de/apis/sound/"+nexUrl;
        myMusic.pause();
        myMusic.currentTime = 0;
        setPlayBtn("col btnPlay");
        setPauseBtn("d-none");
        setAlbum("albumSpin");
        setMyMusicName(nexName);
        setMymusic('');
        setMymusic(new Audio(newSong)); 
        console.log(leng);
    }

    return (
        <>
        {dataError}
        <div className="container mt-5">
            <div className="row">

                <div className="col-4">
                    <img className={album} src={vinyl} alt="..."/>
                </div>

                <div className="col-4">
                    <div className="card player">
                        <img src={music} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <div className="alert alert-primary text-center" role="alert">
                                {myMusicName}
                                <span className="badge badge-pill badge-danger">{msg}</span>
                            </div>
                            <div className="row text-center">
                                <div onClick={prevMusic} className="col prev">
                                    <i className="fas fa-step-backward fa-2x"></i>
                                </div>
                                <div onClick={playMusicHandler} className={playBtn}>
                                    <i className="fas fa-play fa-2x"></i>
                                </div>
                                <div onClick={pauseMusicHandler} className={pauseBtn}>
                                    <i className="fas fa-pause fa-2x"></i>
                                </div>
                                <div onClick={nextMusic} className="col next">
                                    <i className="fas fa-step-forward fa-2x"></i>
                                </div>
                                <div onClick={loopAudio} className={loopBtn}>
                                    <i className="fas fa-sync"></i>
                                </div>
                                <div onClick={stopLoopAudio} className={stopLoopBtn}>
                                    <i className="fas fa-ban"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <ul className="list-group listSongs">{!songs ? ("loading...") : songs.map((item, index) => {
                        return (
                                <li 
                                    key={index} 
                                    className="list-group-item list-group-item-action" 
                                    onClick={switchMusic} 
                                    data-url={item.url} 
                                    data-name={item.name}
                                    data-index={index}
                                >
                                    {index+1} - {item.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </div> 
        </div>

        <div className={marioGonnaRun}>
            <img src={runMario} width="100px" height="100px" alt="witch" />
        </div>
        </>
    );
};

export default Player;