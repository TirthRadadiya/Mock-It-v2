// @ts-nocheck
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { useSocket } from "@/context/SocketProvider";
import { useUser } from "@clerk/nextjs";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const MockInterview = () => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  // const [agentMessage, setAgentMessage] = useState<string>("");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  const { user } = useUser();

  const { sendMessage, agentMessage } = useSocket();

  useEffect(() => {
    const SpeechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    // recognition.maxAlternatives = 10;

    if (recognition) setRecognition(recognition);

    // socket?.on("event:receive-message", (data) => {
    //   console.log("receive message", data);
    //   setAgentMessage(data.message);
    // });

    return () => recognition.stop();
  }, []);

  useEffect(() => {
    if (agentMessage) {
      speakResponse(agentMessage);
    }
  }, [agentMessage]);

  useEffect(() => {
    const stopSpeech = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        speechSynthesis.cancel(); // Stops the speech
        setIsSpeaking(false);
        recognition?.start();
      }
    };

    window.addEventListener("keydown", stopSpeech);

    return () => {
      window.removeEventListener("keydown", stopSpeech);
      speechSynthesis.cancel(); // Stop speech on component unmount or refresh
    };
  }, [recognition]);

  const speakResponse = (text: string) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => recognition?.start(), 200); // slight delay before restarting
    };
    speechSynthesis.speak(utterance);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.ACTIVE);
    if (!recognition) return;

    recognition.start();

    recognition.onresult = async (event) => {
      const latestResultIndex = event.results.length - 1;
      const latestTranscript = event.results[latestResultIndex][0].transcript;
      setLastMessage(latestTranscript);

      speechSynthesis.cancel(); // <-- stop AI speech immediately on user speech
      setIsSpeaking(false); // update state

      recognition.stop(); // temporarily stop recognition

      sendMessage(latestTranscript);
    };
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    recognition?.stop();
    speechSynthesis.cancel(); // <-- forcefully stop speaking
    setIsSpeaking(false); // update state accordingly
  };

  return (
    <div className="mt-20">
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            {/* <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            /> */}
            <h3>{(user && user?.fullName) || "Interview"}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center mt-10">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
