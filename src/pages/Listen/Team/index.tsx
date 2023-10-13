import { Box } from "@mui/material";
import ParticipantCard from "@/components/ParticipantCard";
import { useGetRecordsByManyUserQuery } from "@/core/services";
import persist from "@/shared/utils/persist.util";

export default function TeamPage() {
  const listUser = persist.getMyInfo().favoriteUserIds;
  const { data } = useGetRecordsByManyUserQuery(listUser);
  
  const renderParticipant = () => {
    return ["", ""].map(() => {
      return <ParticipantCard voiceSrc="voiceSrc" />;
    });
  };
  return <Box>{renderParticipant()}</Box>;
}
