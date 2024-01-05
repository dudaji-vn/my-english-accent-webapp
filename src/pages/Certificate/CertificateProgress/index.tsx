import CloseIcon from "@/assets/icon/close-icon.svg";
import CertificateInfo from "@/components/CertificateInfo";
import Loading from "@/components/Loading";
import ModalCompleteCertificate from "@/components/Modal/ModalCompleteCertificate";
import ModalLeaveExam from "@/components/Modal/ModalLeaveExam";
import RecordCertificate from "@/components/RecordCertificate";
import ResultCertificate from "@/components/ResultCertificate";
import { useGetAllVocabulariesInLectureQuery } from "@/core/services";
import { VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import { Avatar, Box, Container, IconButton, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function CertificateProgressPage() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const certificateName = decodeURIComponent(pathname).replace("/certificate/", "");
  const [isStart, setIsStart] = useState(false);
  const [isOpenModalCompleteCertificate, setIsOpenModalCompleteCertificate] = useState(false);
  const [isOpenModalLeaveExam, setIsOpenModalLeaveExam] = useState(false);
  const [searchParams] = useSearchParams();
  const certificateId = searchParams.get("certificateId") ?? "";
  const parentRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useGetAllVocabulariesInLectureQuery(certificateId);
  const [isFinish, setIsFinish] = useState(false);
  const [renderVocabulary, setRenderVocabulary] = useState<VocabularyTypeWithNativeLanguageResponse[]>([]);
  const vocabularies: VocabularyTypeWithNativeLanguageResponse[] = useMemo(() => {
    const vocab = data?.vocabularies ?? [];
    const newArr = vocab.filter((voca) => !!voca.voiceSrc);
    if (newArr.length) {
      const nextIndex = vocab.findIndex((voca) => !voca.voiceSrc);
      if (nextIndex !== -1) {
        newArr.push(vocab[nextIndex]);
      }
      setRenderVocabulary(() => newArr);
    } else if (vocab.length > 0) {
      setRenderVocabulary(() => [vocab[0]]);
    }

    return vocab;
  }, [data?.vocabularies]);

  const nextVocabulary = ({ voiceSrc, index, isUpdate }: { voiceSrc: string; index: number; isUpdate: boolean }) => {
    if (vocabularies[index]) {
      const newArr = [...renderVocabulary];
      newArr[index] = {
        ...newArr[index],
        voiceSrc,
      };

      if (!isUpdate && index >= vocabularies.length - 1 && !isFinish) {
        setIsOpenModalCompleteCertificate(true);
      }
      if (!isUpdate && index < vocabularies.length - 1) {
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
  const scrollToLastElement = () => {
    if (parentRef && parentRef.current) {
      const lastChildElement = parentRef.current!.lastElementChild;
      lastChildElement?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToLastElement();
  });

  if (isFetching) return <Loading />;
  if (isFinish) {
    return <ResultCertificate />;
  }

  return (
    <Box className="flex flex-col grow bg-gray-100 min-h-screen">
      <ModalCompleteCertificate
        onConfirm={() => {
          setIsFinish(true);
        }}
        open={isOpenModalCompleteCertificate}
        onClose={() => setIsOpenModalCompleteCertificate(false)}
      />
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
      {!isStart ? (
        <CertificateInfo
          onConfirm={() => {
            setIsStart(true);
          }}
        />
      ) : (
        <Box ref={parentRef} className="text-center grow bg-gray-100">
          {renderVocabulary.slice(0, 3).map((val: VocabularyTypeWithNativeLanguageResponse, index: number) => (
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
