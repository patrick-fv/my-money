import Rest from './rest'

const baseURL = 'https://mymoney-a586c.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Months = () => {
    const data = useGet('meses')

    if(data.loading) { 
        return <span>Carregando...</span>
    }

    return (
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Mês</th>
                    <th scope="col">Previsão entrada</th>
                    <th scope="col">Entrada</th>
                    <th scope="col">Previsão saída</th>
                    <th scope="col">Saída</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(data.data).map(each => {
                        return (
                            <tr>
                                <th scope="col">{each}</th>
                                <th>{data.data[each].previsao_entrada}</th>
                                <th>{data.data[each].entrada}</th>
                                <th>{data.data[each].previsao_saida}</th>
                                <th>{data.data[each].saida}</th>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Months