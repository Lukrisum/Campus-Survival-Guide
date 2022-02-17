export const types = {
  LOAD_LIFE: 'module_0/LOAD_KNOWLEDGE',
  LOAD_STUDY: 'module_0/LOAD_KNOWLEDGE',
  LOAD_NEW: 'module_0/LOAD_KNOWLEDGE',
  LOAD_ADMIN: 'module_0/LOAD_KNOWLEDGE'
}

const initState = {
  url: 'http://120.77.8.223:88/apdel_que'  //返回404
}

export default function KnowledgeSortReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_QUESTION:
      const newState = action.value;
      return newState;
    case types.LOAD_QUESTION:
      const newState = action.value;
      return newState;
    case types.LOAD_QUESTION:
      const newState = action.value;
      return newState;
    case types.LOAD_QUESTION:
      const newState = action.value;
      return newState;
    case types.LOAD_QUESTION:
      const newState = action.value;
      return newState;
    default:
      return state;
  }
}
