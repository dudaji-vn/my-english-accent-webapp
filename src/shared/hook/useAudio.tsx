import { useMemo, useEffect, useState } from "react";

type tuplesAudio = [boolean, Function];

const useAudio = (url: string) => {
  const audio = useMemo(() => new Audio(url), []);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle] as tuplesAudio;
};

export default useAudio;
