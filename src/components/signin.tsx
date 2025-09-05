import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const signin = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSignin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        console.log("hey")

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <h1 className="text-2xl font-bold">Signin</h1>
            <p>Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link></p>
            <form onSubmit={handleSignin} className="flex flex-col gap-4">
                <input 
                    className="border-2 border-gray-300 rounded-md p-2"
                    type="email"
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                <input 
                    className="border-2 border-gray-300 rounded-md p-2"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Signin"}
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default signin
