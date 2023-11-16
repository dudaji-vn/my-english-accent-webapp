import BookIcon from "@/assets/icon/book-icon.svg";
import CheckIcon from "@/assets/icon/circle-check-icon.svg";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import WarningIcon from "@/assets/icon/warning-icon.svg";
import { Avatar, Box, Button, Checkbox, Typography } from "@mui/material";
import BoxCard from "../BoxCard";
import UserListen from "../UserListen";
import { useGetUsersAvailableQuery } from "@/core/services/listen.service";
import { PeopleistenTypeResponse } from "@/core/type/listen.type";

import { pluralize } from "@/shared/utils/pluralize.util";
import { useEffect } from "react";

export default function UserPlaylist({ peopleList, setPeopleList }: { peopleList: string[]; setPeopleList: Function }) {
  const { data } = useGetUsersAvailableQuery();

  const onHandleSelect = (val: string) => {
    const existed = peopleList.includes(val);
    if (existed) {
      const removed = peopleList.filter((id) => id != val);
      setPeopleList(removed);
    } else {
      const newlist = [...peopleList, val];
      setPeopleList(newlist);
    }
  };

  const onHandleSelectAll = () => {
    if (!data) return;

    if (peopleList.length === data.length) {
      const unSelectedAll: string[] = [];
      setPeopleList(unSelectedAll);
    } else {
      const selectedAll: string[] = data.map((user) => user.userId);
      setPeopleList(selectedAll);
    }
  };

  useEffect(() => {
    if (data) {
      const selectedList = data.reduce((acc, currentVal) => {
        return currentVal.isSelected ? [...acc, currentVal.userId] : acc;
      }, [] as string[]);
      setPeopleList(selectedList);
    }
  }, [data]);

  if (!data) return null;

  return (
    <>
      <Box className='flex justify-between items-center'>
        <Typography variant='body2' className='text-extra-small-regular'>
          {pluralize(data.length ?? 0, "people", "")}
        </Typography>
        <Button className='text-base-semibold' onClick={onHandleSelectAll}>
          {data.length === peopleList.length ? "Unselect all" : "Select all"}
        </Button>
      </Box>
      {data.map((user: PeopleistenTypeResponse) => (
        <BoxCard classes='flex justify-between items-start p-4' key={user.userId}>
          <Box className='flex flex-col gap-4'>
            <UserListen {...user} />
            <Typography variant='body2' className='text-extra-small-regular flex gap-2'>
              <Avatar src={BookIcon} component={"span"} className='w-4 h-4' />
              {`${pluralize(user.numberCompletedLectures, "lecture")}  recorded`}
              {user.numberCompletedLectures ? null : <Avatar src={WarningIcon} component={"span"} className='w-4 h-4' />}
              {user.numberCompletedLectures && user.numberSelectedLectures ? ` / ${pluralize(user.numberSelectedLectures, "lecture")} selected` : null}
            </Typography>
          </Box>
          <Checkbox
            onClick={() => onHandleSelect(user.userId)}
            checked={peopleList.includes(user.userId)}
            value={user.userId}
            icon={<Avatar src={UncheckIcon} alt='uncheck-icon' className='w-5 h-5' />}
            checkedIcon={<Avatar src={CheckIcon} alt='check-icon' className='w-5 h-5' />}
          />
        </BoxCard>
      ))}
    </>
  );
}
