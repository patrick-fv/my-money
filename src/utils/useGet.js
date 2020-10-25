import { useReducer, useEffect } from 'react'
import axios from 'axios'
import { reducer, initialState } from './reducer'

const useGet = url => {
    const [data, dispatch] = useReducer(reducer, initialState)
    
    useEffect(() => {
        dispatch({ type: 'REQUEST' })
        
        axios.get(url)
            .then(res => {
              
                dispatch({
                    type: 'SUCCESS',
                    loading: false,
                    data: res.data
                })
            })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return data
}

export default useGet