import React from "react";
import { Outlet } from "react-router-dom";

function Layout()
{
    return(
        <div className="min-h-screen flex items-center justify-center bg-[#c5c6d0] bg-[linear-gradient(to_right,#a2a3a8_2px,transparent_1px),linear-gradient(to_bottom,#a2a3a8_2px,transparent_1px)] bg-size-[32px_32px]">
            <Outlet/>
        </div>
    )
}

export default Layout


/*

*/