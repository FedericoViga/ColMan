import React from "react";

export default function ArrowUpCircleIconCustom({
  size = 44,
  color = "currentColor", // colore cerchio
  arrowColor = "transparent", // colore freccia
  className = "",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Cerchio */}
      <path
        fill={color}
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z"
      />

      {/* Freccia */}
      <path
        fill={arrowColor}
        d="M12.53 7.72a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
      />
    </svg>
  );
}
