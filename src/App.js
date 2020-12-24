import React from 'react';
// npm i @emotion/react @emotion/core @emotion/styled
import styled from '@emotion/styled'
import {useCounter} from './hooks/useCounter'
import {useFetch} from './hooks/useFetch'
import logo from './logo.svg'

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`
const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 330px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .8s ease;

  :hover {
    cursor:pointer;
    background-size: 410px;
  }
  :disabled {
		background: #0e463f
	}
`
const ContenedorFrase = styled.div`
    padding: 3rem;
    margin: 1rem;
	border-radius: .5rem;
	background-color: #fff;
	max-width: 800px;

	@media (min-width: 992px;) {
		margin-top: 10rem;
	}

	h1 {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1.5rem;
        text-align: center;
        position: relative;
        padding-left: 4rem;

        &::before {
            content: open-quote;
            font-size: 6rem;
            color: black;
            position: absolute;
            left: -1rem;
            top: -2rem;
        }
    }
    p {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 1.4rem;
        font-weight:bold;
        text-align: right;
        color: #666;
        margin-top: 2rem;
    }
`
export const App = () => {
  const {counter, increment, decrement} = useCounter()
	const {loading, data} = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`)

	/*En el estado inicial del useFetch, la data esta en null, al usar doble negación
	la data pasa a ser un true, por lo tanto hay datos y procede la desestructuración
	de la posicion 0 de la data*/
	const {author, quote} = !!data && data[0]
	// console.log(data);
  // console.log(author, quote);

  return (
    <Contenedor >
      <img src={logo} alt="Breaking Bad" />
        <div>
            {
                loading ?
                    (
                      <ContenedorFrase>
                          <h1>Espere...</h1>
                      </ContenedorFrase>
                    )
                  :
                    (
                      <ContenedorFrase>
                          <h1>{quote}</h1>
                          <p>- {author}</p>
                      </ContenedorFrase>
                    )
            }
        </div>
        <div className="boton-container">
            {
                counter === 1 ?
                (
                  <Boton
                  onClick={increment}
                  >
                      Obtener Frase
                  </Boton>
                )
                  :
                (
                  <>
                    <Boton
                        onClick={decrement}
                    >
                        Frase Anterior
                    </Boton>
                    <Boton
                        onClick={increment}
                    >
                        Siguiente Frase
                    </Boton>
                  </>
                )
            }
      </div>
    </Contenedor>
  );
}

