import React, { useState, useEffect } from 'react';

import music from '../images/music.jpg';
import vinyl from '../images/vinyl.png';
import runMario from '../images/mario.gif';
import zelda from '../images/zelda.gif';
import sonic from '../images/sonic.gif';
import flintstones from '../images/flintstones.gif';
import powerRangers from '../images/power.gif';
import bart from '../images/bart.gif';
import sp1 from '../images/sp1.gif';
import sp2 from '../images/sp2.gif';
import sp3 from '../images/sp3.gif';
import thundercats from '../images/thundercats.gif';
import xmen from '../images/xmen.gif';

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
    const [marioGonnaRun, setMarioGonnaRun] = useState("d-none");
    const [zeldaDiv, setZeldaDiv] = useState("d-none");
    const [sonicDiv, setSonicDiv] = useState("d-none");
    const [flintstonesDiv, setFlintstonesDiv] = useState("d-none");
    const [powerRangersDiv, setPowerRangersDiv] = useState("d-none");
    const [bartDiv, setBartDiv] = useState("d-none");
    const [southParkDiv, setSouthParkDiv] = useState("d-none");
    const [thundercatsDiv, setThundercatsDiv] = useState("d-none");
    const [xmenDiv, setXmenDiv] = useState("d-none");


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
            if (myMusicName.includes("Zelda")) {setZeldaDiv("zelda")};
            if (myMusicName.includes("Sonic")) {setSonicDiv("sonic")};
            if (myMusicName.includes("Flintstones")) {setFlintstonesDiv("flintstones")};
            if (myMusicName.includes("power")) {setPowerRangersDiv("power")};
            if (myMusicName.includes("simpsons")) {setBartDiv("bart")};
            if (myMusicName.includes("south")) {setSouthParkDiv("south")};
            if (myMusicName.includes("thundercats")) {setThundercatsDiv("thundercats")};
            if (myMusicName.includes("x-men")) {setXmenDiv("xmen")};
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
        setZeldaDiv("d-none");
        setSonicDiv("d-none");
        setFlintstonesDiv("d-none");
        setPowerRangersDiv("d-none");
        setBartDiv("d-none");
        setSouthParkDiv("d-none");
        setThundercatsDiv("d-none");
        setXmenDiv("d-none");
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
    const VolumeUp = () => {
        if (myMusic.volume < 0.99999999999) { 
            myMusic.volume = myMusic.volume + 0.1
         } else { myMusic.volume = 1 };
    }
    const VolumeDown = () => {
        if (myMusic.volume > 0.1) { 
            myMusic.volume = myMusic.volume - 0.1
         } else myMusic.volume = 0;
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
                            </div>
                            <hr/>
                            <div className="row">
                                <div onClick={loopAudio} className={loopBtn}>
                                     <span className="badge badge-info">
                                       Repeat <i className="fas fa-sync"></i>
                                     </span>
                                </div>
                                <div onClick={stopLoopAudio} className={stopLoopBtn}>
                                    <span className="badge badge-danger">
                                       Stop Repeat <i className="fas fa-ban"></i>
                                     </span>
                                    
                                </div>
                                <div className="col">
                                    Volume 
                                    &nbsp;
                                    <span onClick={VolumeDown} className="badge badge-primary">-</span> 
                                    &nbsp;
                                    <span onClick={VolumeUp} className="badge badge-primary">+</span>
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
            <img src={runMario} width="200px" alt="mario" />
        </div>
        <div className={zeldaDiv}>
            <img src={zelda} width="400px" alt="zelda" />
        </div>
        <div className={sonicDiv}>
            <img src={sonic} width="200px" alt="sonic" />
        </div>
        <div className={flintstonesDiv}>
            <img src={flintstones} width="200px" alt="flintstones" />
        </div>
        <div className={powerRangersDiv}>
            <img src={powerRangers} width="300px" alt="power rangers" />
        </div>
        <div className={bartDiv}>
            <img src={bart} width="200px" alt="bart" />
        </div>
        <div className={southParkDiv}>
            <img src={sp1} width="200px" alt="sp1" />
            <img src={sp2} width="200px" alt="sp2" />
            <img src={sp3} width="200px" alt="sp3" />
        </div>
        <div className={thundercatsDiv}>
            <img src={thundercats} width="200px" alt="thundercats" />
        </div>
        <div className={xmenDiv}>
            <img src={xmen} width="400px" alt="xmen" />
        </div>
        </>
    );
};

export default Player;