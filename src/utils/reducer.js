
export const initialState = {
    loading: true,
    data: {}
}

export const reducer = (state, action) => {
    switch(action.type) {
      case 'REQUEST':
        return {
          ...state,
          loading: true
        }
      case 'SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.data
        }
      default:
        return state
    }

}
