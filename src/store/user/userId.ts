import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//1101825831
//304f9c46ac664bbfbebbdaa4d077bf9ddc77b5f4cdce46cb9d



interface IInitialState {
  idInstance: string | null;
  apiTokenInstance: string | null;
}
const initialState: IInitialState = {
  idInstance: localStorage.getItem("idInstance") || null,
  apiTokenInstance: localStorage.getItem("apiTokenInstance") || null,
};

const host = "https://api.green-api.com";

export const checkUser = createAsyncThunk(
  "userId/checkUser",
  async (action: IInitialState, {dispatch}) => {
		try {
			await axios.get(`${host}/waInstance${action.idInstance}/getSettings/${action.apiTokenInstance}`);
			dispatch(changeData({idInstance : action.idInstance,apiTokenInstance:  action.apiTokenInstance}))
		} catch (error) {
			console.log('Пользователя не существует')
		}
  }
);
const userId = createSlice({
  name: "userId",
  initialState,
  reducers: {
		changeData(state, action: PayloadAction<IInitialState>){
			state.idInstance = action.payload.idInstance
			localStorage.setItem("idInstance", action.payload.idInstance || '0')
			state.apiTokenInstance = action.payload.apiTokenInstance
			localStorage.setItem("apiTokenInstance", action.payload.apiTokenInstance || '0')
		}
	},
});

export default userId.reducer
export const {changeData} = userId.actions