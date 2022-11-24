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


export function getCurrentDateTime(): string {
  var currentdate = new Date();
  return currentdate.getDate() + "."
    + (currentdate.getMonth() + 1) + "."
    + currentdate.getFullYear() + ", "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes()
}  