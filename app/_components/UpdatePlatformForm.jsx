"use client";

import { useFormStatus } from "react-dom";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { updatePlatform } from "../_lib/actions";

function UpdatePlatformForm({ platformDetails }) {
  const { id, platformName, platformOwner } = platformDetails;

  return (
    <>
      <form action={updatePlatform} className="container">
        <input type="hidden" name="platformId" value={id} />

        <div className="my-5 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <div className="flex flex-col gap-1">
            <label className="text-primary">Piattaforma</label>
            <input
              required
              name="platformName"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              defaultValue={platformName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-primary">Produttore</label>
            <input
              required
              name="platformOwner"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              defaultValue={platformOwner}
            />
          </div>

          <div className="mt-5 flex items-center justify-center gap-1 self-start">
            <Button />
          </div>
        </div>
      </form>
    </>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <div
      className={`flex items-center justify-center gap-1 ${pending ? "text-primary" : "rounded border border-blue-500"} p-1.5 text-base`}
    >
      <ArrowPathIcon className="h-4 w-4" />
      <button disabled={pending}>
        {pending ? "Aggiornando..." : "Aggiorna"}
      </button>
    </div>
  );
}

export default UpdatePlatformForm;
