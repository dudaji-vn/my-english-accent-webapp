import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Container,
  Chip,
  Button,
  InputBase,
  Tabs,
  Tab,
} from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import SearchIcon from "@/assets/icon/search-icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import RecordCard from "@/components/RecordCard";
import FooterCard from "@/components/FooterBtn";
import { ChangeEvent, SyntheticEvent, useState } from "react";

export default function AddUserPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTabIndex = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const listRecord = ["", ""];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };
  const renderRecord = () => {
    return listRecord.map(() => {
      return <RecordCard className="rounded-b-lg divider" />;
    });
  };
  return (
    <Box className="flex flex-col grow">
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
            <Tabs
              value={tabIndex}
              onChange={handleChangeTabIndex}
              variant="scrollable"
              allowScrollButtonsMobile
              // TabIndicatorProps={{
              //   indica
              // }}
              classes={{
                indicator: "text-white",
              }}
              aria-label="scrollable tabs add user"
            >
              <Tab
                // sx={{
                //   border: "1px solid #D0D5DD",
                //   borderRadius: "8px",
                //   height: "20px",
                //   padding: "8px 14px",
                // }}
                label="General"
              />
              <Tab label="Develop" />
              <Tab label="Design" />

              {/* <Chip
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
              /> */}
            </Tabs>
          </Box>
          <Container className="flex gap-1 items-center">
            <Avatar src={SearchIcon} alt="search-icon" className="w-4 h-4" />
            <InputBase
              className="text-small-regular text-textSecondary"
              placeholder="Search by name"
              value={search}
              onChange={handleSearch}
            />
          </Container>
          {renderRecord()}
        </Box>
      </Container>
      <FooterCard classes="items-center ">
        <Typography variant="body2" className="text-base-regular">
          1 member selected
        </Typography>
        <Button
          variant="contained"
          className="rounded-md m-auto grow"
          onClick={() => {}}
        >
          <Typography className="text-base-medium text-white">Add</Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
