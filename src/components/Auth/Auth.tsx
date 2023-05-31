import { useState } from "react";
import InputCustom from ".././UX/InputCustom/InputCustom";
import styles from "./auth.module.scss";
import { checkUser } from "../../store/user/userId";
import { useAppDispatch } from "../../hooks/redux";
const Auth = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const dispatch = useAppDispatch();
  interface IUser {
    idInstance: string;
    apiTokenInstance: string;
  }

  const user: IUser = {
    idInstance,
    apiTokenInstance,
  };
  const post = (e: React.ChangeEvent<HTMLFormElement>) => {
		setIdInstance('')
		setApiTokenInstance('')
    e.preventDefault();
		dispatch(checkUser(user))
  };
  return (
    <section>
      <div className="wrapper">
        <div className={styles.auth_block}>
          <form className={styles.form} onSubmit={post}>
            <InputCustom
              value={idInstance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIdInstance(e.currentTarget.value)
              }
              dopClass={styles.input}
              placeholder="idInstance"
            />
            <br />
            <InputCustom
              value={apiTokenInstance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setApiTokenInstance(e.currentTarget.value)
              }
              dopClass={styles.input}
              placeholder="apiTokenInstance"
            />
            <br />
            <input className={styles.btn} type="submit" value="Войти" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
