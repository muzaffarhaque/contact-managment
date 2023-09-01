import {createSlice} from "@reduxjs/toolkit";
const initialState : any = [];
const ContactSlice = createSlice({
    name: "GrContactInfo",
    initialState,
    reducers: {
        add: (state, action) => {
            state.push(action.payload)
        },
        remove: (state, action) => {
            // console.log("action in Edit", state);
            return state.filter((item : any) => item.uuid !== action.payload);
        },
        update: (state, action) => {
            const { data, id } = action.payload;
            const updatedIndex = state.findIndex((item:any) => item.uuid === id);
            if (updatedIndex !== -1) {
                const updatedItem = { ...state[updatedIndex], ...data };
                state[updatedIndex] = updatedItem;
            }
            return state;
        }
        

    }

})

export const {
    add,
    remove,
    update
} = ContactSlice.actions;
export default ContactSlice.reducer;