import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'sonner';

const queryClinet = new QueryClient();

const googleClientId =
  "96337949620-36lrmcsg5ui4lgmi3sa8227kek1i6gkc.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClinet}>
    <GoogleOAuthProvider clientId={googleClientId}>
        <BrowserRouter>
        <Toaster />
      <App />
        </BrowserRouter>
        </GoogleOAuthProvider>
      </QueryClientProvider>
  </StrictMode>
);
