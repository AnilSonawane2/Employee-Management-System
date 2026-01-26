import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const userContext = createContext()
const authContext = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            try{
                const response = await axios.get('http://localhost:8000/api/auth/verify',{
                    header: {
                        "Authorization" : `Bearer ${token}`
                    }
                })
                if(response.data.success){
                    setUser(response.data.user)
                }
                else{
                    setUser(null)
                }
            }
            catch(error){
                if(error.response && !error.response.data.error){
                    setUser(null)
                }
            }
            finally{
                setLoading(false)
            }
        }
        verifyUser() // <-- to verify user
    })
    
    const login = (user) => {
        setUser(user)
    }

    const logout = () => {  // whenever we logout remove the token from localstorage
        setUser(null)
        localStorage.removeItem("token")
    }

  return (
    <userContext.Provider value={{user, login, logout, loading}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext)
export default authContext