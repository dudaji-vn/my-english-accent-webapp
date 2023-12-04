import MicRecorder from "mic-recorder-to-mp3";
import { useMemo, useState } from "react";

type StatusType = "recording" | "stopped" | "idle";
export default function useMicRecorder() {
  const [status, setStatus] = useState<StatusType>("idle");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const recorder = useMemo(() => {
    return new MicRecorder({
      bitRate: 128,
    });
  }, []);

  const startRecording = () => {
    recorder
      .start()
      .then(() => {
        setStatus(() => "recording");
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const stopRecording = () => {
    setStatus(() => "stopped");

    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]: [buffer: any, blob: Blob]) => {
        const file = new File(buffer, "recording.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        setMediaFile(() => file);
      })
      .catch((e: any) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };

  const clearFile = () => {
    setMediaFile(null);
  };

  return {
    status,
    mediaFile,
    startRecording,
    stopRecording,
    clearFile,
  };
}
