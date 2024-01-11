import CloseIcon from "@/assets/icon/close-icon.svg";
import CertificateInfo from "@/components/CertificateInfo";
import Loading from "@/components/Loading";
import ModalCompleteCertificate from "@/components/Modal/ModalCompleteCertificate";
import ModalLeaveExam from "@/components/Modal/ModalLeaveExam";
import RecordCertificate from "@/components/RecordCertificate";
import ResultCertificate from "@/components/ResultCertificate";
import { useIsArchivedQuery, useLazyGetCertificateContentByIdQuery } from "@/core/services";
import { IVocabularyContent } from "@/core/type";
import { Avatar, Box, Container, IconButton, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { removeSpecialCharacters } from "../../../shared/utils/string.util";

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
  const { data: isArchived, isFetching } = useIsArchivedQuery(certificateId);
  const [trigger, { data: certificateContent, isFetching: isFetchingContent }] = useLazyGetCertificateContentByIdQuery();

  const [isStart, setIsStart] = useState(false);
  // const [isFinish, setIsFinish] = useState(false);
  const [renderVocabulary, setRenderVocabulary] = useState<IVocabularyContent[]>([]);
  const point = useMemo(() => {
    let total = 0;
    if (!renderVocabulary || !certificateContent) {
      return;
    }

    const unitPoint = certificateContent.totalScore / renderVocabulary.length;
    renderVocabulary.forEach((item) => {
      if (item.result) {
        if (removeSpecialCharacters(item.result) !== removeSpecialCharacters(item.title)) {
          total += unitPoint;
        }
      }
    });
    return total;
  }, [renderVocabulary, certificateContent]);
  console.log(point);

  const vocabularies: IVocabularyContent[] = useMemo(() => {
    const vocab = certificateContent?.contents ?? [];

    if (vocab && vocab[0]) {
      setRenderVocabulary([vocab[0]]);
    }

    return vocab;
  }, [certificateContent?.contents]);

  const nextVocabulary = ({ voiceSrc, result, index, isUpdate }: IResultCertificateItem) => {
    console.log(renderVocabulary);
    //debugger;
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
    if (isStart) {
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

  if (isFetching || isFetchingContent) return <Loading />;

  return (
    <Box className="flex flex-col grow bg-gray-100 min-h-screen">
      {certificateContent && (
        <ModalCompleteCertificate
          percent={point! / certificateContent.totalScore}
          start={Math.round((4 * point!) / certificateContent.totalScore)}
          onConfirm={() => {
            setIsOpenModalCompleteCertificate(false);
            //  setIsFinish(true);
          }}
          open={isOpenModalCompleteCertificate}
          onClose={() => setIsOpenModalCompleteCertificate(false)}
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
          <Typography className="text-large-semibold grow">{`TechTalk certificate ${certificateName}`}</Typography>
        </Box>
      </Container>

      {isArchived ? (
        <ResultCertificate />
      ) : !isStart ? (
        <CertificateInfo
          onConfirm={() => {
            trigger({ strategyType: "vocabulary", certificateId });
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
