import BlackPauseIcon from "@/assets/icon/black-pause-icon.svg";
import BlackPlayIcon from "@/assets/icon/black-play-icon.svg";
import EmptyLecture from "@/pages/listen/empty-lectures";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { UserPlayingType } from "..";
import { useAppSelector } from "@/core/store";
import VietNamFlagIcon from "@/components/icons/vietnam-flag-icon";
import KoreanFlagIcon from "@/components/icons/korean-flag-icon";

export default function PeopleControl({
  userRecord,
  onUserPlayAudio,
}: {
  userRecord: UserPlayingType[];
  onUserPlayAudio: Function;
}) {
  const playingStatus = useAppSelector((state) => state.GlobalStore.listenSetting.isPlaying);

  return (
    <Box>
      {userRecord.length ? (
        userRecord.map((user, index) => (
          <Grid
            container
            key={user.userId}
            alignItems="center"
            justifyItems={"center"}
            padding={1}
            onClick={() => onUserPlayAudio(index, true)}
          >
            <Grid item xs={1}>
              {user.isPlaying ? (
                playingStatus ? (
                  <Avatar alt="avatar-icon" className="w-6 h-6" src={BlackPauseIcon} />
                ) : (
                  <Avatar alt="avatar-icon" className="w-6 h-6" src={BlackPlayIcon} />
                )
              ) : (
                <Typography className="text-small-regular">{index + 1}</Typography>
              )}
            </Grid>
            <Grid xs={2}>
              <Box className="relative w-fit">
                <Avatar src={user.avatarUrl} alt="avatar-icon" className="w-9 h-9">
                  {user.nickName.slice(0, 1)}
                </Avatar>
                <Box className="absolute -bottom-2 -right-2">
                  {user.nativeLanguage === "kr" ? <KoreanFlagIcon /> : <VietNamFlagIcon />}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Typography className="text-small-medium">{user.nickName}</Typography>
            </Grid>
            <Typography className="text-extra-small-medium  text-secondary">{user.isPlaying ? "Speaking now" : null}</Typography>
          </Grid>
        ))
      ) : (
        <EmptyLecture classes="bg-white" />
      )}
    </Box>
  );
}
