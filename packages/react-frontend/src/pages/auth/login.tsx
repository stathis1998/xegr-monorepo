import { Link, useNavigate, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { HomeIcon } from "@radix-ui/react-icons";

import { toast } from "sonner";
import { LoginForm, LoginFormValues } from "@/components/forms/loginForm";
import { makeApiCall } from "@/lib/utils";
import { UserModel } from "@/types/userTypes";

export function Login() {
  const navigate = useNavigate();

  function handleLogin(values: LoginFormValues) {
    makeApiCall<{ message: string; data: { user: UserModel; token: string } }>({
      url: "auth/login",
      method: "POST",
      data: values,
    })
      .then((response) => {
        toast.success(response.message);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/");
        window.scrollTo(0, 0);
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
          <Button
            variant={"ghost"}
            onClick={() => {
              navigate("/register");
              window.scrollTo(0, 0);
            }}
          >
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
            <LoginForm
              formId="login-form"
              onSubmit={(values) => handleLogin(values)}
            />
            <Button className="w-full" form="login-form" type="submit">
              Login with username
            </Button>
            <Button
              variant={"ghost"}
              className="w-full"
              onClick={() => toast.message("Well, that's awkward...")}
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
