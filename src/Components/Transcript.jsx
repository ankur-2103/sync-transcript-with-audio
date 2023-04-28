import React, { useEffect, useRef } from 'react'
import faudio from './faudio.mp3';
import transcript from './transcriptData.json';
import './Transcript.css'

const Transcript = () => {

    //refernce for audio player
    const playerRef = useRef(null);

    //refernce for word
    const wordsRef = useRef(null);

    useEffect(() => {
        
        var a;
        
        //function for timeupdate event listner
        const onTimeUpdate = () => {

            //Get the index of current word
            const activeWordIndex = transcript.findIndex((word) => {
                return word.data.start >= playerRef.current.currentTime;
            });

            //Get the reference of current word
            const wordElement = wordsRef.current.childNodes[activeWordIndex - 1];
            
            //Get the reference for previous word
            const wordElement2 = wordsRef.current.childNodes[a - 1];

            //update the classname for current word
            try {
                wordElement.classList.add('active-word');
            } catch (error) {
                console.log(error)
            }

            //update the classname for previous word
            try {
                wordElement2.classList.remove('active-word');
            } catch (error) {
                console.log(error)
            }

            //store the index of previous word
            a = activeWordIndex
        }     
        
        //add timeupdate event listner to player
        playerRef.current.addEventListener("timeupdate", onTimeUpdate);

        //remove timeupdate event listner from player
        const removeRef = () => playerRef.current.removeEventListener("timeupdate",onTimeUpdate);
        
        return () => removeRef()

    }, []);

    //style for div
    const styleDiv = {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        alignItems: "center",
        borderRadius: "25px",
        background: '#f0eff3'
    }

    return (
        <div style={styleDiv}>
            <span ref={wordsRef}>
                {transcript.map((word, i) => <span key={i} style={{padding:"1px"}}>{word.data.text+" "}</span>)}
            </span>
            <audio controls src={faudio} ref={playerRef} style={{margin:"20px", borderWidth:'2px'}}/>;
        </div>
    )
}

export default Transcript