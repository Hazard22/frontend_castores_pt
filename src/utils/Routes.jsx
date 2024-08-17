import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../components/LoginScreen"
import SignUpScreen from "../components/SignUpScreen"
import RecoverPassword from "../components/RecoverPassword";
import Home from "../components/Home";

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
      element: <RecoverPassword/>
    },
    {
      path: '/home',
      element: <Home/>
    }
]);