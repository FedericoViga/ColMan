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
    countUpAnim = new countUpModule.CountUp(countupRef.current, numPlatforms);
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  return (
    <Link href="/platforms">
      <div className="flex items-center justify-center gap-1">
        <span className="text-5xl font-bold text-blue-500" ref={countupRef}>
          {countUpAnim ? countUpAnim : "0"}
        </span>
        <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
          {numPlatforms !== 1 ? "PIATTAFORME" : "PIATTAFORMA"}
        </p>
      </div>
    </Link>
  );
}

export default PlatformsCount;
