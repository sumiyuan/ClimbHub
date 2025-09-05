import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import type { Session } from "@supabase/supabase-js"

const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
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

    const signupUser = async (email: string, password: string) => {
        try{
            const { data, error } = await supabase.auth.signUp({
                email:email.toLowerCase(),
                password,
            })

            if (error) {
                console.error("Error signing up: ", error);
                return { success: false, error: error.message }
            }

            return { success: true, data: data }
        }
        catch (error) {
            console.error("Error signing up: ", error);
            return { success: false, error: "Unknown error" }
        }
    }

    //signin logic
    const singinUser = async (email: string, password: string) => {
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email:email.toLowerCase(),
                password,
            })
    
            if (error) {
                console.error("Error signing in: ", error);
                return { success: false, error: error.message }
            }
            
            // There is no error signing in
            console.log("Signed in user: ", data);
            return { success: true, data: data }
        } catch (error) {
            console.error("Error signing in: ", error);
            return { success: false, error: "Unknown error" }
        }
    }

    //logout logic

    const logoutUser = async () => {
        try{
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error("Error logging out: ", error);
            }
        }
        catch (error) {
            console.error("Error logging out: ", error);
        }
    }

    return (
        <AuthContext.Provider value={{ session, singinUser, signupUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}