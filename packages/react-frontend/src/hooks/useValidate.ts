import { makeApiCall } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export async function useValidate() {
  const navigate = useNavigate();
  return makeApiCall({ url: "auth/validate", method: "POST" }).catch(() => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  });
}
