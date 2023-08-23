import styled from "@emotion/styled"


const Error = ({children}) => {
  return (
    <Texto>
      {children}
    </Texto>
  )
}

const Texto = styled.div`
    background-color: #c02b24;
    color: #FFF;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
    `

export default Error
