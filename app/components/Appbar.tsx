"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
//@ts-ignore
import { Music } from "lucide-react";

export function Appbar() {
  const session = useSession();

  return (
    <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-800">
      <a className="flex items-center justify-center" href="#">
        <Music className="h-7 w-7 text-purple-400" />
        <span className="ml-2 text-xl font-bold text-purple-400">
          Muzer
        </span>
      </a>
      <nav className="flex items-center" style={{ gap: "4.5rem" }}>
        {" "}
        {/* Using inline style for gap */}
        <a className="text-base font-medium hover:text-purple-400" href="#">
          About
        </a>
        <a className="text-base font-medium hover:text-purple-400" href="#">
          How it works
        </a>
        <a className="text-base font-medium hover:text-purple-400" href="#">
          Features
        </a>
        <div>
          {session.data?.user && (
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          )}
          {!session.data?.user && (
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
