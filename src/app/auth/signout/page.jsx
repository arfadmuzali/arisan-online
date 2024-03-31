"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") redirect("/");
  }, [status, data]);
  return (
    <>
      <Card className="w-fit m-auto p-4 my-20">
        <CardTitle className="text-center w-80 md:w-96">SIGN OUT</CardTitle>
        <CardContent className="p-3">
          <p className="text-sm text-center p-4">
            Are you sure you want to sign out?
          </p>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              signOut();
            }}
          >
            Yes, Sign Out
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
