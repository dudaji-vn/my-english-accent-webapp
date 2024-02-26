import CheckIcon from "@/assets/icon/circle-check-icon.svg";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import CloseIcon from "@/assets/icon/close-icon.svg";
import PeopleRecordIcon from "@/assets/icon/people-record-icon.svg";
import SentencesIcon from "@/assets/icon/sentences-icon.svg";
import WarningIcon from "@/assets/icon/warning-icon.svg";
import { useGetLecturesAvailableQuery } from "@/core/services/listen.service";
import { pluralize } from "@/shared/utils/pluralize.util";
import { Avatar, Box, Button, Checkbox, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import BoxCard from "../box-card";
import SearchIcon from "../icons/search-icon";
import Loading from "../loading";

export default function LecturePlaylist({ lectureList, setLectureList }: { lectureList: string[]; setLectureList: Function }) {
  const { data, isFetching } = useGetLecturesAvailableQuery();
  const [textSearch, setTextSearch] = useState<string>("");
  const filterLecturesAvailable = useMemo(() => {
    if (!data) {
      return [];
    }
    if (!textSearch) {
      return data;
    }
    return data.filter((item) => item.lectureName.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()));
  }, [data, textSearch]);

  const onHandleSelect = (val: string) => {
    const existed = lectureList.includes(val);
    if (existed) {
      const removed = lectureList.filter((id) => id !== val);
      setLectureList(removed);
    } else {
      const newLectures = [...lectureList, val];
      setLectureList(newLectures);
    }
  };

  const onHandleSelectAll = () => {
    if (!data) return;

    if (lectureList.length === data.length) {
      const unSelectedAll: string[] = [];
      setLectureList(unSelectedAll);
    } else {
      const selectedAll: string[] = data.map((lecture) => lecture.lectureId);
      setLectureList(selectedAll);
    }
  };

  useEffect(() => {
    if (data) {
      const selectedList = data.reduce((acc, currentVal) => {
        return currentVal.isSelected ? [...acc, currentVal.lectureId] : acc;
      }, [] as string[]);
      setLectureList(selectedList);
    }
  }, [data]);

  if (isFetching) return <Loading />;

  if (!data) return null;

  return (
    <>
      <Box className="flex flex-col items-center mb-4">
        <Box className="w-full md:w-[500px] mb-6">
          <TextField
            value={textSearch}
            onChange={(e) => {
              setTextSearch(e.target.value);
            }}
            className="bg-[#fff]"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: textSearch && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setTextSearch("");
                    }}
                  >
                    <Avatar src={CloseIcon} className="w-6 h-6" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className="flex justify-between items-center w-full md:w-[500px]">
          <Typography variant="body2" className="text-extra-small-regular">
            {pluralize(data.length ?? 0, "lecture")}
          </Typography>
          <Button className="text-base-semibold" onClick={onHandleSelectAll} disabled={!data.length}>
            {data.length === lectureList.length ? "Unselect all" : "Select all"}
          </Button>
        </Box>
      </Box>

      <Box className="flex flex-col gap-4 items-center">
        {filterLecturesAvailable.map((val) => (
          <BoxCard classes="flex justify-between items-start p-4 w-full md:w-[500px]" key={val.lectureId}>
            <Box className="flex flex-col gap-4">
              <Typography className="text-base-semibold">{val.lectureName}</Typography>
              <Box>
                <Typography variant="body2" className="text-extra-small-regular flex gap-2">
                  <Avatar src={SentencesIcon} component={"span"} className="w-4 h-4" />{" "}
                  {pluralize(val.totalVocabularies, "sentence")}
                </Typography>
                <Typography variant="body2" className="text-extra-small-regular flex gap-2">
                  <Avatar src={PeopleRecordIcon} component={"span"} className="w-4 h-4" /> {val.totalPeople} people recorded
                  {!val.totalPeople && <Avatar src={WarningIcon} component={"span"} className="w-4 h-4" />}
                </Typography>
              </Box>
            </Box>
            <Checkbox
              onClick={() => onHandleSelect(val.lectureId)}
              checked={lectureList.includes(val.lectureId)}
              value={val.lectureId}
              icon={<Avatar src={UncheckIcon} alt="uncheck-icon" className="w-5 h-5" />}
              checkedIcon={<Avatar src={CheckIcon} alt="check-icon" className="w-5 h-5" />}
            />
          </BoxCard>
        ))}
      </Box>
    </>
  );
}
