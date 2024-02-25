import { Link } from "react-router-dom";
import svg from "@/assets/svg/undraw_page_not_found_re_e9o6.svg";

export function Error404() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-10 mx-auto w-1/3 items-center">
        <img src={svg} alt="404" />
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
