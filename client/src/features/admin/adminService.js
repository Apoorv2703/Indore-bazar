import axios from "axios"

let API_URL = '/api/admin'

let fetchAllUsers = async(token) =>{

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        } 
    }
    
    

    let response = await axios.get(`${API_URL}/users` , options)
    console.log(response.data);
    
    return response.data
    
}

let fetchAllOrders = async(token) =>{
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    let response = await axios.get(`${API_URL}/orders` , options)
    return response.data
}

const fetchAllshops = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/shops`, options)
    return response.data
}

let updateUser = async(userDetails , token) =>{

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

   let response = await axios.put(`${API_URL}/users/${userDetails.userId}` , userDetails , options)

   return response.data
    

}


let updateShop = async(shopDetails , token) =>{

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

   let response = await axios.put(`${API_URL}/shops/${shopDetails.shopId}` , shopDetails , options)

   return response.data
    

}

let adminService = {fetchAllUsers , fetchAllOrders , fetchAllshops , updateShop , updateUser }

export default adminService