"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function CollectorCount({ numCollectors }) {
  const countupRef = useRef(null);
  let countUpAnim;

  useEffect(() => {
    initCountUp();
  }, []);

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current, numCollectors);
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  return (
    <Link href="/games/collectors">
      <div className="flex items-center justify-center gap-1">
        <span className="text-5xl font-bold text-blue-500" ref={countupRef}>
          {countUpAnim ? countUpAnim : "0"}
        </span>
        <p
          className={`text-primary font-bold underline decoration-2 underline-offset-3 ${numCollectors > 9 ? "text-2xl" : "text-3xl"}`}
        >
          {numCollectors !== 1 ? "COLLECTOR'S EDITIONS" : "COLLECTOR'S EDITION"}
        </p>
      </div>
    </Link>
  );
}

export default CollectorCount;
