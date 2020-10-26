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
        
        useEffect(() => {
            dispatch({ type: 'REQUEST' })
            
            axios.get(baseURL + resource + '.json')
                .then(res => {
                  
                    dispatch({
                        type: 'SUCCESS',
                        loading: false,
                        data: res.data
                    })
                })
        
        }, [resource])
    
        return data
    }

    const useDelete = () => {
        const [data, dispatch] = useReducer(reducer, initialState)
    
        const remove = resource => {
            dispatch({ type: 'REQUEST' })
            axios.delete(baseURL + resource + '.json')
                .then(res => {
                    dispatch({
                        type: 'SUCCESS',
                    })
                })
        }

        return [data, remove]
    }

    const usePost = resource => {
        const [data, dispatch] = useReducer(reducer, initialState)
    
        const post = data => {
            dispatch({ type: 'REQUEST' })
            axios.post(baseURL + resource + '.json', data)
                .then(res => {
                    dispatch({
                        type: 'SUCCESS',
                        loading: false,
                        data: res.data
                    })
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