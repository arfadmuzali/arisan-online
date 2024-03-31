"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import join from "@/../public/group.png";
import create from "@/../public/create-group.png";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { navigate } from "@/lib/redirect";

export default function CreateOrJoin() {
  const { toast } = useToast();

  const { data: session, status } = useSession();
  const [roomId, setRoomId] = useState("");

  async function joinRoom() {
    try {
      const response = await axios.post("/api/user/join", {
        email: session.user.email,
        roomId,
      });
      if (response) navigate(`/room/${roomId}`);
      toast({
        description: response.data.message,
        variant: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row m-auto w-fit gap-5 my-10">
        <Card className="w-80 flex flex-col justify-center items-center p-5">
          <CardTitle className="text-xl">Create Arisan Room</CardTitle>
          <CardHeader>
            <img src={create.src} alt="team" className="w-36 pt-2" />
          </CardHeader>
          <CardContent>
            <CreateRoomButton />
          </CardContent>
        </Card>

        {/* Join */}
        <Card className="w-80 flex flex-col justify-center items-center p-5">
          <CardTitle className="text-xl">Join Arisan Room</CardTitle>
          <CardHeader>
            <img src={join.src} alt="team" className="w-36 pt-2" />
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor={"join"} className="p-2 text-lg">
                ID:{" "}
              </Label>
              <div className="flex gap-1 flex-col">
                <Input
                  id="join"
                  placeholder="Enter an ID"
                  onChange={(e) => {
                    setRoomId(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    joinRoom();
                  }}
                >
                  Enter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function CreateRoomButton() {
  const { toast } = useToast();

  const { data: session, status } = useSession();

  const [roomName, setRoomName] = useState("");

  async function createRoom(e) {
    try {
      const newRoom = await axios.post("/api/room", {
        name: roomName,
        email: session?.user?.email,
      });
      if (newRoom) navigate(`/room/${newRoom.data?.data.roomId}`);
      toast({
        variant: "success",
        description: "success creating room",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "someting error",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>Make your room.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="col-span-3"
              maxLength="10"
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            onClick={() => {
              createRoom();
            }}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2"
          >
            Create
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
