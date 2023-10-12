import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
  Divider,
  Chip,
  Container,
} from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import UserAddIcon from "@/assets/icon/user-add-icon.svg";
import RightIcon from "@/assets/icon/arrow-right-icon.svg";
import MicrophoneIcon from "@/assets/icon/microphone-icon.svg";
import QuoteIcon from "@/assets/icon/quote-icon.svg";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useState } from "react";
import RecordCard from "@/components/RecordCard";
import PersonInfo from "@/components/NationalityCard";
import FooterCard from "@/components/FooterBtn";

export default function ListenPage() {
  const navigate = useNavigate();

  const [path, setPath] = useState<"individual" | "team">("individual");

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "individual" | "team"
  ) => {
    setPath(newValue);
    navigate(ROUTER.LISTENING + "/" + newValue);
  };

  const onHandlePlayAll = () => {};
  return (
    <Box className="flex flex-col grow">
      <Box className="px-4 pt-4 pb-2 flex items-center gap-2 bg-white">
        <IconButton onClick={() => navigate(ROUTER.ROOT)}>
          <Avatar src={ChevronIcon} className="w-6 h-6" />
        </IconButton>
        <Typography className="text-large-semibold">Listening</Typography>
        <IconButton
          onClick={() => navigate(ROUTER.LISTENING + ROUTER.ADDUSER)}
          className="grow justify-end"
        >
          <Avatar src={UserAddIcon} className="w-6 h-6" />
        </IconButton>
      </Box>
      <Tabs
        variant="fullWidth"
        value={path}
        onChange={handleChange}
        aria-label="tabs"
        className="px-4 bg-white divider"
      >
        <Tab
          id={`listen-tab-${path}`}
          label="Individual"
          className="text-small-medium"
          aria-controls={`listen-tabpanel-${path}`}
          value={ROUTER.INDIVIDUAL}
        />
        <Tab
          id={`listen-tab-${path}`}
          label="Team"
          className="text-small-medium"
          aria-controls={`listten-tabpanel-${path}`}
          value={ROUTER.TEAM}
        />
      </Tabs>

      <Container className="mt-4 grow">
        <Box className="flex flex-col p-4 rounded-t-lg bg-white">
          <Typography className="text-small-medium">Browse by</Typography>
          <Box className="flex gap-2 mt-4">
            <Chip
              className="text-small-semibold rounded-lg  text-primary bg-purple-50"
              label="General"
              variant="filled"
            />
            <Chip
              className="text-small-semibold rounded-lg"
              label="Develop"
              variant="outlined"
            />
            <Chip
              className="text-small-semibold rounded-lg"
              label="Design"
              variant="outlined"
            />
          </Box>
        </Box>
        <Outlet />
      </Container>

      <FooterCard classes="flex-col">
        {path === "individual" && (
          <Box className="flex gap-2">
            <PersonInfo isShowAvatar isShowName isShowNationality />
            <Typography
              variant={"body2"}
              className="text-extra-small-regular flex grow self-end justify-end"
            >
              <Avatar
                alt="microphone-icon"
                src={MicrophoneIcon}
                className="w-4 h-4"
                component={"span"}
              />
              2 recorded
            </Typography>
          </Box>
        )}

        {path === "team" && (
          <Typography className="text-small-medium p-4 border border-solid rounded-lg border-stroke bg-gray-100 relative">
            Please unshare your screen, I will share my screen.
            <Avatar
              src={QuoteIcon}
              alt="quote-icon"
              className="w-4 h-4 absolute bottom-0 right-0 m-2"
              component={"span"}
            />
          </Typography>
        )}

        <Divider />
        <Box className="flex gap-4">
          <IconButton
            onClick={() => navigate(ROUTER.LISTENING + ROUTER.ADDUSER)}
            className="border border-stroke border-solid"
          >
            <Avatar src={ChevronIcon} className="w-6 h-6" />
          </IconButton>
          <Button
            variant="contained"
            className="rounded-md m-auto grow"
            onClick={onHandlePlayAll}
          >
            <Typography className="text-base-medium " color={"white"}>
              LIsten all
            </Typography>
          </Button>
          <IconButton
            onClick={() => navigate(ROUTER.LISTENING + ROUTER.ADDUSER)}
            className="border border-stroke border-solid"
          >
            <Avatar src={RightIcon} className="w-6 h-6" />
          </IconButton>
        </Box>
      </FooterCard>
    </Box>
  );
}
