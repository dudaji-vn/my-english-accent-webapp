import MicRecorder from "mic-recorder-to-mp3";
import { useState } from "react";

type StatusType = "recording" | "stopped" | "idle";
export default function useMicRecorder() {
  const [status, setStatus] = useState<StatusType>("idle");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaBase64, setMediaBase64] = useState<string>("");

  const [recorder, setRecorder] = useState(new MicRecorder({ bitRate: 128 }));

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.toString().replace("data:", "").replace(/^.+,/, "");
        //const base64String = reader.result?.toString();

        return resolve(base64String);
      };
      reader.onerror = reject;
    });

  const startRecording = () => {
    recorder
      .start()
      .then((stream: any) => {
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
      .then(([buffer, blob]: [buffer: Int8Array[], blob: Blob]) => {
        const file = new File(buffer, "recording.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        setMediaFile(() => file);
        toBase64(file).then((base64) => setMediaBase64(() => base64 as string));
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
    mediaBase64,
    startRecording,
    stopRecording,
    clearFile,
  };
}
