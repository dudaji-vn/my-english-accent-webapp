import { url } from "inspector";

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
  isArchived: (certificateId: string) => {
    return {
      url: `/certificate/isArchived?id=${certificateId}`,
    };
  },
};

export default CertificateController;
