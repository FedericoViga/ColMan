"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function GameCount({ numGames }) {
  const countupRef = useRef(null);
  let countUpAnim;

  useEffect(() => {
    initCountUp();
  }, []);

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current, numGames);
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  return (
    <Link href="/games">
      <div className="flex items-center justify-center gap-1">
        <span className="text-5xl font-bold text-blue-500" ref={countupRef}>
          {countUpAnim ? countUpAnim : "0"}
        </span>
        <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
          {numGames !== 1 ? "GIOCHI" : "GIOCO"}
        </p>
      </div>
    </Link>
  );
}

export default GameCount;
