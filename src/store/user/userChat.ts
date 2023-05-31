import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const host = "https://api.green-api.com";
interface IArray {
  text: string;
  whose: boolean;
  id?: string;
}
interface IInitialState {
  name: string;
  phone: string;
  arr: IArray[];
}
interface ISendMessageProps {
  phone: string;
  message: string;
}
const initialState: IInitialState = {
  name: "",
  phone: "",
  arr: [],
};

export const getUser = createAsyncThunk(
  "userChat/getUser",
  async (action: string, { dispatch }) => {
    const data = await axios.post(
      `${host}/waInstance${localStorage.getItem(
        "idInstance"
      )}/GetContactInfo/${localStorage.getItem("apiTokenInstance")}`,
      { chatId: `${action}@c.us` }
    );
    dispatch(
      writeName({ name: data.data.name, phone: data.data.chatId.slice(0, 11) })
    );
  }
);
export const sendMessage = createAsyncThunk(
  "userChat/sendMessage",
  async (obj: ISendMessageProps, { dispatch }) => {
    try {
      await axios.post(
        `${host}/waInstance${localStorage.getItem(
          "idInstance"
        )}/sendMessage/${localStorage.getItem("apiTokenInstance")}`,
        { chatId: `${obj.phone}@c.us`, message: obj.message }
      );
      dispatch(addMessage({ text: obj.message, whose: true }));
    } catch (error) {
      dispatch(addMessage({ text: "не отправилось", whose: true }));
    }
  }
);
export const getMessage = createAsyncThunk(
  "userChat/getMessage",
  (_, { dispatch }) => {
    const mainFunction = () => {
      const getMessage = new Promise(async (res) => {
        const data = await axios.get(
          `${host}/waInstance${localStorage.getItem(
            "idInstance"
          )}/receiveNotification/${localStorage.getItem("apiTokenInstance")}`
        );

        if (!data.data) return res("fe");

        const id = data.data.receiptId;
        if (data.data.body.messageData === undefined) {
          await axios.delete(
            `${host}/waInstance${localStorage.getItem(
              "idInstance"
            )}/deleteNotification/${localStorage.getItem(
              "apiTokenInstance"
            )}/${id}`
          );
          return res("fe");
        }
        let text;
        if (data.data.body.messageData.extendedTextMessageData.text)
          text = data.data.body.messageData.extendedTextMessageData.text;
        else text = data.data.body.messageData.textMessageData.textMessage;

        if (!text) {
          await axios.delete(
            `${host}/waInstance${localStorage.getItem(
              "idInstance"
            )}/deleteNotification/${localStorage.getItem(
              "apiTokenInstance"
            )}/${id}`
          )
          return res("fe");
        }else{
          await axios.delete(
            `${host}/waInstance${localStorage.getItem(
              "idInstance"
            )}/deleteNotification/${localStorage.getItem(
              "apiTokenInstance"
            )}/${id}`
          );
        }
        const obj = {
          text,
          whose: false,
          id,
        };
        dispatch(addMessage(obj));
        res('efe')
      }).then((data) => mainFunction());
    };
    mainFunction();
  }
);
const userChat = createSlice({
  name: "userChat",
  initialState,
  reducers: {
    writeName(state, action: PayloadAction<{ name: string; phone: string }>) {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },
    addMessage(state, action: PayloadAction<IArray>) {
      state.arr.unshift(action.payload);
      // state.arr = state.arr.filter(el => el.id !== action.payload.id)
      // console.log(state.arr)
    },
  },
});

export default userChat.reducer;
export const { writeName, addMessage } = userChat.actions;
