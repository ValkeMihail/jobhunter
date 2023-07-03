
import './App.css'
import { AuthProvider } from './AuthContext'
import { AppContainer } from './containers/AppContainer'



function App() {
  return (
    <AuthProvider>  
      <AppContainer/>
    </AuthProvider>
  )
}

export default App
