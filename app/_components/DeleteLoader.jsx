function DeleteLoader() {
  return (
    <div className="bg-background fixed top-0 left-0 z-50 h-full w-full opacity-80">
      <div className="mx-auto mb-7 flex h-full items-center justify-center gap-1">
        <div className="delete-loader text-foreground">Eliminazione</div>
      </div>
    </div>
  );
}

export default DeleteLoader;
