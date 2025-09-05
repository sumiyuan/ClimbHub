import Signin from "./components/signin"
import { AuthProvider } from "./context/AuthContext"

const MainComp = () => {
  return (
    <div>
      <AuthProvider>
        <Signin />
      </AuthProvider>
    </div>
  )
}

export default MainComp