import { useEffect } from "react";
import Auth from "../components/Auth/Auth";
import CombineInBlockChat from "../components/CombineInBlockChat/CombineInBlockChat";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getMessage } from "../store/user/userChat";

const Main = () => {
  const data = useAppSelector((state) => state.userId.idInstance);
  const dispatch = useAppDispatch();

  useEffect(() => {
		if(data)
    dispatch(getMessage());
  }, [data]);

  return <>{data ? <CombineInBlockChat /> : <Auth />}</>;
};

export default Main;
