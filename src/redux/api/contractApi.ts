import {api} from "./index.ts";
import {Courses, GetAllContract, SingleContract, Upload} from "../../types";

const contractApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllContracts: build.query<GetAllContract, { page: number, perPage: number }>({
      query: ({page, perPage}) => ({
        url: `/contracts/all?page=${page}&perPage=${perPage}`,
      }),
      providesTags: ["CONTRACT"],
    }),
    createContract: build.mutation({
      query: (body) => ({
        url: "/contracts/create",
        method: "POST",
        body
      }),
      invalidatesTags: ["CONTRACT"],
    }),
    fileUpload: build.mutation<Upload, any>({
      query: (body) => ({
        url: "/upload/contract/attachment",
        method: "POST",
        body
      }),
      invalidatesTags: ["CONTRACT"],
    }),
    getCourses: build.query<Courses, void>({
      query: () => ({
        url: "/courses"
      }),
      providesTags: ["CONTRACT"],
    }),
    getSingleContract: build.query<SingleContract, { id: number }>({
      query: ({id}) => ({
        url: `/contracts/${id}`,
      }),
      providesTags: ["CONTRACT"],
    }),
    editContract: build.mutation({
      query: ({body, id}) => ({
        url: `/contracts/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["CONTRACT"]
    }),
    deleteContract: build.mutation({
      query: (id) => ({
        url: `/contracts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CONTRACT"],
    })
  })
})

export const {
  useGetAllContractsQuery, useGetCoursesQuery, useFileUploadMutation, useCreateContractMutation,
  useGetSingleContractQuery, useEditContractMutation, useDeleteContractMutation
} = contractApi;