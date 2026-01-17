"use client";

import { useFormStatus } from "react-dom";
import { insertPlatform } from "../_lib/actions";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function InsertPlatformForm() {
  const [nameLength, setNameLength] = useState(0);
  const [ownerLength, setOwnerLength] = useState(0);

  // notifica toast in caso di errore per inserimento piattaforma già esistente
  // legge il rispettivo cookie e se è presente renderizza la notifica e rimuove il cookie
  useEffect(() => {
    const cookiesToCheck = [
      {
        key: "duplicatedPlatformError",
        toastId: "insert-duplicated-platform-error",
      },
    ];

    cookiesToCheck.forEach(({ key, toastId }) => {
      const cookieValue = Cookies.get(key);
      if (cookieValue) {
        toast.error(cookieValue, { id: toastId });
        Cookies.remove(key);
      }
    });
  });

  return (
    <div className="container">
      <form action={insertPlatform}>
        <div className="my-5 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <h1 className="text-center text-2xl">Crea una nuova piattaforma</h1>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary" htmlFor="platformName">
                Nome
              </label>
              <span className="text-primary text-sm">{nameLength}/25</span>
            </div>
            <input
              autoCapitalize="sentences"
              required
              name="platformName"
              id="platformName"
              type="text"
              className="border-primary rounded border p-1.5 text-base focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              autoComplete="off"
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
              autoCapitalize="sentences"
              required
              name="platformOwner"
              id="platformOwner"
              type="text"
              className="border-primary rounded border p-1.5 text-base focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              maxLength="25"
              onChange={(e) => setOwnerLength(e.target.value.length)}
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-1">
            <Button>Crea piattaforma</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`mt-5 flex w-full items-center justify-center gap-1 ${pending ? "text-primary" : "rounded border-2 border-blue-500"} p-1`}
    >
      <span className={`${pending ? "dots-loader animate-pulse" : ""}`}>
        {pending ? "Creazione piattaforma" : "Crea piattaforma"}
      </span>
    </button>
  );
}

export default InsertPlatformForm;
