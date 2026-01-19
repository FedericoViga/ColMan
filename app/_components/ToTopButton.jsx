"use client";

import { useEffect, useState } from "react";
import ArrowUpCircleIconCustom from "./ArrowUpCircleIconCustom";

function ToTopButton({ isOpenInsertGame }) {
  const [toTop, setToTop] = useState(false);
  const [isButtonVisible, setIsButtonVisibile] = useState(false);

  function toTopFunction() {
    setToTop(true);
  }

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 1350 ||
        document.documentElement.scrollTop > 1350
      ) {
        setIsButtonVisibile(true);
      } else {
        setIsButtonVisibile(false);
      }
    }
  }, [isButtonVisible]);

  useEffect(() => {
    if (toTop) {
      document.body.scrollTop = 0; // Safari
      document.documentElement.scrollTop = 0; // Chrome, Firefox, IE e Opera
      setToTop(false);
    }
  }, [toTop]);

  return (
    <>
      {isButtonVisible && !isOpenInsertGame && (
        <button
          type="button"
          aria-label="Torna in cima"
          className="fixed bottom-8 left-6"
          onClick={toTopFunction}
        >
          {/* <ArrowUpCircleIcon className="h-11 w-11 text-accent" /> */}
          <ArrowUpCircleIconCustom
            color="var(--accent)"
            arrowColor="var(--color-background)"
            className="h-11 w-11"
          />
        </button>
      )}
    </>
  );
}

export default ToTopButton;
