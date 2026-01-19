import React from 'react'
import { NavLink } from 'react-router-dom';
export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#c5c6d0] bg-[linear-gradient(to_right,#a2a3a8_2px,transparent_1px),linear-gradient(to_bottom,#a2a3a8_2px,transparent_1px)] bg-size-[32px_32px] font-[Monocraft]">
            <div className="flex flex-col items-center gap-4 p-3 m-3">
                <h1 className="text-[100px] mb-5 animate-[slideInFromTop_.7s_ease-in]">Minesweeper</h1>
                <button className="text-[22px] px-6 py-3 border-4 border-black bg-[#151515] text-white cursor-pointer shadow-[4px_4px_0_#222] animate-[slideInFromBottom_.7s_ease-in] group">
                    <NavLink to="/game?mines=10&rows=8&cols=8">Easy 
                    <span className="hidden group-hover:inline"> [10 mines]</span>
                    </NavLink>
                </button>
                <button className="text-[22px] px-6 py-3 border-4 border-black bg-[#151515] text-white cursor-pointer shadow-[4px_4px_0_#222] animate-[slideInFromBottom_.7s_ease-in] group">
                    <NavLink to="/game?mines=40&rows=16&cols=16">Medium
                    <span className="hidden group-hover:inline"> [40 mines]</span>
                    </NavLink>
                </button>
                <button className="text-[22px] px-6 py-3 border-4 border-black bg-[#151515] text-white cursor-pointer shadow-[4px_4px_0_#222] animate-[slideInFromBottom_.7s_ease-in] group">
                    <NavLink to="/game?mines=99&rows=16&cols=30">Hard 
                    <span className="hidden group-hover:inline"> [99 mines]</span>
                    </NavLink>
                </button>
            </div>
        </div>
    );
}

/*
 */
