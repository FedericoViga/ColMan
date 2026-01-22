import { useRef, useState } from "react";

function PlatformsAccordionSettings({ platformDetails, id, curOpen, onOpen }) {
  // state per chiudere il dropdown dei filtri se viene selezionato un nuovo dropdown
  const isSelectorOpen = id === curOpen;
  const listRef = useRef(null);

  const [formData, setFormData] = useState({ platforms: [] });

  function handleCheckbox(e) {
    const { checked, value } = e.target;

    setFormData((prev) => {
      let newPlatforms;
      if (checked) {
        newPlatforms = [...prev.platforms, value];
      } else {
        newPlatforms = prev.platforms.filter((p) => p !== value);
      }
      return { ...prev, platforms: newPlatforms };
    });
  }

  return (
    <div className={`my-8`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (isSelectorOpen && id === curOpen) {
            onOpen(null);
          } else onOpen(id);
        }}
        className={`${isSelectorOpen ? "border-accent border-2" : "border border-slate-700"} flex w-full justify-between rounded bg-slate-900 px-2 py-1.5 text-lg`}
      >
        <span className={`${isSelectorOpen ? "text-accent" : ""}`}>
          {platformDetails[0]}
        </span>
        {isSelectorOpen ? (
          <span className="text-accent text-xl">+</span>
        ) : (
          <span className="text-xl">-</span>
        )}
      </button>

      <ul
        ref={listRef}
        style={{
          maxHeight: isSelectorOpen
            ? `${listRef.current?.scrollHeight}px`
            : "0px",
        }}
        className={`${isSelectorOpen ? "" : "border-y-0"} overflow-hidden rounded border border-slate-700 bg-slate-900 transition-[max-height] duration-300 ease-in-out`}
      >
        {platformDetails[1].map((elem) => (
          <li key={elem.id} className="flex items-center gap-1.5 px-2 py-3">
            <input
              type="checkbox"
              className="peer"
              name="platforms"
              defaultChecked={elem.isActive}
              id={elem.platformName}
              value={elem.id}
              onChange={(e) => handleCheckbox(e)}
            />
            <label
              htmlFor={elem.platformName}
              className="peer-checked:text-foreground text-slate-500"
            >
              {elem.platformName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlatformsAccordionSettings;
