import { Box } from "@mui/material";
import ParticipantCard from "@/components/ParticipantCard";

export default function TeamPage() {
  const renderParticipant = () => {
    return ["", ""].map(() => {
      return <ParticipantCard voiceSrc="voiceSrc" />;
    });
  };
  return <Box>{renderParticipant()}</Box>;
}
