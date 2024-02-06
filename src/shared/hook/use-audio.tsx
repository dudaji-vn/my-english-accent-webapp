import { useMemo, useEffect, useState } from "react";

type tuplesAudio = [boolean, Function];

const useAudio = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const playAudio = ({ audio, url }: { url: string; audio: HTMLAudioElement }): void => {
    setAudio(() => audio);
    setPlaying(() => true);
  };

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => setPlaying(false));
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", () => setPlaying(false));
      }
    };
  }, []);

  return [playing, playAudio] as tuplesAudio;
};

export default useAudio;
