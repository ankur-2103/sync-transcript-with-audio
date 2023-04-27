import React, { useEffect, useRef } from 'react'
import faudio from './faudio.mp3';
import transcript from './transcriptData.json';
import './Transcript.css'

const Transcript = () => {

    const playerRef = useRef(null);
    const wordsRef = useRef(null);
    var a;

    useEffect(() => {

        const onTimeUpdate = () => {
            const activeWordIndex = transcript.findIndex((word) => {
                return word.data.start >= playerRef.current.currentTime;
            });
            const wordElement = wordsRef.current.childNodes[activeWordIndex-1];
            const wordElement2 = wordsRef.current.childNodes[a - 1];
            try {
                wordElement.classList.add('active-word');
                wordElement2.classList.remove('active-word');
            } catch (error) {
                console.log(error)
            }
            a = activeWordIndex
        }     
        
        playerRef.current.addEventListener("timeupdate", onTimeUpdate);
        return () => playerRef.current.removeEventListener("timeupdate",onTimeUpdate);
    }, []);

    return (
        <div style={{display:"flex", flexDirection:"column", padding:"20px", alignItems:"center"}}>
            <span ref={wordsRef}>
                {transcript.map((word, i) => <span key={i} className=''>{word.data.text+" "}</span>)}
            </span>
            <audio controls src={faudio} ref={playerRef} style={{margin:"20px"}}/>;
        </div>
    )
}

export default Transcript