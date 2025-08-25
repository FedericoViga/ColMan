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

  // Proprietà componente dinamiche in base al numero di giochi
  const formatProps = () => {
    if (numGames >= 0 && numGames <= 9) {
      return { initialText: "0", minWidth: "" };
    }
    if (numGames >= 10 && numGames <= 99) {
      return { initialText: "00", minWidth: "min-w-14" };
    }
    if (numGames >= 100 && numGames <= 999) {
      return { initialText: "000", minWidth: "min-w-[82px]" };
    }
    if (numGames >= 1000 && numGames <= 9999) {
      return { initialText: "0000", minWidth: "min-w-28" };
    }
    return null; // Fuori range
  };

  const displayProps = formatProps();

  if (!displayProps) return null;

  return (
    <Link href="/games">
      <div className="flex items-center justify-center gap-1">
        <span
          className={`text-5xl font-bold text-blue-500 ${displayProps.minWidth}`}
          ref={countupRef}
        >
          {displayProps.initialText}
        </span>
        <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
          GIOCHI
        </p>
      </div>
    </Link>
  );
}

export default GameCount;
