export const types = {
  LOAD_QUESTION: 'index/LOAD_QIESTION'
}

const initState = {
  "great": undefined,
  "username": undefined,
  "que": undefined,
  "ansnum": undefined,
  "questionid": undefined
}

export default function commentAreaReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_QUESTION:
      const newState = action.value;
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

