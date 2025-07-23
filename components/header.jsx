import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";

const Header = async ({ isAdminPage = false }) => {
  const isAdmin = false;

  return (
    <header className="fixed top-0 w-full bg-white backdrop-b z-20">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className="flex">
          <Image
            src="/logo.png"
            alt="logo"
            height={60}
            width={200}
            className="h-12 w-auto onject-contain"
          ></Image>
          {isAdminPage && <span className="text-xs font-extrabold">admin</span>}
        </Link>

        <div className="flex items-center gap-x-4">
          {isAdminPage ? (
            <Link href={"/reservations"}>
              <Button variant={"outline"} className={"flex items-center gap-2"}>
                {" "}
                <ArrowLeft size={18} />{" "}
                <span className="hidden md:inline"> Back to App</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href={"/saved-cars"}>
                <Button>
                  {" "}
                  <Heart size={18}></Heart>{" "}
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>{" "}
              {!isAdmin ? (
                <Link href={"/reservations"}>
                  <Button variant={"outline"}>
                    {" "}
                    <CarFront size={18}></CarFront>{" "}
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href={"/admin"}>
                  <Button variant={"outline"}>
                    {" "}
                    <Layout size={18} />{" "}
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}{" "}
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
