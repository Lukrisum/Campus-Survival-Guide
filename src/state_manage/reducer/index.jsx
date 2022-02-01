const initState = {
    count: 0,
}

const rootreducer = (state = initState, action) => {
    switch (action.type) {
        case 'send':
            return {
                count: state.count + 1,
            }
        default:
            return state;
    }
}

export default rootreducer;