import { useEffect, useRef, useState } from 'react'
import { getPieces } from './pieces/pieces'

const App = () => {
  const [selected, setSelected] = useState()

  return (
    <>
      <div className='title'>
        <div className='light-circle' />
        <div className='dark-circle' />
        <h1 className='stylized'>Caelum Gallery</h1>
      </div>
      <div className='gallery'>
        {getPieces().map((x, i) => {
          return (
            <Piece
              createRenderer={x.createRenderer}
              id={i}
              isSelected={selected === i}
              setSelected={setSelected}
              frameRate={60}
            />
          )
        })}
      </div>
    </>
  )
}

// TODO framerate independance via deltaTime
const Piece = ({ createRenderer, id, isSelected, setSelected, frameRate }) => {
  const canvas = useRef()

  useEffect(() => {
    if (isSelected && createRenderer) {
      const renderer = createRenderer(canvas.current)
      const intervalToken = setInterval(
        () => renderer.renderStep(1 / frameRate),
        1000 / frameRate
      )
      return () => clearInterval(intervalToken)
    }
  }, [isSelected, createRenderer, frameRate])

  return (
    <>
      <div
        className={isSelected ? 'piece piece-selected' : 'piece'}
        onClick={() => setSelected(id)}
      >
        {isSelected ? (
          <canvas ref={canvas} className='canvas' />
        ) : (
          <img className='preview' alt='digital art'></img>
        )}
      </div>
    </>
  )
}

export default App
