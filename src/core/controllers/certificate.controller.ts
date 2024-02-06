import { IGetUserCertificateQuery, IUserCertificateRequest } from "../type/index";

const CertificateController = {
  progress: () => {
    return {
      url: `/certificate/progress`,
    };
  },
  getContentById: (strategyType: string, certificateId: string) => {
    return {
      url: `/certificate/getContentById?strategyType=${strategyType}&id=${certificateId}`,
    };
  },
  getUserCertificate: (certificateId: string) => {
    return {
      url: `/certificate/getUserCertificate?certificateId=${certificateId}`,
    };
  },
  getUserRecordCertificate: (params: IGetUserCertificateQuery) => {
    return {
      url: `/certificate/getUserRecordsCertificate?slug=${params.slug}`,
    };
  },
  isArchived: (certificateId: string) => {
    return {
      url: `/certificate/isArchived?id=${certificateId}`,
    };
  },
  addOrUpdateUserContentCertificate: (payload: IUserCertificateRequest) => {
    return {
      url: `/certificate/addOrUpdateUserContentCertificate`,
      method: "PUT",
      body: payload,
    };
  },
};

export default CertificateController;
