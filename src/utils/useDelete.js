import { useReducer } from 'react'
import axios from 'axios'
import { reducer, initialState } from './reducer'

const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, initialState)

    const remove = url => {
        dispatch({ type: 'REQUEST' })
        axios.delete(url)
            .then(res => {
                dispatch({
                    type: 'SUCCESS',
                })
            })
    }
    return [data, remove]
}

export default useDelete