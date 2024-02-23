import { Link, useNavigate, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { LoginForm, LoginFormValues } from "@/components/forms/loginForm";
import { cn, makeApiCall } from "@/lib/utils";
import { UserModel } from "@/types/userTypes";

import svg from "@/assets/svg/undraw_login_re_4vu2.svg";
import { FaHeart, FaHeartCrack, FaHouseChimney } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function Login() {
  const navigate = useNavigate();

  const [heartFixed, setHeartFixed] = useState(false);
  const [progress, setProgress] = useState(0);
  const toastShownRef = useRef(false);

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

  const cuteMessages: string[] = [
    "You just found the heart of our home – where every click brings you closer to your dream space.",
    "Just like finding the right home, you've clicked on the right heart! Welcome to warmth and comfort with XEGR.",
    "Feel at home with every click! Thank you for bringing even more love into our community.",
    "Your journey to a perfect home begins with a heart. Thank you for joining us on this lovely adventure!",
    "Click and let the love in! We're thrilled to have you in our community of home-lovers.",
  ];

  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex h-full relative">
      <div className="hidden md:block group">
        {!heartFixed && (
          <FaHeartCrack
            className={cn(
              "rotate-12 hover:rotate-0 duration-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl z-10 group-hover:scale-110 group-active:duration-150 group-active:scale-100 cursor-pointer transition-transform fill-zinc-500"
            )}
            onClick={() => {
              setProgress((prev) => {
                if (prev + 10 === 100) {
                  setHeartFixed(true);
                  if (!toastShownRef.current) {
                    toastShownRef.current = true;
                    toast.message(
                      "With one click, you've turned a house into a home. Thank you for sharing the love!",
                      {
                        duration: 5000,
                        icon: "💖",
                        position: "top-center",
                      }
                    );
                  }
                }

                return prev + 10;
              });
            }}
          />
        )}
        {heartFixed && (
          <>
            <FaHeart
              className={cn(
                "absolute top-1/2 left-1/2 animate-pulse transform -translate-x-1/2 -translate-y-1/2 text-9xl z-10 group-hover:scale-110 group-active:scale-100 cursor-pointer transition-transform fill-red-500 duration-1000"
              )}
              onClick={() =>
                toast.message(
                  cuteMessages[Math.floor(Math.random() * cuteMessages.length)]
                )
              }
            />
            <FaHouseChimney className="absolute animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl z-10 cursor-pointer pointer-events-none group-hover:scale-110 group-active:scale-100 duration-1000" />
          </>
        )}
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
        <Progress
          value={progress}
          className="border border-white/20"
          barcolor={"bg-red-500"}
        />
        <Separator className="my-2 bg-white" />
        <blockquote>
          <p>
            <q className="text-lg text-center italic block">
              Finding my dream home has never been easier. <span>XEGR</span> not
              only offered a vast array of choices but also provided invaluable
              guidance and support throughout the process. Thanks to them, I'm
              now happily settled in a place that truly feels like home.
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
              onClick={() =>
                toast.message("Well, that's awkward...", {
                  icon: "🤷‍♂️",
                })
              }
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
