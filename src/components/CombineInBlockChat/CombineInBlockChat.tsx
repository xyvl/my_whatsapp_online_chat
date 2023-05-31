import ListUser from "./ListUser/ListUser";
import UserChat from "./UserChat/UserChat";
import styles from "./combineInBlockChat.module.scss";
const CombineInBlockChat = () => {

  return (
    <section>
      <div className="wrapper">
        <div className={styles.main}>
          <ListUser />
          <UserChat />
        </div>
      </div>
    </section>
  );
};

export default CombineInBlockChat;
