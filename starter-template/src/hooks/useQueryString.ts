import { useSearchParams } from "react-router-dom";

const useQueryString = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries([...searchParams]);
  return searchParamsObj;
};

export default useQueryString;
