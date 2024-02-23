import { Link, useNavigate, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { LoginForm, LoginFormValues } from "@/components/forms/loginForm";
import { makeApiCall } from "@/lib/utils";
import { UserModel } from "@/types/userTypes";

import svg from "@/assets/svg/undraw_house_searching_re_stk8.svg";
import { FaHeart, FaHouseChimney } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex h-full relative">
      <div className="hidden md:block">
        <FaHeart
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl z-10 hover:scale-110 active:scale-100 cursor-pointer transition-transform hover:fill-red-500 group"
          color="lightgray"
          onClick={() => toast.message("Love you too!")}
        />
      </div>
      <div className="flex-1 bg-black p-10 text-white md:flex flex-col max-w-7xl hidden">
        <div className="font-bold text-2xl flex flex-col">
          <div className="flex gap-2 items-center">
            <FaHouseChimney className="w-6 h-6" /> <span>XEGR Demo</span>
          </div>
          <p className="text-sm font-medium">XEGR: Home Finding, Simplified.</p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src={svg} className="scale-50" />
        </div>
        <Separator className="my-2 bg-white" />
        <blockquote>
          <p>
            <q className="text-lg text-center italic block">
              Finding my dream home has never been easier. <span>xe.gr</span>{" "}
              not only offered a vast array of choices but also provided
              invaluable guidance and support throughout the process. Thanks to
              them, I'm now happily settled in a place that truly feels like
              home.
            </q>
          </p>
          <div className="float-end pt-2">&mdash; Stathis Stathopoulos.</div>
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
