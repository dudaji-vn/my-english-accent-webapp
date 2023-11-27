import OptionIcon from "@/assets/icon/option-icon.svg";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

import Loading from "@/components/Loading";
import PlaylistPod from "@/components/PlaylistPod";
import { useGetPlaylistSummaryQuery } from "@/core/services/listen.service";
import ROUTER from "@/shared/const/router.const";
import { pluralize } from "@/shared/utils/pluralize.util";
import { useNavigate } from "react-router-dom";
import ListenEmptyPlaylistPage from "./EmptyPlaylist";

export default function ListenPage() {
  const navigate = useNavigate();
  const { data, isFetching } = useGetPlaylistSummaryQuery();

  if (isFetching) return <Loading />;

  return (
    <Box className='p-4 flex' sx={{ minHeight: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)` }}>
      {data?.totalLecture ? (
        <Box className='flex flex-col grow bg-white rounded-lg'>
          <Box className='flex justify-between p-4 divider'>
            <Box>
              <Typography className='text-base-medium'>My playlist</Typography>
              <Typography className='text-extra-small-regular' variant='body2'>
                {pluralize(data?.totalLecture ?? 0, "lecture")} &#x2022; {pluralize(data?.totalPeople ?? 0, "people", "")}
              </Typography>
            </Box>
            <IconButton onClick={() => navigate(ROUTER.LISTENING + ROUTER.MANAGE_PLAYLIST)}>
              <Avatar src={OptionIcon} alt='wave-icon' className='w-6 h-6' />
            </IconButton>
          </Box>

          <PlaylistPod />
        </Box>
      ) : (
        <ListenEmptyPlaylistPage />
      )}
    </Box>
  );
}
