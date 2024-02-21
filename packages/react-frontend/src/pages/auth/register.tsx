import { Link, Navigate, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import {
  RegisterForm,
  RegisterFormValues,
} from "@/components/forms/registerForm";
import { makeApiCall } from "@/lib/utils";
import { UserModel } from "@/types/userTypes";

export function Register() {
  const navigate = useNavigate();

  function handleRegister(values: RegisterFormValues) {
    makeApiCall<{
      message: string;
      data: { user: UserModel; token: string };
    }>({
      url: "auth/register",
      method: "POST",
      data: values,
    })
      .then((response) => {
        toast.success(response.message);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
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
          <Button variant={"ghost"} onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
        <div className="max-w-xs w-full text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Create Account
            </h2>
            <p className="text-black/80">
              Enter your username and password bellow to get started.
            </p>
          </div>
          <div className="space-y-2 pt-4">
            <RegisterForm
              formId="register-form"
              onSubmit={(values) => handleRegister(values)}
            />
            <Button className="w-full" form="register-form">
              Sing up with username
            </Button>
            <div className="relative h-4 flex justify-center items-center">
              <Separator />
              <span className="absolute bg-white px-2 text-black/60 top-1/2 transform -translate-y-1/2">
                or
              </span>
            </div>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() =>
                toast.message(
                  "Oops! It seems our 'Continue as Guest' button is taking a little break. Maybe it's shy? While we convince it to come back to work, how about giving 'Log In' a try? It promises not to bite!",
                  { duration: 10000 }
                )
              }
            >
              <PersonIcon /> <span className="ml-2">Continue as Guest</span>
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
