import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Box, Avatar, Typography, Container, Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import SearchIcon from "@/assets/icon/search-icon.svg";
import FooterCard from "@/components/FooterBtn";
import persist from "@/shared/utils/persist.util";
import RecordCard from "@/components/RecordCard";
import ROUTER from "@/shared/const/router.const";

export default function ClubAddMemberPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [listUser, setListUser] = useState(() => {
    return persist.getMyInfo().favoriteUserIds ?? [];
  });
  const handleChangeTabIndex = (newValue: number) => {
    console.log(newValue);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const onHandleListUser = (id: string) => {
    let result: string[] = [...listUser];
    const isFound = listUser.includes(id);
    if (isFound) {
      const removed = listUser.filter((userId) => userId != id);
      result = [...removed];
    } else {
      result.push(id);
    }
    setListUser(() => result);
  };

  const renderUsersList = () => {
    return [1, 2, 3].map(() => {
      return <RecordCard key={nanoid()} className='last:rounded-b-lg divider' />;
    });
  };

  const onHandleAddMember = () => {
    console.log("add");
    navigate(ROUTER.CLUB_DETAIL + "/" + ROUTER.CLUB_MEMBER);
  };

  return (
    <Box className='flex flex-col grow'>
      <Box className='p-4 flex items-center gap-2 divider bg-white'>
        {/* hidden in add member page */}
        {/* <IconButton>
          <Avatar src={ChevronIcon} className='w-6 h-6' />
        </IconButton> */}

        <Box>
          <Typography className='text-large-semibold'>Add member</Typography>
          <Typography className='text-base-regular' variant='body2'>
            You can skip for later
          </Typography>
        </Box>
      </Box>
      <Container className='py-4 flex flex-col grow justify-between'>
        <Box className='bg-white'>
          <Container className='flex gap-1 items-center p-3 divider'>
            <Avatar src={SearchIcon} alt='search-icon' className='w-4 h-4' />
            <InputBase className='text-small-regular text-textSecondary' placeholder='Search by name' value={search} onChange={handleSearch} />
          </Container>
          {renderUsersList()}
        </Box>
      </Container>
      <FooterCard classes='items-center '>
        {/* hidden in add member page */}
        {/* <Typography variant='body2' className='text-extra-small-regular'>
          {listUser?.length} {listUser?.length > 0 ? "memebrs " : "member "}
          selected
        </Typography> */}
        <Button className='grow' onClick={() => navigate(ROUTER.CLUB_DETAIL + "/" + ROUTER.CLUB_STUDY)}>
          Skip
        </Button>
        <Button variant='contained' className='rounded-md m-auto grow' onClick={onHandleAddMember}>
          Add
        </Button>
      </FooterCard>
    </Box>
  );
}
