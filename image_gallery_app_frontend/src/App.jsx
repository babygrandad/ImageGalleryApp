import { useState } from 'react'
import './App.css'
import LoginRegister from './Components/LoginRegister/LoginRegister'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LoginRegister />
    </div>
  )
}

export default App
