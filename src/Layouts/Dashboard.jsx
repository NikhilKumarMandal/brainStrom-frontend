import { useAuthStore } from "../store/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "../http/api";
import { useMutation } from "@tanstack/react-query";
import { CircleUser, Compass, Home, Menu, Package, Package2, Users } from "lucide-react";
import { Link, Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import useNavigation from "@/utils/navigation";


export default function Dashboard() {
  const { user, logout: logoutUserFromStore } = useAuthStore();
  const location = useLocation();
  const { gotoMyTickets, gotoSelfProfile } = useNavigation();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutUserFromStore();
      toast("Logout");
    },
  });

  if (user === null) {
    return (
      <Navigate
        to={`/auth/login?returnTo=${location.pathname}`}
        replace={true}
      />
    );
  }

  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Brain Strome</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`;
                }}
              >
                <Home className="h-4 w-4" />
                Home
              </NavLink>

              <NavLink
                to="/my-teams"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`;
                }}
              >
                <Users className="h-4 w-4" />
                My Teams{" "}
              </NavLink>

              <NavLink
                to="/browse-teams"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`;
                }}
              >
                <Compass className="h-4 w-4" />
                Browse Teams{" "}
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`;
                  }}
                >
                  <Home className="h-4 w-4" />
                  Home
                </NavLink>
                <NavLink
                  to="/my-teams"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`;
                  }}
                >
                  <Users className="h-4 w-4" />
                  My Teams{" "}
                </NavLink>
                <NavLink
                  to="/browse-teams"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive && "bg-muted"}`;
                  }}
                >
                  <Compass className="h-4 w-4" />
                  Browse Teams{" "}
                </NavLink>
              </nav>
              <div className="mt-auto"></div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Button
                  onClick={() => {
                    gotoSelfProfile();
                  }}
                  variant={"link"}
                >
                  Profile
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  onClick={() => {
                    gotoMyTickets();
                  }}
                  variant={"link"}
                >
                  My Asked Questions
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  onClick={() => {
                    logoutMutate();
                  }}
                  variant={"link"}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
