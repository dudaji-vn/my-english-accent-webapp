import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Container,
  Tabs,
  Tab,
  Chip,
  Button,
  InputBase,
  TextField,
  Autocomplete,
} from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import React from "react";
import RecordCard from "@/components/RecordCard";

export default function AddUserPage() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const listRecord = ["", ""];

  const renderRecord = () => {
    return listRecord.map(() => {
      return (
        <RecordCard className="rounded-b-lg border-solid border-stroke border-0 border-b-[1px]" />
      );
    });
  };
  return (
    <Box>
      <Box className="p-4 flex items-center gap-2 divider bg-white">
        <IconButton onClick={() => navigate(ROUTER.LISTENING)}>
          <Avatar src={ChevronIcon} className="w-6 h-6" />
        </IconButton>
        <Typography className="text-large-semibold">Add members</Typography>
      </Box>
      <Container className="py-4 flex flex-col grow justify-between">
        <Box className="bg-white">
          <Box className="flex flex-col p-4 rounded-t-lg">
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
          {renderRecord()}
        </Box>
      </Container>
      <Box className="flex fixed items-center bottom-0 w-full p-6 gap-4 bg-white border-solid border-stroke border-0 border-t-[1px]">
        <Typography variant="body2" className="text-base-regular">
          1 member selected
        </Typography>
        <Button
          variant="contained"
          className="rounded-md m-auto grow"
          onClick={() => {}}
        >
          <Typography className="text-base-medium" color={"white"}>
            Add
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
