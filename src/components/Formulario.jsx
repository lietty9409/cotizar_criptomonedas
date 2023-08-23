import {useEffect, useState} from 'react'
import {monedas} from '../data/monedas'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import styled from '@emotion/styled'

const Formulario = ({setMonedas}) => {
    const[criptos,setCriptos] = useState([])
    const[error,setError] = useState(false)

    const[ moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const[ criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu criptomoneda', criptos)

    useEffect( () => {
      const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const arregloCriptos = resultado.Data.map( cripto => {
          const objeto = {
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName
          }
          return objeto
        })

        setCriptos(arregloCriptos)
      }

      consultarAPI();
    },[])

    const handleSubmit = (e) => {
      e.preventDefault()

      if([moneda,criptomoneda].includes('')){
        setError(true)
        return
      }

      setError(false)
      setMonedas({
        moneda,
        criptomoneda
      })
    }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form 
        onSubmit = {handleSubmit}
        >
        <SelectMonedas/>

        <SelectCriptomoneda/>
        
        <InputSubmit 
          type='submit' 
          value='Cotizar'
        />
      </form>
    </>
  )
}

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    margin-top:30px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }

`

export default Formulario
