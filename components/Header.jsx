import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Show, SignInButton } from "@clerk/nextjs";
import UserDashboard from "./userDashboard";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  const user = await checkUser();
  return (
    <header className="z-50 backdrop-blur-2xl w-full">
      <div className="container mx-auto flex h-16 items-center md:justify-between justify-end px-4">
        <Link
          href="/"
          className="hidden  md:flex justify-center items-center space-x-2"
        >
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
            L
          </div>
          <span className="text-lg font-semibold">MyApp</span>
        </Link>

        <div className="flex items-center space-x-3">
          <Link href="?create=true">
            <Button variant="destructive">
              <Pen className="mr-2 h-4 w-4" />
              Create projects
            </Button>
          </Link>

          <Show when={"signed-out"}>
            <SignInButton forceRedirectUrl={"/dashboard"}>
              <Button variant="outline">Sign in</Button>
            </SignInButton>
          </Show>

          <Show when={"signed-in"}>
            <UserDashboard />
          </Show>
        </div>
      </div>
    </header>
  );
}
