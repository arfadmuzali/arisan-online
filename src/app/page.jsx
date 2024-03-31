"use client";
import Suggestion from "@/components/suggest";
import { useSession } from "next-auth/react";
import CreateOrJoin from "@/components/createOrJoin";
import MyRoom from "@/components/myRoom";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  const StatusCondition = () => {
    if (status === "loading") {
      return null;
    } else if (status === "unauthenticated") {
      return <Suggestion />;
    } else {
      return (
        <div>
          <CreateOrJoin />
          <MyRoom />
          <footer className="p-5 bg-neutral-600 mt-4 text-white">
            GitHub Source Code :{" "}
            <Link
              href={"https://github.com/arfadmuzali/arisan-online/"}
              className="text-blue-200"
            >
              https://github.com/arfadmuzali/arisan-online/
            </Link>
          </footer>
        </div>
      );
    }
  };

  return (
    <>
      <StatusCondition />
    </>
  );
}
