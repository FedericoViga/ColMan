import InsertPlatformForm from "@/app/_components/InsertPlatformForm";

export const metadata = {
  title: "Aggiungi Piattaforma",
};

async function Page() {
  return (
    <div>
      <InsertPlatformForm />
    </div>
  );
}

export default Page;
