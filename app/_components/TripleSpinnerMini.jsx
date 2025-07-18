import SpinnerMini from "./SpinnerMini";

function TripleSpinnerMini() {
  return (
    <div className="container flex flex-col items-center justify-center gap-7 py-8 text-center">
      <SpinnerMini />
      <SpinnerMini />
      <SpinnerMini />
    </div>
  );
}

export default TripleSpinnerMini;
