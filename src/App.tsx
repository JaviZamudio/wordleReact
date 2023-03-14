import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

type Color = 'green' | 'yellow' | 'darkGray' | 'lightGray'
function App() {
  const [word, setWord] = useState('')
  const [targetWord, setTargetWord] = useState("")
  const [keyboard, setKeyboard] = useState<{ letter: string, color: Color }[]>("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(letter => ({ letter, color: 'lightGray' })))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      console.log(word)
      setWord('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // word cant be more than 5 letters
    if (e.target.value.length > 5) {
      return
    }

    setWord(e.target.value.toUpperCase())
  }

  const getWord = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f5ebd356d8mshfb9c83c7a603a2ap1e7863jsn133d88196a3f',
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
      }
    };

    const response = await fetch('https://random-words5.p.rapidapi.com/getRandom?wordLength=5', options)
    const body: string = await response.text()
    setTargetWord(body.toUpperCase())
  }

  useEffect(() => {
    getWord()
  }, [])

  console.log(keyboard)

  return (
    <div className="App h-screen flex flex-col">
      <header className="App-header flex items-center bg-gray-200 p-3 border-b-darkGray border justify-center">
        <h1 className='text-4xl font-bold text-center'>
          Wordle
        </h1>
      </header>

      <div className="game-container flex flex-col flex-grow items-center justify-evenly">
        <div className="words-list">
          <div className="row word-container flex gap-2 mb-5">
            <div className="cell rounded-lg aspect-square h-14 flex justify-center items-center text-white text-2xl font-medium bg-darkGray">
              A
            </div>
            <div className="cell rounded-lg aspect-square h-14 flex justify-center items-center text-white text-2xl font-medium bg-green">
              B
            </div>
            <div className="cell rounded-lg aspect-square h-14 flex justify-center items-center text-white text-2xl font-medium bg-yellow">
              C
            </div>
            <div className="cell rounded-lg aspect-square h-14 flex justify-center items-center text-white text-2xl font-medium bg-darkGray">
              D
            </div>
            <div className="cell rounded-lg aspect-square h-14 flex justify-center items-center text-white text-2xl font-medium bg-green">
              E
            </div>
          </div>
          <div className="row word-container flex gap-2 mb-5">
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
          </div>
          <div className="row word-container flex gap-2 mb-5">
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
          </div>
          <div className="row word-container flex gap-2 mb-5">
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
          </div>
          <div className="row word-container flex gap-2 mb-5">
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
            <div className="cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md">
            </div>
          </div>

        </div>

        <div className="letters-container flex flex-wrap gap-2 absolute left-10 w-3/12 max-w-xs justify-center">
          <h2 className='text-2xl font-bold text-center w-full mb-2'>
            Letters
          </h2>
          {keyboard.map((letter, index) => (
            <div key={index} className={`letter rounded-lg h-12 w-10 flex justify-center items-center text-white text-xl font-medium bg-${letter.color}`}>
              {letter.letter}
            </div>
          ))}
        </div>

        <form className='input-container' onSubmit={handleSubmit}>
          {/* i want to autocapitalize all letters to uppercase */}
          <input type="text" name="word" id="word" value={word} onChange={handleWordChange} autoCorrect="off" className='border-solid border border-b-slate-700 bg-gray-200 py-2 px-4 rounded' autoComplete="off" placeholder='Enter a word!' autoFocus/>
          <button type="submit" className='bg-green text-white font-bold py-2 px-4 rounded mx-2'>
            Submit
          </button>
        </form>
      </div>


    </div>

  )
}

export default App
