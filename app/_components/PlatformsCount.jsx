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

  // Proprietà componente dinamiche in base al numero di piattaforme
  const formatProps = () => {
    if (numPlatforms >= 0 && numPlatforms <= 9) {
      return { initialText: "0", minWidth: "" };
    }
    if (numPlatforms >= 10 && numPlatforms <= 99) {
      return { initialText: "00", minWidth: "min-w-14" };
    }
    return null; // Fuori range
  };

  const displayProps = formatProps();

  if (!displayProps) return null;

  return (
    <Link href="/platforms">
      <div className="flex items-center justify-center gap-1">
        <span
          className={`text-5xl font-bold text-blue-500 ${displayProps.minWidth}`}
          ref={countupRef}
        >
          {displayProps.initialText}
        </span>
        <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
          PIATTAFORME
        </p>
      </div>
    </Link>
  );
}

export default PlatformsCount;
