import { makeApiCall } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export async function useValidate() {
  const navigate = useNavigate();
  return makeApiCall({ url: "auth/validate", method: "POST" }).catch(() => {
    navigate("/login");
    window.scrollTo(0, 0);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  });
}
