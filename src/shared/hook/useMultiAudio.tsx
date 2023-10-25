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

export const useMultiAudio = (urls: string[]) => {
  const [sources, setSources] = useState<MultiAudioSourceType[]>(
    urls.map((url) => {
      return {
        url,
        audio: new Audio(url),
      };
    })
  );

  const [players, setPlayers] = useState<MultiAudioPlayerType[]>(
    urls.map((url) => {
      return {
        url,
        playing: false,
        played: false,
      };
    })
  );

  const [indexAudio, setIndexAudio] = useState<number>(-1);
  const [lengthAudio] = useState<number>(urls.length - 1);

  const playAudio = (index: number, data: MultiAudioPlayerType[]): void => {
    const newSources = data.map((v) => ({ url: v.url, audio: new Audio(v.url) }));
    setSources(() => newSources);

    const newPlayers = [...data];
    const currentIndex = data.findIndex((p) => p.playing === true);
    if (currentIndex !== -1) {
      newPlayers[index].playing = true;
    } else {
      newPlayers[index].playing = true;
    }
    setIndexAudio(() => index);
    setPlayers(newPlayers);
  };

  useEffect(() => {
    if (indexAudio != -1) {
      console.log("chay trong nay");
      if (players[indexAudio].playing) {
        console.log("chay trong nay1");
        sources[indexAudio].audio.play();
      } else {
        console.log("chay trong nay2");
        sources[indexAudio].audio.pause();
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
        }
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
        });
      }
    };
  }, [indexAudio]);

  return { players, indexAudio, playAudio };
};
