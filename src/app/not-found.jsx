import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <>
      <div className="w-fit m-auto flex justify-center items-center h-10 my-64 gap-2">
        <h1 className="text-2xl">404</h1>
        <Separator orientation="vertical" className="bg-black" />
        <p className="text-lg">Page Not Found</p>
      </div>
    </>
  );
}
