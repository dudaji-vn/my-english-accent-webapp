import Reducer from "@/shared/const/store.const";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "..";
import { ICertificate, ICertificateContent, IGetContentById } from "../type";
import CertificateController from "../controllers/certificate.controller";

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
  }),
});

export const { useIsArchivedQuery, useGetCertificateProgressQuery, useLazyGetCertificateContentByIdQuery } = CertificateApi;

export default CertificateApi;
