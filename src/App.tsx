import { useEffect, useRef, useState } from 'react'
import gitHubLogo from './assets/github-mark.png'
import './App.css'

type Color = 'green' | 'yellow' | 'darkGray' | 'lightGray'

const Cell = ({ letter, color }: { letter: string, color: Color }) => {
  return (
    <div className={letter === '' ?
      `cell aspect-square h-14 flex justify-center items-center border-solid border border-slate-700 rounded-md` :
      `cell rounded-lg aspect-square h-14 flex justify-center items-center text-white text-2xl font-bold bg-${color}`
    }>
      {letter}
    </div>
  )
}

const Row = ({ letters, colors }: { letters: string[], colors: Color[] }) => {
  return (
    <div className="row word-container flex gap-2 mb-5">
      {letters.map((letter, index) => <Cell letter={letter} color={colors[index]} />)}
    </div>
  )
}

function App() {
  const numTrials = 5, wordLength = 5
  const [userWord, setUserWord] = useState('')
  const [targetWord, setTargetWord] = useState("")
  const [wordsList, setWordsList] = useState<({ letter: string, color: Color }[] | null)[]>([])
  const [keyboard, setKeyboard] = useState<{ letter: string, color: Color }[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault()

    if (userWord.length !== wordLength) {
      return alert('Word must be 5 letters long!')
    }

    try {
      const tryIndex = wordsList.findIndex(word => word === null)
      const newKeyboard = [...keyboard]

      // Current word to 'push' to wordsList
      const currentWord = userWord.split('').map((letter, index) => {
        let color: Color = 'darkGray'

        if (letter === targetWord[index]) {
          color = 'green'
        }
        else if (targetWord.includes(letter)) {
          color = 'yellow'
        }

        // Update keyboard if letter hasn't been used yet
        const letterIndex = newKeyboard.findIndex(key => key.letter === letter)
        if (letterIndex !== -1 && newKeyboard[letterIndex].color !== 'green') {
          newKeyboard[letterIndex].color = color
        }

        return { letter, color }
      })

      const newWordsList = [...wordsList]
      newWordsList[tryIndex] = currentWord
      setWordsList(newWordsList)
      setKeyboard(newKeyboard)

      setTimeout(() => {
        if (userWord === targetWord) {
          alert('You win!\n The word was: ' + targetWord)
          initialize()
        } else if (tryIndex === numTrials - 1) {
          alert('You lose!\n The word was: ' + targetWord)
          initialize()
        }
      }, 500);

      setUserWord('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // word cant be more than 5 letters
    if (e.target.value.length > 5) {
      return
    }

    setUserWord(e.target.value.toUpperCase())
  }

  async function getWord() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f5ebd356d8mshfb9c83c7a603a2ap1e7863jsn133d88196a3f',
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
      }
    }

    const response = await fetch(`https://random-words5.p.rapidapi.com/getRandom?wordLength=${wordLength}`, options)
    const body: string = await response.text()

    // const body = 'hello'
    setTargetWord(body.toUpperCase())
  }

  async function initialize() {
    getWord()
    setWordsList(Array(numTrials).fill(null))
    setKeyboard("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(letter => ({ letter, color: 'lightGray' })))
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <div className="App h-screen flex flex-col">
      <header className="App-header flex items-center bg-gray-200 p-3 border-b-darkGray border justify-center">
        <h1 className='text-4xl font-bold text-center'>
          Wordle
        </h1>
      </header>

      {/* <p className='absolute top-5 right-5'>By<a href="https://github.com/JaviZamudio" target="_blank" rel="noreferrer" className='text-blue-500 ml-1'> Javi Zamudio</a></p> */}

      <div className="game-container flex flex-col flex-grow items-center justify-evenly">
        <div className="words-list">
          {wordsList.map((word, index) => {
            return (
              <div key={index} className="row word-container flex gap-2 mb-5">
                {
                  word ?
                    word.map((letter, index) => <Cell key={index} letter={letter.letter} color={letter.color} />) :
                    Array(5).fill(null).map((_, index) => <Cell key={index} letter={''} color="lightGray" />)
                }
              </div>
            )
          })}
        </div>

        <div className="letters-container flex flex-wrap gap-2 absolute left-10 w-3/12 max-w-xs justify-center">
          <h2 className='text-2xl font-bold text-center w-full mb-2'>
            Letters
          </h2>
          {keyboard.map((letter, index) => (
            <div key={index} className={`letter rounded-lg h-12 w-10 flex justify-center items-center text-white text-xl font-medium bg-${letter.color} cursor-pointer active:bg-slate-300 hover:bg-slate-400`}
              onClick={() => {
                handleWordChange({ target: { value: userWord + letter.letter } } as React.ChangeEvent<HTMLInputElement>)
              }}>
              {letter.letter}
            </div>
          ))}
          <div className='actions flex gap-2 w-full justify-center mt-2'>
            <div className={`letter rounded-lg h-12 w-16 flex justify-center items-center text-white text-xl font-medium bg-slate-500 cursor-pointer active:bg-slate-300 hover:bg-slate-400`}
              onClick={() => {
                handleWordChange({ target: { value: userWord.slice(0, -1) } } as React.ChangeEvent<HTMLInputElement>)
              }}>
              {'<-'}
            </div>

            <div className={`letter rounded-lg h-12 w-16 flex justify-center items-center text-white text-xl font-medium bg-slate-500 cursor-pointer active:bg-slate-300 hover:bg-slate-400`}
              onClick={() => {
                console.log('ok')
                handleSubmit(null as unknown as React.FormEvent<HTMLFormElement>)
              }}>
              {'OK'}
            </div>
          </div>
        </div>

        <form className='input-container' onSubmit={handleSubmit}>
          {/* i want to autocapitalize all letters to uppercase */}
          <input type="text" name="word" id="word" value={userWord} onChange={handleWordChange} autoCorrect="off" className='border-solid border border-b-slate-700 bg-gray-200 py-2 px-4 rounded' autoComplete="off" placeholder='Enter a word!' autoFocus />
          <button type="submit" className='bg-green text-white font-bold py-2 px-4 rounded mx-2'>
            Submit
          </button>
        </form>
      </div>

      {/* view on github */}
      <a href="https://github.com/JaviZamudio/wordleReact" target="_blank" rel="noreferrer" className='absolute bottom-5 right-5 flex items-center'>
        <p className='text-sm'>View on GitHub</p>
        <img src={gitHubLogo} alt="github logo" className='w-6 h-6 mx-2' />
      </a>


    </div>

  )
}

export default App
