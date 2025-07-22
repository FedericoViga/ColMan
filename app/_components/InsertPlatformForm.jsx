"use client";

import { useFormStatus } from "react-dom";
import { insertPlatform } from "../_lib/actions";
import { useState } from "react";

function InsertPlatformForm() {
  const [nameLength, setNameLength] = useState(0);
  const [ownerLength, setOwnerLength] = useState(0);

  return (
    <div className="container">
      <form action={insertPlatform}>
        <div className="my-5 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <h1 className="text-center text-2xl">Crea una nuova piattaforma</h1>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary">Nome</label>
              <span className="text-primary text-sm">{nameLength}/25</span>
            </div>
            <input
              autoCapitalize="sentences"
              required
              name="platformName"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              autoComplete="off"
              maxLength="25"
              onChange={(e) => setNameLength(e.target.value.length)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary">Produttore</label>
              <span className="text-primary text-sm">{ownerLength}/25</span>
            </div>
            <input
              autoCapitalize="sentences"
              required
              name="platformOwner"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              autoComplete="off"
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
    <div
      className={`text-foreground mt-5 flex items-center justify-center gap-1 self-start ${pending ? "text-primary" : "rounded border-2 border-blue-500"} px-5 py-1 text-base`}
    >
      <button disabled={pending}>
        {pending ? "Creando nuova piattaforma..." : "Crea piattaforma"}
      </button>
    </div>
  );
}

export default InsertPlatformForm;
