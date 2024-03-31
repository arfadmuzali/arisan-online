"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardTitle } from "./ui/card";
import Link from "next/link";
import { ClipboardIcon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";

export default function MyRoom() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [myRoom, setMyRoom] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMyRoom() {
      if (session) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/user/${session.user.email}`);
          setMyRoom(response.data?.data?.memberOf || []);
        } catch (error) {
          console.error("Error fetching room data:", error);
          // Tambahkan penanganan kesalahan di sini
        } finally {
          setLoading(false);
        }
      }
    }
    getMyRoom();
  }, [session, status]);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center">My Room</h1>
      <div className="w-3/4 m-auto my-3 flex flex-col gap-2">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : myRoom.length === 0 ? (
          <p className="text-center">you have no room</p>
        ) : (
          myRoom.map((room) => (
            <Card key={room.id} className="p-4">
              <CardTitle className="flex justify-between items-center">
                <div className="text-xl">{room.name}</div>
                <p
                  className="font-medium text-sm md:flex justify-center items-center cursor-pointer hidden"
                  onClick={() => {
                    navigator.clipboard.writeText(room.roomId);
                    toast({
                      description: "coppied to clipboard",
                      variant: "success",
                    });
                  }}
                >
                  {room.roomId} <ClipboardIcon className="mx-1" />
                </p>
              </CardTitle>
              <CardContent className="p-0">
                <p
                  className="font-medium text-sm flex justify-start items-center cursor-pointer md:hidden my-2"
                  onClick={() => {
                    navigator.clipboard.writeText(room.roomId);
                    toast({
                      description: "id coppied to clipboard",
                      variant: "success",
                    });
                  }}
                >
                  <ClipboardIcon className="mx-1" /> {room.roomId}
                </p>
                <h5 className="text-sm">
                  Created by{" "}
                  {room.author.name === session.user.name
                    ? "you"
                    : room.author.name}
                </h5>
                <Link
                  href={"/room/" + room.roomId}
                  className="flex items-center justify-center rounded bg-primary text-primary-foreground p-2 mx-5 my-2 hover:bg-primary/90 shadow"
                >
                  Enter
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
