import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAuthStatus = () => {
  let {user} = useSelector(state => state.auth )

  let [isAuthenticated , setIsAuthenticated] = useState(false)
  let [checkAuthentication , setCheckAuthentication] = useState(true)

 useEffect(()=>{
     user ? setIsAuthenticated(true) : setIsAuthenticated(false)
  setCheckAuthentication(false) 

 },[user])

 return {isAuthenticated , checkAuthentication}
}

export default useAuthStatus
