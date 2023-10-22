import { Box, Avatar, Typography, IconButton, Tabs, Tab, Button, Divider, Container } from "@mui/material";
import ArrowLeft from "@/assets/icon/arrow-left-icon.svg";
import UserAddIcon from "@/assets/icon/user-add-icon.svg";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import RightIcon from "@/assets/icon/arrow-right-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-icon.svg";
import QuoteIcon from "@/assets/icon/quote-icon.svg";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { SyntheticEvent, useEffect, useState } from "react";
import PersonInfo from "@/components/NationalityCard";
import FooterCard from "@/components/FooterBtn";
import TabCustom from "@/components/TabCustom";
import { saveIndexNumberUsers, saveTopicId } from "@/store/ListenPageStore";
import { useMultiAudio } from "@/shared/hook/useMultiAudio";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useGetLecturesQuery } from "@/core/services";

type PATH = "individual" | "team";

const exampleAudio = [
  "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Ftopic_NA5SE36AF0rg8BvnNNiUe%2Fvocabulary_MqPGFlc-a0XnlLtu3kXVC%2Fvoice_DwRjcCyd0HgZAcngdguJp?alt=media&token=fbb79a99-0bf8-440e-88d4-3cfb23011213",
  "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Ftopic_NA5SE36AF0rg8BvnNNiUe%2Fvocabulary_MqPGFlc-a0XnlLtu3kXVC%2Fvoice_DwRjcCyd0HgZAcngdguJp?alt=media&token=fbb79a99-0bf8-440e-88d4-3cfb23011213",
];

export default function ListenPage() {
  const dispatch = useAppDispatch();
  const { data } = useGetLecturesQuery();
  const recordsVoiceSrc = useAppSelector((state) => state.listenPage.recordsVoiceSrc);
  const quote = useAppSelector((state) => state.listenPage.quote);
  const userInfo = useAppSelector((state) => state.listenPage.userInfo);
  const numberRecordsOfUser = useAppSelector((state) => state.listenPage.numberRecords);
  const currentIndex = useAppSelector((state) => state.listenPage.numberUsers.current);

  const { players, indexAudio, playAudio } = useMultiAudio(exampleAudio);
  console.log("audioIndex", indexAudio);

  //route
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [path, setPath] = useState<PATH>(pathname.split("/")[2] as PATH);

  const handleChange = (event: SyntheticEvent, newValue: PATH) => {
    setPath(newValue);
  };

  const handleChangeTabIndex = (index: number) => {
    if (data) {
      dispatch(saveTopicId(data[index].lectureId));
      // dispatch(saveQuote(""));
    }
  };

  useEffect(() => {
    setPath(pathname.split("/")[2] as PATH);
  }, [pathname]);

  const onHandlePlayAll = () => {
    playAudio(0);
  };

  return (
    <Box className='flex flex-col grow'>
      <Box className='px-4 pt-4 pb-2 flex items-center gap-2 bg-white'>
        <IconButton onClick={() => navigate(ROUTER.ROOT)}>
          <Avatar src={ChevronIcon} className='w-6 h-6' />
        </IconButton>
        <Typography className='text-large-semibold'>Listening</Typography>
        <IconButton className='grow justify-end hover:bg-white' disableRipple>
          <Avatar src={UserAddIcon} className='w-6 h-6' />
        </IconButton>
      </Box>
      <Tabs variant='fullWidth' value={path} onChange={handleChange} aria-label='tabs' className='px-4 bg-white divider'>
        <Tab id={`listen-tab-${path}`} label='Individual' className='text-small-medium' aria-controls={`listen-tabpanel-${path}`} value={ROUTER.INDIVIDUAL} />
        <Tab id={`listen-tab-${path}`} label='Team' className='text-small-medium' aria-controls={`listten-tabpanel-${path}`} value={ROUTER.TEAM} />
      </Tabs>

      <Container className='mt-4 grow'>
        <Box className='flex flex-col p-4 rounded-t-lg bg-white'>
          <Typography className='text-small-medium'>Browse by</Typography>
          {/* <TabCustom tab={data ?? []} callback={handleChangeTabIndex} /> */}
        </Box>
        <Outlet />
      </Container>

      <FooterCard classes='flex-col'>
        {path === "individual" && search && (
          <Box className='flex gap-2'>
            <Typography variant={"body2"} className='text-extra-small-regular flex grow self-end justify-end'>
              <Avatar alt='microphone-icon' src={MicrophoneIcon} className='w-4 h-4' component={"span"} />
              {numberRecordsOfUser} recorded
            </Typography>
          </Box>
        )}

        {path === "team" && (
          <Typography className='text-small-medium p-4 border border-solid rounded-lg border-stroke bg-gray-100 relative'>
            {quote}
            <Avatar src={QuoteIcon} alt='quote-icon' className='w-4 h-4 absolute bottom-0 right-0 m-2' component={"span"} />
          </Typography>
        )}

        <Divider />
        <Box className='flex gap-4'>
          <IconButton onClick={() => dispatch(saveIndexNumberUsers(currentIndex - 1))} className='border border-stroke border-solid'>
            <Avatar src={ArrowLeft} className='w-6 h-6' />
          </IconButton>
          <Button variant='contained' className='rounded-md m-auto grow' onClick={onHandlePlayAll}>
            <Typography className='text-base-medium ' color={"white"}>
              LIsten all
            </Typography>
          </Button>
          <IconButton onClick={() => dispatch(saveIndexNumberUsers(currentIndex + 1))} className='border border-stroke border-solid'>
            <Avatar src={RightIcon} className='w-6 h-6' />
          </IconButton>
        </Box>
      </FooterCard>
    </Box>
  );
}
