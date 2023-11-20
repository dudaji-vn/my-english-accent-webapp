import CloseIcon from "@/assets/icon/close-icon.svg";
import { Avatar, Box, Button, Container, IconButton, Tab, Tabs, Typography } from "@mui/material";

import FooterCard from "@/components/FooterBtn";
import LecturePlaylist from "@/components/LecturePlaylist";
import UserPlaylist from "@/components/UserPlaylist";
import { useCreateOrUpdatePlaylistMutation, useGetLecturesAvailableQuery, useGetPlaylistSummaryQuery, useGetUsersAvailableQuery } from "@/core/services/listen.service";
import { pluralize } from "@/shared/utils/pluralize.util";
import _ from "lodash";
import React, { SyntheticEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const tabItems = ["Lectures", "Peoples"];

export default function CreatePlaylist() {
  const navigate = useNavigate();
  const { data: LectureData, refetch: lectureRefetch } = useGetLecturesAvailableQuery();
  const { data: PeopleData, refetch: PeopleRefetch } = useGetUsersAvailableQuery();

  const { refetch } = useGetPlaylistSummaryQuery();

  const [updatePlaylist] = useCreateOrUpdatePlaylistMutation();

  const [activeTab, setActiveTab] = React.useState("Lectures");
  const [lectureList, setLectureList] = useState<string[]>([]);
  const [peopleList, setPeopleList] = useState<string[]>([]);

  const [disabledWhenUpdate, setDisableWhenUpdate] = useState(false);
  const disableBtn = useMemo(() => {
    switch (activeTab) {
      case "Lectures":
        const bareLectureList = LectureData?.filter((val) => val.isSelected).map((val) => val.lectureId);
        return !lectureList.length || _.isEqual(bareLectureList, lectureList);
      case "Peoples":
        const barePeopleList = PeopleData?.filter((val) => val.isSelected).map((val) => val.userId);
        return !peopleList.length || _.isEqual(barePeopleList, peopleList);
    }
  }, [activeTab, lectureList, peopleList, PeopleData, LectureData]);

  const handleNext = async () => {
    setDisableWhenUpdate(() => true);

    const response = await updatePlaylist({
      favoriteLectureIds: lectureList,
      favoriteUserIds: peopleList,
    }).unwrap();

    if (response) {
      switch (activeTab) {
        case "Lectures":
          lectureRefetch();
          break;
        case "Peoples":
          PeopleRefetch();
          break;
      }
      refetch();
    }
  };

  const handleChange = (event: SyntheticEvent, path: string) => {
    setActiveTab(path);
  };

  const renderList = () => {
    switch (activeTab) {
      case "Lectures":
        return (
          <LecturePlaylist
            lectureList={lectureList}
            setLectureList={(val: string[]) => {
              setLectureList(() => val);
              setDisableWhenUpdate(() => false);
            }}
          />
        );
      case "Peoples":
        return (
          <UserPlaylist
            peopleList={peopleList}
            setPeopleList={(val: string[]) => {
              setPeopleList(() => val);
              setDisableWhenUpdate(() => false);
            }}
          />
        );
    }
  };

  const renderFooterTitle = () => {
    switch (activeTab) {
      case "Lectures":
        return pluralize(lectureList.length, "lecture") + " selected";
      case "Peoples":
        return pluralize(peopleList.length, "people", "") + " selected";
    }
  };

  return (
    <Box className='flex flex-col grow min-h-screen'>
      <Container className='py-4 divider '>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={() => navigate(-1)}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>Custom playlist</Typography>
        </Box>
      </Container>

      <Box className='bg-white divider'>
        <Tabs value={activeTab} onChange={handleChange} aria-label='tabs' variant='fullWidth'>
          <Tab label={tabItems[0]} id={`listen-tab-${activeTab}`} aria-controls={`listen-tabpanel-${activeTab}`} value={"Lectures"} />
          <Tab label={tabItems[1]} id={`listen-tab-${activeTab}`} aria-controls={`listten-tabpanel-${activeTab}`} value={"Peoples"} />
        </Tabs>
      </Box>

      <Box className='flex flex-col p-4 grow  bg-gray-100 gap-4'>{renderList()}</Box>

      <FooterCard classes='items-center justify-between'>
        <Typography variant='body2'>{renderFooterTitle()}</Typography>
        <Button variant='contained' className='rounded-md' onClick={handleNext} disabled={disableBtn || disabledWhenUpdate}>
          <Typography className='text-base-medium text-white'>Save</Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
