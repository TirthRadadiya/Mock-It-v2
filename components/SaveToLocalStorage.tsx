"use client";
import { useEffect } from "react";

const SaveToLocalStorage = ({
  storeKey,
  data,
}: {
  storeKey: string;
  data: any;
}) => {
  useEffect(() => {
    localStorage.setItem(storeKey, data);
  }, []);
  return <></>;
};

export default SaveToLocalStorage;
