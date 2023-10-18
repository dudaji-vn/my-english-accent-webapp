import { Box, Avatar, Typography, IconButton, Container, Button, InputBase } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import SearchIcon from "@/assets/icon/search-icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import RecordCard from "@/components/RecordCard";
import FooterCard from "@/components/FooterBtn";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import TabCustom from "@/components/TabCustom";
import { useFavoriteUsersMutation, useGetUsersQuery } from "@/core/services";
import { UserType } from "@/shared/type";
import persist from "@/shared/utils/persist.util";

export default function ChooseUserPage() {
  const { data: dataUser } = useGetUsersQuery();
  console.log("userData::", dataUser);
  const [favoriteUsers] = useFavoriteUsersMutation();

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

  const renderUsers = () => {
    if (dataUser) {
      return dataUser.map((user: UserType) => {
        const favoritedUser = listUser.includes(user.userId);
        return (
          <Box key={user.userId} onClick={() => onHandleListUser(user.userId)}>
            <RecordCard className='rounded-b-lg divider' userInfo={user} checked={favoritedUser} />
          </Box>
        );
      });
    }
  };

  const onHandleFavoriteList = () => {
    favoriteUsers(listUser).then((value) => console.log("favoriteUsers", value));
  };

  return (
    <Box className='flex flex-col grow'>
      <Box className='p-4 flex items-center gap-2 divider bg-white'>
        <IconButton>
          <Avatar src={ChevronIcon} className='w-6 h-6' />
        </IconButton>
        <Typography className='text-large-semibold'>Choose members</Typography>
      </Box>
      <Container className='py-4 flex flex-col grow justify-between'>
        <Box className='bg-white'>
          <Box className='flex flex-col p-4 rounded-t-lg'>
            <Typography className='text-small-medium'>Browse by</Typography>
            {/* <TabCustom
              tabsName={["General", "Develop", "Design"]}
              callback={handleChangeTabIndex}
            /> */}
          </Box>
          <Container className='flex gap-1 items-center'>
            <Avatar src={SearchIcon} alt='search-icon' className='w-4 h-4' />
            <InputBase className='text-small-regular text-textSecondary' placeholder='Search by name' value={search} onChange={handleSearch} />
          </Container>
          {renderUsers()}
        </Box>
      </Container>
      <FooterCard classes='items-center '>
        <Typography variant='body2' className='text-extra-small-regular'>
          {listUser?.length} {listUser?.length > 0 ? "memebrs " : "member "}
          selected
        </Typography>
        <Button variant='contained' className='rounded-md m-auto grow' onClick={onHandleFavoriteList}>
          <Typography className='text-base-medium text-white'>Save</Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
