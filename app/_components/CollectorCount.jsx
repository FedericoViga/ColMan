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
    countUpAnim = new countUpModule.CountUp(countupRef.current, numCollectors, {
      useGrouping: false,
    });
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  // Proprietà componente dinamiche in base al numero di collector's editions
  const formatProps = () => {
    if (numCollectors >= 0 && numCollectors <= 9) {
      return { initialText: "0", minWidth: "", fontSize: "text-[28px]" };
    }
    if (numCollectors >= 10 && numCollectors <= 99) {
      return { initialText: "00", minWidth: "min-w-14", fontSize: "text-2xl" };
    }
    if (numCollectors >= 100 && numCollectors <= 999) {
      return {
        initialText: "000",
        minWidth: "min-w-[82px]",
        fontSize: "text-2xl",
      };
    }
    return null; // Fuori range
  };

  const displayProps = formatProps();

  if (!displayProps) return null;

  return (
    <Link href="/games/collectors">
      <div className="flex items-center justify-center gap-1">
        <span
          className={`text-accent text-5xl font-bold ${displayProps.minWidth}`}
          ref={countupRef}
        >
          {displayProps.initialText}
        </span>
        <p className={`text-primary ${displayProps.fontSize} font-bold`}>
          {numCollectors === 1 ? "COLLECTOR'S EDITION" : "COLLECTOR'S EDITIONS"}
        </p>
      </div>
    </Link>
  );
}

export default CollectorCount;
