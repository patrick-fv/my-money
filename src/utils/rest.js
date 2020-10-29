import { useReducer, useEffect } from 'react'
import axios from 'axios'

const initialState = {
    loading: true,
    data: {}
}

const reducer = (state, action) => {
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

const init = baseURL => {
    const useGet = resource => {
        const [data, dispatch] = useReducer(reducer, initialState)
        const load = async () => {
            dispatch({ type: 'REQUEST' })
            const res = await axios.get(baseURL + resource + '.json')
            dispatch({ type: 'SUCCESS', data: res.data })
        }
        
        useEffect(() => {
            load()
        }, [resource])
    
        return {
            ...data,
            refetch: load
        }
    }

    const useDelete = () => {
        const [data, dispatch] = useReducer(reducer, initialState)
    
        const remove = async resource => {
            dispatch({ type: 'REQUEST' })
            await axios.delete(baseURL + resource + '.json')
            dispatch({
                type: 'SUCCESS',
            })
        }

        return [data, remove]
    }

    const usePost = resource => {
        const [data, dispatch] = useReducer(reducer, initialState)
    
        const post = async data => {
            dispatch({ type: 'REQUEST' })
            const res = await axios.post(baseURL + resource + '.json', data)    
            dispatch({
                type: 'SUCCESS',
                loading: false,
                data: res.data
            })
                
        }

        return [data, post]
    }

    return {
        useGet,
        usePost,
        useDelete
    }
}

export default init