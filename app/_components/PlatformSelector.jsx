function PlatformSelector({ platformDetails, id, curActive, onActive }) {
  // state per togliere il testo se viene selezionata una nuova piattaforma
  const isSelectedActive = id === curActive;

  return (
    <div className="mt-2 flex flex-col">
      <label>{platformDetails[0]}</label>
      <select
        required={isSelectedActive}
        name="platform"
        className="bg-background border-primary mt-1 rounded border focus:border-blue-500 focus:ring-blue-500"
        value={!isSelectedActive ? isSelectedActive : undefined}
        onChange={() => onActive(id)}
      >
        <option hidden></option>
        {platformDetails[1].map((elem) => (
          <option key={elem.id} value={elem.platformName}>
            {elem.platformName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlatformSelector;
