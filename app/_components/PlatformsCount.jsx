"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function PlatformsCount({ numPlatforms }) {
  const countupRef = useRef(null);
  let countUpAnim;

  useEffect(() => {
    initCountUp();
  }, []);

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current, numPlatforms, {
      useGrouping: false,
    });
    if (!countUpAnim.error) {
      countUpAnim.start();
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
              0
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
              00
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
