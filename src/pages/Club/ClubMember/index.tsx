import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import WebniarIcon from "@/assets/icon/webinar-icon.svg";
import MessageIcon from "@/assets/icon/message-icon.svg";

import NationalityCard from "@/components/NationalityCard";
import BoxCard from "@/components/BoxCard";
import { useNavigate, useParams } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import UserClub from "@/components/UserClub";
import { useMemo } from "react";
import { useGetALlMembersClubQuery } from "@/core/services";
import persist from "@/shared/utils/persist.util";

export default function ClubMemberPage() {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const myInfo = persist.getMyInfo();
  const { data } = useGetALlMembersClubQuery(clubId ?? "");

  console.log(myInfo);
  const language = useMemo(() => {
    if (myInfo.nativeLanguage === "vn") {
      return "Vietnamese";
    } else if (myInfo.nativeLanguage === "us") {
      return "English";
    } else if (myInfo.nativeLanguage === "kr") {
      return "Korea";
    }
  }, []);

  const renderNoMember = () => {
    return (
      <Box className='flex flex-col justify-center items-center gap-4'>
        <Avatar src={WebniarIcon} className='w-16 h-16' variant='square' />
        <Box className='text-center'>
          <Typography className='text-large-semibold'>Add new member</Typography>
          <Typography className='text-base-regular' variant='body2'>
            Let's add new members and begin learning together.
          </Typography>
        </Box>
        <Button variant='contained' onClick={() => navigate(ROUTER.CLUB_ADD_MEMBER)}>
          Add
        </Button>
      </Box>
    );
  };

  const renderMembers = () => {
    if (data && data.length)
      return (
        <>
          <Box className='flex justify-between items-center mb-4'>
            <Typography className='text-base-semibold'>
              {data.length > 1 ? "Members" : " Member"} ({data.length})
            </Typography>
            <Button variant='contained' onClick={() => navigate(ROUTER.CLUB_ADD_MEMBER)}>
              Add
            </Button>
          </Box>
          {data.map((member) => (
            <UserClub {...member} key={member.userId} />
          ))}
        </>
      );
    else {
      return (
        <Box className='flex flex-col justify-center items-center gap-4'>
          <Avatar src={WebniarIcon} className='w-16 h-16' variant='square' />
          <Box className='text-center'>
            <Typography className='text-large-semibold'>Add new member</Typography>
            <Typography className='text-base-regular' variant='body2'>
              Let's add new members and begin learning together.
            </Typography>
          </Box>
          <Button variant='contained' onClick={() => navigate(ROUTER.CLUB_ADD_MEMBER)}>
            Add
          </Button>
        </Box>
      );
    }
  };
  return (
    <Container className='mt-6'>
      <Typography className='text-base-semibold mb-4'>Admin</Typography>
      <UserClub {...myInfo} />
      {renderMembers()}
    </Container>
  );
}
