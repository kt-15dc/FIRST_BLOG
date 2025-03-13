import { useState } from 'react'
import './App.css'
import Button from './components/ui/button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center">
      <header className="App-header">
        <h1>Hello, world!</h1>
        <p>
          <button onClick={() => setCount(count + 1)}>Click me</button>
        </p>
        <p>You clicked the button {count} times</p>
      </header>
      <Button>Click me</Button>
    </div>

  )
}

export default App
