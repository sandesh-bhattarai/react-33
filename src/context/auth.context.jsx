import { createContext, useEffect, useState } from "react";
import authSvc from "../pages/auth/auth.service";
import { Spinner } from "flowbite-react";

const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true);
    const loggedInUser = async() => {
        try {
            const response = await authSvc.getLoggedInUser()
            setUser(response)
        } catch(exception) {
            // 
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loggedInUser()
    },[])

    if(loading) {
        return <AuthContext.Provider  value={{user: null, setUser: setUser}}>
            <div className="h-[100vh] flex items-center justify-center">
                <Spinner size="xl" color="success" aria-label="Default status example" />;
            </div>
        </AuthContext.Provider>
    } else {
        return (<>
            <AuthContext.Provider  value={{
                user, 
                setUser
            }}>
                {children}
            </AuthContext.Provider>
        </>)
    }

    
}

export default AuthContext