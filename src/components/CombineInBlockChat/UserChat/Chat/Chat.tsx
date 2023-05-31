import { useState } from "react";
import styles from "./chat.module.scss";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { sendMessage } from "../../../../store/user/userChat";
const Chat = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const arrayMessage = useAppSelector((state) => state.userChat.arr);
  const phone = useAppSelector((state) => state.userChat.phone);

  const sendMessageComponent = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      phone,
      message,
    };
    dispatch(sendMessage(obj));
    setMessage("");
  };

  return (
    <div className={styles.main}>
        <div className={styles.window}>
          {arrayMessage.map((el, index) => (
            <div
              key={`${el.text}${index}`}
              className={`${
                el.whose === true
                  ? styles.message_my
                  : styles.message_interlocutor
              } ${styles.message}`}
            >
              {el.text}
            </div>
          ))}
      </div>
      <form className={styles.form} onSubmit={sendMessageComponent}>
        <textarea
          placeholder="Введите сообщение"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          className={styles.textarea}
        ></textarea>
        <input type="submit" value="Отправить" className={styles.btn} />
      </form>
    </div>
  );
};

export default Chat;
