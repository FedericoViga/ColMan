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
    countUpAnim = new countUpModule.CountUp(countupRef.current, numGames, {
      useGrouping: false,
    });
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  return (
    <Link href="/games">
      {numGames >= 0 && numGames <= 9 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span className="text-5xl font-bold text-blue-500" ref={countupRef}>
              0
            </span>
            <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
              GIOCHI
            </p>
          </div>
        </>
      )}
      {numGames >= 10 && numGames <= 99 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span
              className="min-w-14 text-5xl font-bold text-blue-500"
              ref={countupRef}
            >
              00
            </span>
            <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
              GIOCHI
            </p>
          </div>
        </>
      )}

      {numGames >= 100 && numGames <= 999 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span
              className="min-w-[82] text-5xl font-bold text-blue-500"
              ref={countupRef}
            >
              000
            </span>
            <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
              GIOCHI
            </p>
          </div>
        </>
      )}

      {numGames >= 1000 && numGames <= 9999 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span
              className="min-w-28 text-5xl font-bold text-blue-500"
              ref={countupRef}
            >
              0000
            </span>
            <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
              GIOCHI
            </p>
          </div>
        </>
      )}
    </Link>
  );
}

export default GameCount;
