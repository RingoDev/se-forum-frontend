import { useEffect, useRef } from "react";

export default function useEffectSkipInitial(fn: any, inputs: any) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
}

//TODO: example comments have no exact time, match to format used in db later
export function getCurrentDateTime(): string {
  var currentdate = new Date();
  const hours = currentdate.getHours();
  const minutes = currentdate.getMinutes();
  return currentdate.getDate() + "."
    + (currentdate.getMonth() + 1) + "."
    + currentdate.getFullYear() + ", "
    + (hours < 10 ? '0' + hours : hours) + ":"
    + (minutes < 10 ? '0' + minutes : minutes)
}  