import React from 'react'
import { useGet, usePost } from './utils'

const urlDataBase = 'https://mymoney-a586c.firebaseio.com/movement/2020-10.json'

const App = () => {
  const data = useGet(urlDataBase)
  const data2 = useGet('https://httpbin.org/ip')
  const [postData, post] = usePost(urlDataBase)

  const save = () => {

  }

  return (
    <div>
      { data.loading && <p>Loading...</p> }
      { JSON.stringify(data.data) }
      <button onClick={save}>Salvar</button>
       <pre>{ JSON.stringify(data2) }</pre>
    </div>
  )
}

export default App