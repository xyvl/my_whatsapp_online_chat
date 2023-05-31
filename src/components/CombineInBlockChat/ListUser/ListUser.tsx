import { NavLink } from "react-router-dom";
import styles from "./listUser.module.scss";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getUser } from "../../../store/user/userChat";
const ListUser = () => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<string | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [addUser, setAddUser] = useState(false);
  const name = useAppSelector((state) => state.userChat.name);

  useEffect(() => {
    setUser(name);
  }, [name]);

  const addContact = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneNumber) dispatch(getUser(phoneNumber));
  };
  return (
    <div className={styles.main}>
      {user ? (
        <NavLink className={`${styles.add_number} ${styles.user}`} to="/">
          {user}
        </NavLink>
      ) : (
        <>
          {addUser ? (
            <>
              <p className={styles.info}>Пример ввода: 79177672071</p>
              <form className={styles.form} onSubmit={addContact}>
                <input
                  className={styles.input}
                  type="tel"
                  pattern="7[0-9]{10}"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                  maxLength={12}
                  placeholder="Номер телефона"
                />
                <input className={styles.btn} type="submit" value="Добавить" />
              </form>
            </>
          ) : (
            <div onClick={() => setAddUser(true)} className={styles.add_number}>
              Добавить новый контакт
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListUser;
