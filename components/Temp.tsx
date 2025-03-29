"use client";

import { useSocket } from "@/context/SocketProvider";
import React, { useEffect } from "react";

const Temp = () => {
  const { sendMessage } = useSocket();
  const [message, setMessage] = React.useState("");

  return <></>;
};

export default Temp;
