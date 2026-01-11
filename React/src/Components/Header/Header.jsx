import React from 'react'
import { NavLink } from 'react-router-dom';
/*<Header m={minesCount} f={flagLeft} t={time} restartHandler={restart} pauseHandler={pauseTimer}/> */
export default function Header(props) {

    return (
        <>
            <div className="flex items-center gap-5 text-[20px] font-[Monocraft] mb-5 px-4 py-2">
                <button><NavLink to="/" className="text-2xl hover:scale-110 transition-transform">🏠︎</NavLink></button>
                <div>💣 Mines: <span className="font-bold">{props.m}</span></div>
                <div>🚩 Flags Left: <span className="font-bold">{props.f}</span></div>
                <div>⏱️ Time: <span className="font-bold">{props.t}</span></div>
                <button className="text-[35px] font-extrabold hover:scale-110 transition-transform bg-transparent" onClick={props.restartHandler}>⟳</button>
                <button className="text-[22px] font-extrabold hover:scale-110 transition-transform bg-transparent" onClick={props.pauseHandler}>{props.isGamePaused?"▶":"❚❚"}</button>
            </div>
        </>
    );
}