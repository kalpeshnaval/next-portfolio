"use client";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Loader2, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

const AuthButton = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading...
      </div>
    );
  }
  async function handleSignIn() {
    await signIn.social({
      provider: "google",
      callbackURL: "/comments",
    });
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={session.user.image || ""}
              alt={session.user.name || "User"}
            />
            <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <span className="text-sm">
            {session.user.name || session.user.email}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
      <Button
        className="flex justify-center items-center gap-2"
        onClick={handleSignIn}
      >
        <Image
          src={"google-color.svg"}
          width={16}
          height={16}
          alt="google icon"
        />{" "}
        <p>Sign in</p>
      </Button>
  );
};

export default AuthButton;
