import styles from './userChat.module.scss'
import {  useAppSelector } from "../../../hooks/redux"
import Chat from "./Chat/Chat"
const UserChat = () => {
	const name = useAppSelector(state => state.userChat.name)
	// useEffect(() => {
  //   setInterval(async () => {
  //     const host = "https://api.green-api.com";
  //     const data = await axios.get(
  //       `${host}/waInstance${localStorage.getItem(
  //         "idInstance"
  //       )}/receiveNotification/${localStorage.getItem("apiTokenInstance")}`
  //     );
  //     const text = data.data.body.messageData.textMessageData.textMessage;
  //     console.log(data.data.body.messageData.textMessageData.textMessage);
  //     const obj = {
  //       text,
  //       whose: false
  //     };
  //     if (text) {
  //     dispatch(addMessage(obj))
  //     }
  //   }, 1000);
  // })
	return (
		<div >
			{name ? <Chat/>: <div className={styles.no_contact}>Вы не открыли чат</div>}
		</div>
	)
}

export default UserChat
