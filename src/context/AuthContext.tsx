import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState(undefined)
    //initial setup logic
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    //signup logic

    //signin logic
    const singinUser = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email:email.toLowerCase(),
            password,
        })

        if (error) {
            console.error("Error signing in: ", error);
            return { success: false, error: error.message }
        }
        return { success: true, data: data }
    }

    }

    //logout logic

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}