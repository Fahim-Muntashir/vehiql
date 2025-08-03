import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  CarFront,
  Heart,
  Layout,
  Car,
  FileText,
  MessageCircle,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = async ({ isAdminPage = false }) => {
  const user = await currentUser();
  const isAdmin =
    user?.publicMetadata?.role === "ADMIN" ||
    user?.privateMetadata?.role === "ADMIN";

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm">
      <nav className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-15 py-5">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href={isAdminPage ? "/admin" : "/"}
            className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <Image
                src="/logo.png"
                alt="logo"
                height={60}
                width={200}
                className="h-10 w-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </div>
            {isAdminPage && (
              <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ADMIN
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-1 mr-6">
              <Link href="/cars">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 text-lg font-medium"
                >
                  <Car size={20} className="mr-2 " />
                  Cars
                </Button>
              </Link>

              <Link href="/terms">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 font-medium text-lg"
                >
                  <FileText size={20} className="mr-2" />
                  Terms
                </Button>
              </Link>

              <Link href="/support">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 font-medium text-lg"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Support
                </Button>
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {isAdminPage ? (
                <Link href="/reservations">
                  <Button
                    variant="outline"
                    className="border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 bg-transparent"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to App
                  </Button>
                </Link>
              ) : (
                <SignedIn>
                  <Link href="/saved-cars">
                    <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                      <Heart size={16} className="mr-2" />
                      <span className="hidden xl:inline">Saved Cars</span>
                    </Button>
                  </Link>

                  {!isAdmin ? (
                    <Link href="/reservations">
                      <Button
                        variant="outline"
                        className="border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 bg-transparent"
                      >
                        <CarFront size={16} className="mr-2" />
                        <span className="hidden xl:inline">
                          My Reservations
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        className="border-purple-300 hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-200 bg-transparent"
                      >
                        <Layout size={16} className="mr-2" />
                        <span className="hidden xl:inline">Admin Portal</span>
                      </Button>
                    </Link>
                  )}
                </SignedIn>
              )}

              <SignedOut>
                <SignInButton forceRedirectUrl="/">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="relative">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-9 h-9 ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-3">
            <SignedOut>
              <SignInButton forceRedirectUrl="/">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-blue-100",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-100/50"
                >
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl"
              >
                <DropdownMenuItem asChild>
                  <Link href="/cars" className="flex items-center">
                    <Car size={16} className="mr-2" />
                    Cars
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/terms" className="flex items-center">
                    <FileText size={16} className="mr-2" />
                    Terms & Conditions
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/support" className="flex items-center">
                    <MessageCircle size={16} className="mr-2" />
                    Contact Support
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {isAdminPage ? (
                  <DropdownMenuItem asChild>
                    <Link href="/reservations" className="flex items-center">
                      <ArrowLeft size={16} className="mr-2" />
                      Back to App
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <SignedIn>
                    <DropdownMenuItem asChild>
                      <Link href="/saved-cars" className="flex items-center">
                        <Heart size={16} className="mr-2" />
                        Saved Cars
                      </Link>
                    </DropdownMenuItem>

                    {!isAdmin ? (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/reservations"
                          className="flex items-center"
                        >
                          <CarFront size={16} className="mr-2" />
                          My Reservations
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Layout size={16} className="mr-2" />
                          Admin Portal
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </SignedIn>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Subtle gradient line at bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </header>
  );
};

export default Header;
