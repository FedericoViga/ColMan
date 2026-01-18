"use client";

import { useFormStatus } from "react-dom";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { updatePlatform } from "../_lib/actions";
import toast from "react-hot-toast";
import { useState } from "react";

function UpdatePlatformForm({ platformDetails }) {
  const { id, platformName, platformOwner } = platformDetails;
  const [nameLength, setNameLength] = useState(platformName.length);
  const [ownerLength, setOwnerLength] = useState(platformOwner.length);

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
            <div className="flex items-baseline justify-between">
              <label className="text-primary" htmlFor="platformName">
                Piattaforma
              </label>
              <span className="text-primary text-sm">{nameLength}/25</span>
            </div>

            <input
              required
              name="platformName"
              id="platformName"
              type="text"
              className="border-primary rounded border p-1.5 text-base focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              defaultValue={platformName}
              maxLength="25"
              onChange={(e) => setNameLength(e.target.value.length)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary" htmlFor="platformOwner">
                Produttore
              </label>
              <span className="text-primary text-sm">{ownerLength}/25</span>
            </div>

            <input
              required
              name="platformOwner"
              id="platformOwner"
              type="text"
              className="border-primary rounded border p-1.5 text-base focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              defaultValue={platformOwner}
              maxLength="25"
              onChange={(e) => setOwnerLength(e.target.value.length)}
            />
          </div>

          <div className="mt-5 flex items-center justify-center gap-1">
            <Button nameLength={nameLength} ownerLength={ownerLength} />
          </div>
        </div>
      </form>
    </>
  );
}

function Button({ nameLength, ownerLength }) {
  const { pending } = useFormStatus();

  const isDisabled = nameLength === 0 || ownerLength === 0;

  return (
    <>
      {isDisabled ? (
        <div
          aria-hidden="true"
          className="text-primary border-primary pointer-events-none mt-5 flex w-full items-center justify-center rounded border-2 p-1"
        >
          <span>Modifica piattaforma</span>
        </div>
      ) : (
        <button
          disabled={pending}
          className={`mt-5 flex w-full items-center justify-center gap-1 ${pending ? "text-primary pointer-events-none" : "rounded border-2 border-blue-500"} p-1`}
        >
          <ArrowPathIcon
            className={`h-4 w-4 ${pending ? "animate-spin" : ""}`}
          />
          <span className={`${pending ? "dots-loader animate-pulse" : ""}`}>
            {pending ? "Aggiornamento piattaforma" : "Modifica piattaforma"}
          </span>
        </button>
      )}
    </>
  );
}

export default UpdatePlatformForm;
