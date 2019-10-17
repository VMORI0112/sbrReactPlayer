import React, { useState, useEffect } from 'react';

import music from '../images/music.jpg';

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

    async function fetchData() {
        const res = await fetch("https://assets.breatheco.de/apis/sound/songs");
        res.json()
        .then(res => setSongs(res))
        .catch(err => setDataError(err))
    }

    useEffect(() => {
        fetchData();
    }, []);
    

    const switchMusic = (e) => {
        let mus = e.target.dataset.url;
        let ind = Number(e.target.dataset.index);
        let name = e.target.dataset.name;
        let url = "https://assets.breatheco.de/apis/sound/"+mus;
        setMymusic(new Audio(url));
        setMyMusicName(name);
        setIndexMyMusic(ind);
    }

    const playMusicHandler = () => {
        if (myMusic) {
            myMusic.play();
            setPlayBtn("d-none");
            setPauseBtn("col btnPlay");
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
        let nexOne = IndexMyMusic+1;
        setIndexMyMusic(nexOne);
        let nexName = songs[nexOne].name;
        let nexUrl = songs[nexOne].url;
        let newSong = "https://assets.breatheco.de/apis/sound/"+nexUrl;
        myMusic.pause();
        myMusic.currentTime = 0;
        setPlayBtn("col btnPlay");
        setPauseBtn("d-none");
        setMyMusicName(nexName);
        setMymusic('');
        setMymusic(new Audio(newSong));
        console.log(myMusic);        
    }

    return (
        <>
        {dataError}
        <div className="container mt-5">
            <div className="card player">
                <img src={music} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="alert alert-primary text-center" role="alert">
                        {myMusicName}
                        <span className="badge badge-pill badge-danger">{msg}</span>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <i className="fas fa-step-backward fa-2x"></i>
                        </div>
                        <div onClick={playMusicHandler} className={playBtn}>
                            <i className="fas fa-play fa-2x"></i>
                        </div>
                        <div onClick={pauseMusicHandler} className={pauseBtn}>
                            <i className="fas fa-pause fa-2x"></i>
                        </div>
                        <div onClick={nextMusic} className="col">
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
            })}</ul>

        </div>

        
        
        </>
    );
};

export default Player;