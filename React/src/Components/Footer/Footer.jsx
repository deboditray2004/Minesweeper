import React from "react";
/*<Footer msg={gameOverMessage}/> */
export default function Footer(props) {
  return (
    <div className="w-full flex justify-center items-center font-[Monocraft] text-[100px] text-center text-black py-4">
      {props.msg}
    </div>
  );
}
