export const types = {
  LOAD_QUESTION: 'index/LOAD_QIESTION'
}

const initState = {
  "great": 0,
  "username": "001",
  "que": "1+1=?",
  "ansnum": 2,
  "questionid": 1
}

export default function commentAreaReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_QUESTION:
      const { a, ...newState } = action;
      return newState;
    default:
      return state;
  }
}

export const actions = {
  loadCommentArea: (questionMsg) => {
    return {
      type: types.LOAD_QUESTION,
      value: questionMsg,
    };
  }
}
