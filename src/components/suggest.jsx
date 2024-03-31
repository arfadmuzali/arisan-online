import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

export default function Suggestion() {
  return (
    <>
      <Card className="flex flex-col justify-center items-center">
        <CardHeader className="text-center">
          Access content by signing in
        </CardHeader>
        <CardContent className="w-full flex justify-center items-center">
          <Link
            href={"/auth/signin"}
            className="w-full md:w-96 rounded flex items-center justify-center h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
          >
            Sign In
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
