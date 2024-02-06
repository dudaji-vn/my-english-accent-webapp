import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export interface MultiAudioSourceType {
  url: string;
  audio: any;
}

export interface MultiAudioPlayerType {
  url: string;
  playing: boolean;
  played: boolean;
}

export interface MultiAudioPlayer {
  players: MultiAudioPlayerType[];
  indexAudio: number;
  playAudio: (index: number) => {};
}

type status = "ready" | "play" | "stop";

export const useMultiAudio = () => {
  const [sources, setSources] = useState<MultiAudioSourceType[]>([]);

  const [players, setPlayers] = useState<MultiAudioPlayerType[]>([]);

  const [indexAudio, setIndexAudio] = useState<number>(-1);
  const [lengthAudio, setLengthAudio] = useState<number>(-1);

  const [status, setStatus] = useState<status>("ready");

  const playAudio = (index: number, data: MultiAudioPlayerType[]): void => {
    const newSources = data.map((v) => ({ url: v.url, audio: new Audio(v.url) }));
    setSources(() => newSources);

    const newPlayers = [...data];
    const currentIndex = data.findIndex((val) => val.playing === true);
    if (currentIndex !== -1) {
      newPlayers[index].playing = true;
    } else {
      newPlayers[index].playing = true;
    }
    setIndexAudio(() => index);
    setPlayers(() => newPlayers);
    setLengthAudio(() => data.length - 1);
  };

  useEffect(() => {
    if (indexAudio != -1) {
      console.log("useMultiAudio::useEffect::", indexAudio);
      if (players[indexAudio].playing) {
        console.log("useMultiAudio::useEffect::playing");
        sources[indexAudio].audio.play();
        setStatus("play");
      } else {
        console.log("useMultiAudio::useEffect::played");
        sources[indexAudio].audio.pause();
        setStatus("stop");
      }
    }
  }, [sources, players]);

  useEffect(() => {
    if (indexAudio != -1) {
      sources[indexAudio].audio.addEventListener("ended", () => {
        const newPlayers = [...players];

        newPlayers[indexAudio].playing = false;
        newPlayers[indexAudio].played = true;
        setPlayers(newPlayers);

        if (lengthAudio > 0 && lengthAudio > indexAudio) {
          playAudio(indexAudio + 1, newPlayers);
          console.log("useMultiAudio::useEffect::addEventListener::countinue");
        }
        setStatus("stop");
        console.log("useMultiAudio::useEffect::addEventListener::stop");
      });
    }

    return () => {
      if (indexAudio != -1) {
        sources[indexAudio].audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[indexAudio].playing = false;
          newPlayers[indexAudio].played = true;
          setPlayers(newPlayers);
          setIndexAudio(() => indexAudio + 1);
          setStatus("stop");
        });
      }
    };
  }, [indexAudio]);

  return { status, players, indexAudio, playAudio };
};
