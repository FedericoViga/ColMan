"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function CollectorCount({ numCollectors }) {
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
    countUpAnim = new countUpModule.CountUp(countupRef.current, numCollectors, {
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
    <Link href="/games/collectors">
      {numCollectors >= 0 && numCollectors <= 9 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span className="text-5xl font-bold text-blue-500" ref={countupRef}>
              {countUpAnim ? countUpAnim : numCollectors}
            </span>
            <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
              COLLECTOR'S EDITIONS
            </p>
          </div>
        </>
      )}

      {numCollectors >= 10 && numCollectors <= 99 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span
              className="min-w-14 text-5xl font-bold text-blue-500"
              ref={countupRef}
            >
              {countUpAnim ? countUpAnim : numCollectors}
            </span>
            <p className="text-primary text-2xl font-bold underline decoration-2 underline-offset-3">
              COLLECTOR'S EDITIONS
            </p>
          </div>
        </>
      )}

      {numCollectors >= 100 && numCollectors <= 999 && (
        <>
          <div className="flex items-center justify-center gap-1">
            <span
              className="min-w-[82] text-5xl font-bold text-blue-500"
              ref={countupRef}
            >
              {countUpAnim ? countUpAnim : numCollectors}
            </span>
            <p className="text-primary text-2xl font-bold underline decoration-2 underline-offset-3">
              COLLECTOR'S EDITIONS
            </p>
          </div>
        </>
      )}
    </Link>
  );
}

export default CollectorCount;
