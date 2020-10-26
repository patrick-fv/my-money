import React from 'react'

const AddMonth = () => {
    return (
        <React.Fragment>
            <h2>Adicionar mês</h2>
            <select>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
            </select>
            <select>
                <option value="01">01</option>
                <option value="02">02</option>
            </select>
        </React.Fragment>
    )
}

export default AddMonth
