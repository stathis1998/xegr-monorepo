import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";

import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();

  const user = useUser();
  if (user) {
    navigate("/");
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-black p-10 text-white md:flex flex-col max-w-7xl hidden">
        <div className="font-bold text-2xl flex items-center gap-2">
          <HomeIcon className="w-6 h-6" /> <span>XEGR Demo</span>
        </div>
        <div className="flex-1" />
        <blockquote>
          <p>
            <q className="text-xl">
              Finding my dream home has never been easier. <span>xe.gr</span>{" "}
              not only offered a vast array of choices but also provided
              invaluable guidance and support throughout the process. Thanks to
              them, I'm now happily settled in a place that truly feels like
              home.
            </q>
          </p>
          <span className="italic">&mdash; Stathis Stathopoulos</span>
        </blockquote>
      </div>
      <div className="flex-1 bg-white p-10 flex justify-center items-center max-w-7xl relative">
        <div className="absolute top-5 right-5">
          <Button variant={"ghost"} onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
        <div className="max-w-xs w-full text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Login</h2>
            <p className="text-black/80">
              Enter your username and password bellow to get started.
            </p>
          </div>
          <div className="space-y-2 pt-4">
            <Input placeholder="mrkrabs2005" />
            <Input placeholder="mysupersecretpassword" type="password" />
            <Button className="w-full">Login with username</Button>
            <Button
              variant={"ghost"}
              className="w-full"
              onClick={() => toast.warning("Well, that's awkward...")}
            >
              Forgot password?
            </Button>

            <p className="text-sm text-black/80">
              By clicking continue, you agree to our{" "}
              <Link
                to={"/terms-of-service"}
                className="underline hover:text-black"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to={"/privacy-policy"}
                className="underline hover:text-black"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
