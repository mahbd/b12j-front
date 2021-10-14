import { basicActions, basicReducers, receivedWithPagination, standardInitialState } from "../basicReducerTemplate";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const name = "contest";

const slice = createSlice({
   name: `${name}s`,
   initialState: {
      ...standardInitialState(),
   },
   reducers: {
      ...basicReducers(name),
      contestsReceived: (state, action) => {
         receivedWithPagination(state, action);
      },
   },
});

export default slice.reducer;

export class contestActions extends basicActions {
   constructor(store, ws) {
      super(slice, store, ws, name);
   }

   getList = (page = 1) => {
      page = parseInt(page);
      const contestList = createSelector(
        () => this.store.getState()[`${name}s`].list[page],
        contests => this.list(contests)
      )()
      if (contestList.length === 0) {
         this._loadSection(`/contests/?limit=20&offset=${(page - 1) * 20}`, page);
      }
      return contestList;
   };

   getAllList = () => {
      let fullList = [];
      for (let i = 1; i <= this.totalPages(); i++) {
         fullList = [...fullList, ...this.getList(i)];
      }
      return fullList;
   };

   totalPages = () => {
      return this.store.getState()[this.name + "s"].total | 1;
   };
}
