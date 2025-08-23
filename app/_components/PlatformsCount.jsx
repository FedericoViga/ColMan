"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function PlatformsCount({ numPlatforms }) {
  const countupRef = useRef(null);
  let countUpAnim;

  useEffect(() => {
    // Controlla se l'animazione è già stata mostrata in questa scheda
    const hasAnimated = sessionStorage.getItem("countupShown") === "true";
    if (!hasAnimated) {
      initCountUp();
    } else {
      return;
    }
  }, []);

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current, numPlatforms, {
      useGrouping: false,
    });
    if (!countUpAnim.error) {
      countUpAnim.start(() => {
        sessionStorage.setItem("countupShown", "true");
      });
    } else {
      console.error(countUpAnim.error);
    }
  }

  return (
    <Link href="/platforms">
      {numPlatforms >= 0 && numPlatforms <= 9 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span className="text-5xl font-bold text-blue-500" ref={countupRef}>
              {countUpAnim ? countUpAnim : numPlatforms}
            </span>
            <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
              PIATTAFORME
            </p>
          </div>
        </>
      )}

      {numPlatforms >= 10 && numPlatforms <= 99 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span
              className="min-w-14 text-5xl font-bold text-blue-500"
              ref={countupRef}
            >
              {countUpAnim ? countUpAnim : numPlatforms}
            </span>
            <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
              PIATTAFORME
            </p>
          </div>
        </>
      )}
    </Link>
  );
}

export default PlatformsCount;
