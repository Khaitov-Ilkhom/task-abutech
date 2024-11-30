import {api} from "./index.ts";
import {Login} from "../../types";
import {FieldTypeL} from "../../routes/auth/login/SignIn.tsx";

const authApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    signIn: build.mutation<Login, FieldTypeL>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body
      })
    })
  })
})

export const {useSignInMutation} = authApi;