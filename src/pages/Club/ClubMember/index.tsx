import WebniarIcon from "@/assets/icon/webinar-icon.svg";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";

import UserClub from "@/components/UserClub";
import { useGetALlMembersClubQuery } from "@/core/services";
import ROUTER from "@/shared/const/router.const";
import { useNavigate, useParams } from "react-router-dom";

export default function ClubMemberPage() {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const { data } = useGetALlMembersClubQuery(clubId ?? "");

  const renderMembers = () => {
    if (data && data.members.length)
      return (
        <>
          <Box className='flex justify-between items-center mb-4'>
            <Typography className='text-base-semibold'>
              {data.members.length > 1 ? "Members" : " Member"} ({data.members.length})
            </Typography>
            <Button variant='contained' onClick={() => navigate(ROUTER.CLUB_ADD_MEMBER)}>
              Add
            </Button>
          </Box>
          {data.members.map((member) => (
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
          <Button
            variant='contained'
            onClick={() =>
              navigate(
                {
                  pathname: ROUTER.CLUB_ADD_MEMBER,
                },
                {
                  state: {
                    clubId,
                  },
                }
              )
            }
          >
            Add
          </Button>
        </Box>
      );
    }
  };
  return (
    <Container className='mt-6'>
      <Typography className='text-base-semibold mb-4'>Admin</Typography>
      {data && <UserClub {...data.owner} />}
      {renderMembers()}
    </Container>
  );
}
