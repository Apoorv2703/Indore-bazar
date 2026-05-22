import React from 'react'
import useAuthStatus from '../hooks/useAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponents = () => {
  
    let {isAuthenticated , checkAuthentication} = useAuthStatus()

    if(checkAuthentication){
        return (
            <h1>Checking USer ...</h1>
        )
    }

    return isAuthenticated ? <Outlet/> : <Navigate to={"/login"} />
}

export default PrivateComponents
