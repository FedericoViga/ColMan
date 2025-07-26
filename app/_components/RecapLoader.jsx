function RecapLoader() {
  return (
    <div className="container flex flex-col items-center justify-center gap-3 overflow-hidden py-5">
      <div className="flex w-full items-center justify-center gap-2">
        <div className="skeleton h-12 w-16 rounded bg-blue-950"></div>
        <div className="skeleton h-9 w-28 rounded bg-gray-700"></div>
      </div>

      <div className="flex w-full items-center justify-center gap-2">
        <div className="skeleton h-12 w-16 rounded-md bg-blue-950"></div>
        <div className="skeleton h-9 w-64 rounded-md bg-gray-700"></div>
      </div>

      <div className="flex w-full items-center justify-center gap-2">
        <div className="skeleton h-12 w-16 rounded-md bg-blue-950"></div>
        <div className="skeleton h-9 w-40 rounded-md bg-gray-700"></div>
      </div>
    </div>
  );
}

export default RecapLoader;
