import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";

const useRefreshToken = () => {
  const authBody = useAuth();

  const refresh = async () => {
    const res = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    authBody?.setAuth(res.data);

    return res.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
