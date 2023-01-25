import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
      status: false,
    },
    reducers: {
      openNewLeague: state => {
        state.status = "new-league";
      },
      openEditSettings: state => {
        state.status = "edit-settings";
      },
      closeModal: state => {
        state.status = false
      }
    }
  })


// Action creators are generated for each case reducer function
export const { openNewLeague, openEditSettings, closeModal } = modalSlice.actions
export default modalSlice.reducer