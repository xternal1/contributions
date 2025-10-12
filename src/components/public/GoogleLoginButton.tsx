import { useEffect } from "react";
import { loginWithGoogle } from "../../services/authService";

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface GoogleLoginButtonProps {
  onSuccess?: (user: AuthenticatedUser) => void;
  onError?: () => void;
}

const GoogleLoginButton = ({ onSuccess, onError }: GoogleLoginButtonProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: google.accounts.id.CredentialResponse) => {
          try {
            const userData: AuthenticatedUser = await loginWithGoogle(response.credential);
            onSuccess?.(userData);
          } catch (error) {
            console.error("Google login error:", error);
            onError?.();
          }
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn") as HTMLElement,
        { theme: "outline", size: "large" }
      );
    };
  }, [onSuccess, onError]);

  return <div id="google-login-btn"></div>;
};

export default GoogleLoginButton;
