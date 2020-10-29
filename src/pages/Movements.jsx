import React, { useState } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-a586c.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

const Movements = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const [postData, save] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, remove] = useDelete()
    const [describe, setDescribe] = useState('')
    const [value, setValue] = useState(0.0)

    const onChangeDescribe = ({ target }) => {
        setDescribe(target.value)
    }
    const onChangeValue = ({ target }) => {
        setValue(target.value)
    }
    const saveMovement = async () => {
        if(value && describe.length) {
            await save({
                descricao: describe,
                valor: parseFloat(value)
            })
            setDescribe('')
            setValue(0.0)
            data.refetch()
        }
    }
    const removeMovement = async id => {
        await remove(`movimentacoes/${match.params.data}/${id}`)
        data.refetch()
    }
    
    return (
      <div>
        <h1>Movimentações</h1>
        {data.loading && <div>Carregando...</div>}
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col" className="text-right">Valor</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.data && Object.keys(data.data).map(each => {
                        return (
                            <tr key={each}>
                                <th>{data.data[each].descricao}</th>
                                <th className="text-right">{data.data[each].valor}
                                <button className="btn btn-danger ml-2" onClick={() => removeMovement(each)}>-</button>
                                </th>
                            </tr>
                        )
                    })
                }
                <tr>
                    <th>
                        <input type="text" value={describe} onChange={onChangeDescribe}/>
                    </th>
                    <th>
                        <input type="number" value={value} onChange={onChangeValue}/>
                        <button className="btn btn-success ml-2" onClick={saveMovement}>+</button>
                    </th>
                </tr>
            </tbody>
        </table>
      </div>
    )
}

export default Movements