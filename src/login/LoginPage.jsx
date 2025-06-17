import React from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  useMediaQuery
} from '@mui/material'
import { Google } from '@mui/icons-material'
import { argbToHex, mdcolors } from '../utils/colors'
import { GoogleLogin } from "@react-oauth/google";
import { login,self } from '../http/api';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
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
  const isMobile = useMediaQuery('(max-width:600px)')
  const { setUser } = useAuthStore;
  const navigate = useNavigate()
  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  })
  

  const handleLoginSuccess = (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    if (!googleToken) {
      return toast.error("Google token not found!");
    }
    AuthLogin(googleToken);
  };

  const { mutate: AuthLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDataPromise = await refetch();
      setUser(selfDataPromise?.data?.data);
      navigate("/auth/home")
    },
  });
  return (
    <Paper
      elevation={4}
      sx={{
        width: isMobile ? '90%' : '600px',
        height: isMobile ? '80%' : '500px',
        padding: 4,
        borderRadius: '2rem',
        backgroundColor: argbToHex(mdcolors.surface),
        boxShadow: `0px 4px 20px ${argbToHex(mdcolors.shadow)}`,
        display: 'flex',
        m: 'auto',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
        <Typography
          variant='h3'
          fontWeight='bold'
          sx={{
            textAlign: 'center',
            color: argbToHex(mdcolors.primary),
            pb: 1
          }}
        >
          Welcome Back
        </Typography>

        <Typography variant='body1' sx={{ textAlign: 'center', color: argbToHex(mdcolors.onSurfaceVariant), pb: 4 }}>
          Login to your account to continue
        </Typography>

        <div className="space-y-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => toast.error("Google Login failed!")}
              theme="filled_black"
              size="large"
              text="continue_with"
              width="300"
            />
          </div>
      </Box>

      <Typography
        variant='caption'
        sx={{
          color: argbToHex(mdcolors.outlineVariant),
          textAlign: 'center',
        }}
      >
        By signing in, you agree to our Terms and Privacy Policy
      </Typography>
    </Paper>

  )
}
