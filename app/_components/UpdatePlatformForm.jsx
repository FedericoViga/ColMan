"use client";

import { useFormStatus } from "react-dom";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { updatePlatform } from "../_lib/actions";
import toast from "react-hot-toast";

function UpdatePlatformForm({ platformDetails }) {
  const { id, platformName, platformOwner } = platformDetails;

  async function handleUpdatePlatform(formData) {
    const res = await updatePlatform(formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Piattaforma aggiornata!");
    }
  }

  return (
    <>
      <form action={handleUpdatePlatform} className="container">
        <h1 className="mt-4 text-center text-2xl">Modifica</h1>
        <input type="hidden" name="platformId" value={id} />

        <div className="mt-3 mb-4 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <div className="flex flex-col gap-1">
            <label className="text-primary">Piattaforma</label>
            <input
              required
              name="platformName"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              defaultValue={platformName}
              maxLength="50"
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
              maxLength="50"
            />
          </div>

          <div className="mt-5 flex items-center justify-center gap-1">
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
    <button
      disabled={pending}
      className={`flex items-center justify-center gap-1 ${pending ? "text-primary" : "rounded border-2 border-blue-500"} p-1.5 text-base`}
    >
      <ArrowPathIcon className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
      {pending ? "Aggiornando..." : "Modifica piattaforma"}
    </button>
  );
}

export default UpdatePlatformForm;
