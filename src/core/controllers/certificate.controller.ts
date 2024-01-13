import { IUserCertificateRequest } from "../type";

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
  isArchived: (certificateId: string) => {
    return {
      url: `/certificate/isArchived?id=${certificateId}`,
    };
  },
  addOrUpdateUserContentCertificate: (payload: IUserCertificateRequest) => {
    console.log({ payload });
    return {
      url: `/certificate/addOrUpdateUserContentCertificate`,
      method: "PUT",
      body: payload,
    };
  },
};

export default CertificateController;
