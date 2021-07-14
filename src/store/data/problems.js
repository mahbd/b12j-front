import {
  basicActions,
  basicReducers,
  standardInitialState,
  receivedWithPagination,
  updatedWithPagination
} from "../basicReducerTemplate";
import {createSlice} from "@reduxjs/toolkit";
import {apiCallBegan} from "../api";

const name = 'problem';

const slice = createSlice({
  name: `${name}s`,
  initialState: {
    ...standardInitialState(),
    fetchedContests: {},
    contestList: [],
  },
  reducers: {
    ...basicReducers(name),
    [`${name}sReceived`]: (state, action) => {
      receivedWithPagination(state, action);
    },
    [`${name}Updated`]: (state, action) => {
      updatedWithPagination(state, action);
    },
    contestProblemsReceived: (state, action) => {
      state.loading = false;
      const contestId = parseInt(action.payload.contest_id);
      state.fetchedContests[contestId] = Date.now();
      state.contestList[contestId] = []
      state.dict[contestId] = {}
      const {problems} = action.payload;
      for (let i = 0; i < problems.length; i++) {
        state.dict[problems[i].id] = problems[i];
        state.contestList[contestId].push(problems[i].id)
      }
    }
  }
});
export default slice.reducer;

export class problemActions extends basicActions {
  constructor(store, ws) {
    super(slice, store, ws, name);
    this.contestProblemsReceived = slice.actions['contestProblemsReceived'];
    this.pendingContests = {}
  }

  getList = (page = 1) => {
    page = parseInt(page);
    this._loadSection(`/problems/?limit=20&offset=${(page - 1) * 20}`, page);
    return this.list(this.store.getState()[`${name}s`].list[page]);
  }

  _loadContestProblems = (contestId) => {
    const url = `/problems/contest_problems/?contest_id=${contestId}`;
    if (this.store.getState()[`${this.name}s`].fetchedContests[contestId] || this.pendingContests[contestId]) return;
    this.pendingContests[contestId] = Date.now()
    this.store.dispatch(apiCallBegan({
      url: url,
      onStart: this.requested.type,
      onSuccess: this.contestProblemsReceived.type,
      onFailed: this.requestFailed.type,
    }));
  }

  contestProblems = (contestId = 1) => {
    contestId = parseInt(contestId);
    this._loadContestProblems(contestId);
    return this.list(this.store.getState()[`${name}s`].contestList[contestId]);
  }

  totalPages = () => {
    return this.store.getState()[`${name}s`].total;
  }
}
