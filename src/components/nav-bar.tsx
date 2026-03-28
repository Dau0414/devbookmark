import React from "react";
import SwitchButton from "./ui/switch-button";
import GradientButton from "./ui/gradient-button";
import Link from "next/link";
import { createPost, myBook, signIn, signUp } from "../path";
import { Button } from "@/components/ui/button";
import { signOut } from "../features/auth/action/signout";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { getSession } from "../lib/get-session";


const NavBar = async () => {
   const session=await getSession();

console.log(session)

  return (
    <div>
      <nav className="w-full h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-700/80">
        <Link href="/">
         
          <h1 className="text-3xl font-bold font-mono">DevBookmark</h1>
        </Link>
        <div className="flex items-center gap-4">
          
          <Link href={createPost}>
           
            <GradientButton label="Add Bookmarks" variant="purple" />
          </Link>
          {session ? <SignOut /> : <SignIn />}
          <SwitchButton />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

export const SignIn = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Button asChild>
          <Link href={signUp}>Sign Up</Link>
        </Button>
       
      </div>
    </div>
  );
};
export const SignOut = () => {
  return (
    <div className="flex items-center gap-4">
      
      <Link href={myBook}>
           
           <GradientButton label="My Bookmarks" variant="purple" />
         </Link>
         <form action={async () => {
  "use server";
  await signOut();
}}>
            <Button type="submit" variant={"destructive"}>SignOut</Button>
    </form>
       
      
    </div>
  );
}