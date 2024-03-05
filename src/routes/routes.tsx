import Login from "@/authentication/Login/LoginPage/login";
import Signup from "@/authentication/Signup/SignupPage/Signup";
import Verify from "@/authentication/Signup/EmailVerifyPage/Verify";
import ConfirmEmail from "@/authentication/Login/ConfirmEmail/confirmEmail";
import ConfirmPassword from "@/authentication/Login/ConfirmPassword/confirmPassword";
import Pricing from "@/Pricing/Pricing";

const routes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/confirmEmail", element: <ConfirmEmail /> },
  { path: "/auth/confirmPassword", element: <ConfirmPassword /> },
  { path: "/auth/signup", element: <Signup /> },
  { path: "/auth/verify", element: <Verify /> },
  { path: "/billing", element: <Pricing /> },
];

export default routes;
