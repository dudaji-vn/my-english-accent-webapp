import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import UserAddIcon from "@/assets/icon/user-add-icon.svg";
import RightIcon from "@/assets/icon/arrow-right-icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useState } from "react";

export default function ListenPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  const onHandlePlayAll = () => {};
  return (
    <Box>
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
        value={value}
        onChange={handleChange}
        aria-label="tabs"
        className="px-4 bg-white divider"
      >
        <Tab
          id={`listen-tab-${value}`}
          label="Individual"
          className="text-small-medium"
          aria-controls={`listen-tabpanel-${value}`}
        />
        <Tab
          id={`listen-tab-${value}`}
          label="Team"
          className="text-small-medium"
          aria-controls={`listten-tabpanel-${value}`}
        />
      </Tabs>
      <Box className="flex fixed bottom-0 w-full p-6 gap-4 bg-white border-solid border-stroke border-0 border-t-[1px]">
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
    </Box>
  );
}
