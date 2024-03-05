import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/config/axiosConfig";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface SocialSignupButtonProps {
  setLoading: any;
}

export default function SocialSignupButton({
  setLoading,
}: SocialSignupButtonProps) {
  const [buttonWidth, setButtonWidth] = useState("300px");
  const { toast } = useToast(); // Set a default width

  useEffect(() => {
    function updateButtonWidth() {
      const screenWidth = window.innerWidth;
      let width = "300px"; // Default width

      if (screenWidth >= 1200) {
        width = "500px";
      } else if (screenWidth >= 768) {
        width = "350px";
      }

      setButtonWidth(width);
    }
    updateButtonWidth();
    window.addEventListener("resize", updateButtonWidth);

    return () => {
      window.removeEventListener("resize", updateButtonWidth);
    };
  }, []);
  return (
    <>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          const { credential } = credentialResponse;

          try {
            setLoading(true);
            const response: any = await axiosInstance.post(
              "/api/auth/ssosignup",
              {
                ssoProvider: "google",
                ssoToken: credential,
              }
            );

            if (response.status === 200) {
              const data = JSON.parse(response.data);
              try {
                const { email, key } = data;
                const loginResponse = await axiosInstance.post(
                  "/loginUserApi",
                  {
                    user: email,
                    password: key,
                  }
                );

                var responseUrl = loginResponse.request.responseURL;
                window.location.href = responseUrl;
              } catch (error: any) {
                if (error.response && error.response.status === 400) {
                  toast({
                    variant: "destructive",
                    description: error.response.data.errResponse,
                  });
                } else {
                  toast({
                    variant: "destructive",
                    description:
                      "An error occured while fetching you request, please try again.",
                  });
                  console.log(error);
                }
              }
            }
          } catch (error: any) {
            if (error.response && error.response.status === 400) {
              toast({
                variant: "destructive",
                description: error.response.data.errResponse,
              });
            } else {
              toast({
                variant: "destructive",
                description:
                  "Error! An account with this email already exists.",
              });
              console.log(error);
            }
          } finally {
            setLoading(false);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        size="large"
        logo_alignment="center"
        width={buttonWidth}
      />
      <Toaster />
    </>
  );
}
