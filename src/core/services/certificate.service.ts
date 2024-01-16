import Reducer from "@/shared/const/store.const";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "..";
import CertificateController from "../controllers/certificate.controller";
import {
  ICertificate,
  ICertificateContent,
  IGetContentById,
  IUserCertificateRequest,
  IUserCertificate,
  IUserRecordCertificate,
  IGetUserCertificateQuery,
} from "../type";

export const CertificateApi = createApi({
  reducerPath: Reducer.certificateApi,
  baseQuery: baseQuery,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getCertificateProgress: builder.query<ICertificate[], void>({
      query: CertificateController.progress,
      transformResponse: (response: { data: ICertificate[] }) => response.data,
    }),
    getCertificateContentById: builder.query<ICertificateContent, IGetContentById>({
      query: ({ strategyType, certificateId }) => CertificateController.getContentById(strategyType, certificateId),
      transformResponse: (response: { data: ICertificateContent }) => response.data,
    }),
    isArchived: builder.query<boolean, string>({
      query: (certificateId) => CertificateController.isArchived(certificateId),
      transformResponse: (response: { data: boolean }) => response.data,
    }),
    addOrUpdateUserContentCertificate: builder.mutation<boolean, IUserCertificateRequest>({
      query: CertificateController.addOrUpdateUserContentCertificate,
      transformResponse: (response: { data: boolean }) => response.data,
    }),
    getUserCertificate: builder.query<IUserCertificate, string>({
      query: (certificateId) => CertificateController.getUserCertificate(certificateId),
      transformResponse: (response: { data: IUserCertificate }) => response.data,
    }),
    getUserRecordCertificate: builder.query<IUserRecordCertificate, IGetUserCertificateQuery>({
      query: (params) => CertificateController.getUserRecordCertificate(params),
      transformResponse: (response: { data: IUserRecordCertificate }) => response.data,
    }),
  }),
});

export const {
  useIsArchivedQuery,
  useGetCertificateProgressQuery,
  useLazyGetCertificateContentByIdQuery,
  useAddOrUpdateUserContentCertificateMutation,
  useGetUserCertificateQuery,
  useGetUserRecordCertificateQuery,
} = CertificateApi;

export default CertificateApi;
