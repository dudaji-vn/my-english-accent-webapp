import CloseIcon from "@/assets/icon/close-icon.svg";
import CertificateInfo from "@/components/CertificateInfo";
import Loading from "@/components/Loading";
import ModalCompleteCertificate from "@/components/Modal/ModalCompleteCertificate";
import ModalLeaveExam from "@/components/Modal/ModalLeaveExam";
import RecordCertificate from "@/components/RecordCertificate";
import ResultCertificate from "@/components/ResultCertificate";
import {
  useAddOrUpdateUserContentCertificateMutation,
  useGetUserCertificateQuery,
  useLazyGetCertificateContentByIdQuery,
} from "@/core/services";
import { IUserCertificateRequest, IVocabularyContent } from "@/core/type";
import { Avatar, Box, Container, IconButton, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { removeSpecialCharacters } from "@/shared/utils/string.util";

export interface IResultCertificateItem {
  voiceSrc: string;
  result: string;
  index: number;
  isUpdate: boolean;
}

export default function CertificateProgressPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const certificateName = decodeURIComponent(pathname).replace("/certificate/", "");
  const [isOpenModalCompleteCertificate, setIsOpenModalCompleteCertificate] = useState(false);
  const [isOpenModalLeaveExam, setIsOpenModalLeaveExam] = useState(false);
  const [searchParams] = useSearchParams();
  const certificateId = searchParams.get("certificateId") ?? "";
  const parentRef = useRef<HTMLDivElement>(null);

  const [triggerGetCertificateContentById, { data: certificateContent, isFetching: isFetchingContent }] =
    useLazyGetCertificateContentByIdQuery();
  const { data: userCertificate, isFetching, refetch } = useGetUserCertificateQuery(certificateId);
  const [addOrUpdateUserContentCertificate] = useAddOrUpdateUserContentCertificateMutation();
  const [isStart, setIsStart] = useState(false);
  const [isHideCertificate, setIsHideCertificate] = useState(false);
  const [renderVocabulary, setRenderVocabulary] = useState<IVocabularyContent[]>([]);

  const result = useMemo(() => {
    let point = 0;
    let correctSentences = 0;

    if (!renderVocabulary || !certificateContent) {
      return {
        point: 0,
        correctSentences: 0,
      };
    }

    const unitPoint = certificateContent.totalScore / renderVocabulary.length;
    renderVocabulary.forEach((item) => {
      if (item.result) {
        if (removeSpecialCharacters(item.result.toLowerCase()) === removeSpecialCharacters(item.title).toLowerCase()) {
          point += unitPoint;
          correctSentences++;
        }
      }
    });
    return {
      point,
      correctSentences,
    };
  }, [renderVocabulary, certificateContent]);

  const vocabularies: IVocabularyContent[] = useMemo(() => {
    const vocab = certificateContent?.contents ?? [];

    if (vocab && vocab[0]) {
      setRenderVocabulary([vocab[0]]);
    }

    return vocab;
  }, [certificateContent?.contents]);

  const nextVocabulary = ({ voiceSrc, result, index, isUpdate }: IResultCertificateItem) => {
    if (vocabularies[index]) {
      const newArr = [...renderVocabulary];
      newArr[index] = {
        ...newArr[index],
        voiceSrc,
        result,
      };
      if ((!voiceSrc || !result) && newArr.length === vocabularies.length) {
        setIsOpenModalCompleteCertificate(true);
        return;
      }
      if (!isUpdate && newArr.length === vocabularies.length) {
        setIsOpenModalCompleteCertificate(true);
      }
      if (!isUpdate && newArr.length < vocabularies.length) {
        newArr.push(vocabularies[index + 1]);
      }
      setRenderVocabulary(newArr);
    }
  };

  const onHandleClose = () => {
    if (isStart && !userCertificate) {
      setIsOpenModalLeaveExam(true);
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    scrollToLastElement();
  }, [renderVocabulary]);

  const scrollToLastElement = () => {
    if (parentRef && parentRef.current) {
      const lastChildElement = parentRef.current!.lastElementChild;
      lastChildElement?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleTestAgain = async () => {
    await triggerGetCertificateContentById({ strategyType: "vocabulary", certificateId }).unwrap();
    setIsHideCertificate(true);
    setIsOpenModalCompleteCertificate(false);

    if (vocabularies && vocabularies[0]) {
      setRenderVocabulary([{ ...vocabularies[0] }]);
    }
  };
  const handleSubmit = async () => {
    if (!certificateContent || !renderVocabulary) {
      return;
    }
    const payload: IUserCertificateRequest = {
      certificateId: certificateId,
      score: result.point,
      correctSentences: result.correctSentences,
      star: Math.round((4 * result.point!) / certificateContent.totalScore),
      strategyType: "vocabulary",
      records: renderVocabulary.map((item) => ({
        vocabularyId: item.vocabularyId,
        voiceSrc: item.voiceSrc ?? "",
        result: item.result ?? "",
      })),
    };
    const data = await addOrUpdateUserContentCertificate(payload).unwrap();
    if (data) {
      refetch();
      setIsHideCertificate(false);
      setIsOpenModalCompleteCertificate(false);
    }
  };

  if (isFetching || isFetchingContent) return <Loading />;

  return (
    <Box className="flex flex-col grow bg-gray-100 min-h-screen overflow-y-auto overflow-x-hidden">
      {certificateContent && (
        <ModalCompleteCertificate
          correctSentences={result.correctSentences}
          percent={result.point! / certificateContent.totalScore}
          start={Math.round((4 * result.point!) / certificateContent.totalScore)}
          onConfirm={handleSubmit}
          open={isOpenModalCompleteCertificate}
          onClose={() => handleTestAgain()}
        />
      )}

      <ModalLeaveExam
        onConfirm={() => navigate(-1)}
        onClose={() => {
          setIsOpenModalLeaveExam(false);
        }}
        open={isOpenModalLeaveExam}
      />
      <Container className="py-4 divider bg-gray-100 sticky top-0 z-10">
        <Box className="flex items-center gap-2">
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold grow">{certificateName}</Typography>
        </Box>
      </Container>

      {userCertificate && !isHideCertificate ? (
        <ResultCertificate onClickTestAgain={handleTestAgain} userCertificate={userCertificate} />
      ) : !isStart ? (
        <CertificateInfo
          onConfirm={async () => {
            await triggerGetCertificateContentById({ strategyType: "vocabulary", certificateId }).unwrap();
            setIsStart(true);
          }}
        />
      ) : (
        <Box ref={parentRef} className="text-center grow bg-gray-100">
          {renderVocabulary.map((val, index: number) => (
            <RecordCertificate
              {...val}
              key={val.vocabularyId}
              nextVocabulary={nextVocabulary}
              index={index}
              totalVoca={vocabularies.length}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
