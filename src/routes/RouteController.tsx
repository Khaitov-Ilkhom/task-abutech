import {useRoutes} from "react-router-dom";
import {lazy} from "react";
import {SuspenseElement as Suspense} from "../utils/Index.tsx";

const Home = lazy(() => import("./home/Home.tsx"))
const Contracts = lazy(() => import("./dashboard/contracts/Contracts.tsx"))
const Two = lazy(() => import("./dashboard/two/Two.tsx"))

const Auth = lazy(() => import("./auth/Auth.tsx"))
const SignIn = lazy(() => import("./auth/login/SignIn.tsx"))

const RouteController = () => {
  return useRoutes([
    {
      path: "",
      element: <Suspense><Home/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Contracts/></Suspense>
        },
        {
          path: "two",
          element: <Suspense><Two/></Suspense>
        }
      ]
    },
    {
      path: "auth",
      element: <Suspense><Auth/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><SignIn/></Suspense>
        },
      ]
    }
  ])
}
export default RouteController
