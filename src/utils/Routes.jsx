import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../components/LoginScreen"
import SignUpScreen from "../components/SignUpScreen"
import ForgottenPassword from "../components/ForgottenPassword";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen/>,
    },
    {
        path: '/signup',
        element: <SignUpScreen/>
    },
    {
      path: '/forgotten-pass',
      element: <ForgottenPassword/>
    }
]);