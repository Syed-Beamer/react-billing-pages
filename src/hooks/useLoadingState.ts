// useLoadingState.ts
import { useState, Dispatch, SetStateAction } from "react";

type UseLoadingStateType = [boolean, Dispatch<SetStateAction<boolean>>];

const useLoadingState = (): UseLoadingStateType => {
  const [loading, setLoading] = useState<boolean>(false);

  const setLoadingState = (isLoading: any) => {
    setLoading(isLoading);
  };

  return [loading, setLoadingState];
};

export default useLoadingState;
