import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Rest from './utils/rest'
import { Home, Movements } from './pages'
import { Header } from './elements'

const baseURL = 'https://mymoney-a586c.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

const App = () => {
  const data = useGet('months')
  const data2 = useGet('https://httpbin.org/ip')
  const [postData, post] = usePost('movement/2020-10')
  const [deleteData, remove] = useDelete()

  const save = () => {
  }

  const doRemove = () => {
  }

  return (
    <BrowserRouter>
    <Header />
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/movimentacoes/:data" exact component={Movements} />
      </div>
    </BrowserRouter>
  )
}

export default App