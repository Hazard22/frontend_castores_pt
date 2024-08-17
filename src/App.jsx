import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import { Flex } from 'antd'

function App() {
  const [count, setCount] = useState(0)

  return (
      <LoginScreen/>
  )
}

export default App
