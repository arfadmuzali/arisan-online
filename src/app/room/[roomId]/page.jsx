"use client";
import { ClipboardIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { navigate } from "@/lib/redirect";

export default function RoomPage({ params }) {
  const { toast } = useToast();

  const { data: session, status } = useSession();
  const [roomData, setRoomData] = useState({});
  const [winner, setWinner] = useState("name");

  const buttonWinner = useRef();

  function getWinner() {
    if (session.user?.email !== roomData.data?.author?.email) {
      toast({
        variant: "destructive",
        title: "you're not an author",
        description: "only the author can do it",
      });
      return;
    }
    buttonWinner.current.disabled = true;
    setWinner("getting winner...");
    setTimeout(() => {
      let random = Math.floor(Math.random() * roomData.data?.member.length);
      setWinner(roomData.data?.member[random]?.name);
      buttonWinner.current.disabled = false;
    }, 2000);
  }

  async function leaveRoom() {
    try {
      const response = await axios.patch("/api/user/leave", {
        email: session.user?.email,
        roomId: roomData.data?.roomId,
      });
      if (response) navigate();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getRoomData() {
      try {
        const response = await axios.get(`/api/room/${params.roomId}`);
        setRoomData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRoomData();
  }, [session, status]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-neutral-50  border-b-2">
        <div className="flex justify-between w-screen">
          <div className="flex justify-center items-center">
            <h1 className="md:mx-10 mx-5 text-lg">{roomData.data?.name}</h1>
            <p
              className="font-medium text-sm flex justify-center items-center cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(roomData.data?.roomId);
                toast({
                  description: "coppied to clipboard",
                  variant: "success",
                });
              }}
            >
              {roomData.data?.roomId} <ClipboardIcon className="mx-1" />
            </p>
            <p className="text-sm mx-3 hidden md:block">
              {roomData.data?.author?.name} room
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-3">
            <Info />
            <button className="text-red-400 text-lg p-2" onClick={leaveRoom}>
              Leave
            </button>
          </div>
        </div>
        <div className=" w-full h-max md:w-3/5 grid gap-20 md:gap-0xa grid-cols-5">
          {roomData.data?.member.map((member) => {
            return (
              <p key={member.id} className="w-max p-2 text-center">
                {member.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-40  gap-20 w-screen">
        {winner}
        <Button
          ref={buttonWinner}
          className="w-3/4 md:w-40"
          onClick={getWinner}
        >
          Get Winner!
        </Button>
      </div>
    </div>
  );
}

function Info() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="cursor-pointer">
        <InfoCircledIcon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Berkumpul Saat Menggunakan</AlertDialogTitle>
          <AlertDialogDescription>
            Berkumpullah bersama anggota room saat akan menentukan pemenang.
            Website ini hanya sebuah tools untuk arisan
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
