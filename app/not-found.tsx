export const metadata = {
  title: "404 | Bazigar Partner",
  description: "This is the 404 page for Bazigar Partner",
};

export default function NotFound() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            ERROR
          </h1>
        </div>
      </div>
    </>
  );
}
