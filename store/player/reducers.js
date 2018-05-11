import * as TYPES from "./types";

export const initialState = {
  station: {
    name: "",
    state: "",
    country: "",
    url: ""
  },
  error: null,
  hidden: true,
  playing: false,
  loading: false
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.PENDING:
      return { ...state, query: payload.query, loading: true };
    case TYPES.REJECTED:
      return { ...state, loading: false, error: payload.error };
    case TYPES.RESOLVED:
      return { ...state, loading: false, results: payload.results };
  }

  return state;
}
