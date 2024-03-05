import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/config/axiosConfig";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export default function SocialLoginButton(): JSX.Element {
  const { toast } = useToast();

  return (
    <div className="flex justify-center items-center">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);

          const { credential } = credentialResponse;

          try {
            const response = await axiosInstance.post("/ssoLogin", {
              ssoProvider: "google",
              ssoToken: credential,
            });

            window.location.href = response.request.responseURL;
          } catch (error: any) {
            if (error.response && error.response.status === 400) {
              // toast({
              //   variant: "destructive",
              //   description: error.response.data.errResponse,
              // });
              toast({
                variant: "destructive",
                description:
                  "No Beamer account was found with this email. Please sign up.",
              });
            } else {
              toast({
                variant: "destructive",
                title: "Uh Oh!",
                description: "Something went wrong, Please try again later",
              });
            }
          }
        }}
        onError={() => {
          console.log("Login Failed");
          toast({
            variant: "destructive",
            title: "Uh Oh!",
            description: "Something went wrong, Please try again later",
          });
        }}
        size="large"
        width="400"
        logo_alignment="center"
      />
      <Toaster />
    </div>
  );
}
