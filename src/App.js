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
              title={x.title}
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

const Piece = ({
  createRenderer,
  title,
  id,
  isSelected,
  setSelected,
  frameRate,
}) => {
  const canvas = useRef()
  const renderer = useRef()

  useEffect(() => {
    renderer.current = createRenderer(canvas.current)
    renderer.current.renderStep(1 / frameRate)
  }, [createRenderer, frameRate])

  useEffect(() => {
    if (isSelected) {
      const intervalToken = setInterval(
        () => renderer.current.renderStep(1 / frameRate),
        1000 / frameRate
      )
      return () => clearInterval(intervalToken)
    }
  }, [isSelected, createRenderer, frameRate])

  return (
    <>
      <div>
        <div className='piece' onClick={() => setSelected(id)}>
          {<canvas ref={canvas} className='canvas' />}
        </div>
        <div>
          <h2
            className={
              isSelected ? 'piece-title piece-title-selected' : 'piece-title'
            }
          >
            {title}
          </h2>
          <div
            className={
              isSelected ? 'underline underline-selected' : 'underline'
            }
          />
        </div>
      </div>
    </>
  )
}

export default App
