import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login, self } from "../http/api";
import { useAuthStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const loginUser = async (token) => {
  const { data } = await login(token);
  return data;
};

const getSelf = async () => {
  const { data } = await self();
  return data;
};

export default function LoginPage() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  const handleLoginSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    if (!googleToken) return toast.error("Google token not found!");
    AuthLogin(googleToken);
  };

  const { mutate: AuthLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfData = await refetch();
      setUser(selfData?.data?.data);
      navigate("/auth/home");
    },
    onError: () => toast.error("Login failed"),
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-950">
      <div className="w-[90%] sm:w-[600px] h-[80%] sm:h-[500px] rounded-3xl bg-gray-900 shadow-lg p-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center gap-6 text-center">
          <h1 className="text-4xl font-bold text-amber-400">Welcome Back</h1>
          <p className="text-gray-400 text-lg">
            Login to your account to continue
          </p>

          <div className="self-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => toast.error("Google Login failed!")}
              theme="filled_black"
              size="large"
              text="continue_with"
              width="250"
            />
          </div>
        </div>

        <p className="text-xs text-center text-gray-600 mt-6">
          By signing in, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  );
}
