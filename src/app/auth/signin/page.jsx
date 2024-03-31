"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import googleIcon from "@/../public/google.png";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [status, session]);

  return (
    <>
      <Card className="w-fit m-auto p-4 my-20">
        <CardTitle className="text-center w-80 md:96">SIGN IN WITH</CardTitle>
        <CardContent className="p-3">
          <Button
            className="w-full"
            onClick={() => {
              signIn("github");
            }}
          >
            GitHub Acount <GitHubLogoIcon className="mx-2" />
          </Button>
          <p className="m-auto w-fit p-2">Or</p>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => {
              signIn("google");
            }}
          >
            Google Acount{" "}
            <img src={googleIcon.src} alt="google" className="w-5 mx-2" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
