
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]`~<>/"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])



return (
  <>
    <h1 className='text-4xl text-white bg-green-400 p-4 rounded-xl'>Password Generator</h1>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-teal-400'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'><input type="text" className='outline-none w-full py-1 px-3 my-3' value={password} placeholder='password' readOnly ref={passwordRef} />

        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-.05 shrink-0 my-3'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 my-3'>
          <input className='cursor-pointer' type="range" min={8} max={25} value={length} onChange={(e) => { setLength(e.target.value) }} />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 my-3'>
          <input type="checkbox" id="numberInput" defaultChecked={numAllowed} onChange={() => {
            setNumAllowed((prev) => !prev);
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1 my-3' >
          <input type="checkbox" id="charInput" defaultChecked={charAllowed} onChange={() => {
            setCharAllowed((prev) => !prev);
          }} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>

    </div>
  </>
)
}

export default App
