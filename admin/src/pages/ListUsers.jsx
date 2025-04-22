import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const ListUsers = ({token}) => {
   
  const [users, setUsers] = useState([]);

  const fetchListUsers = async () => {
    try {

        const response = await axios.get(backendUrl + '/api/user/list', {
            headers: {
              token: token
            }
          });
          
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeUser = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/user/remove', {id}, {headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchListUsers();
      } else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchListUsers()
  },[])


  return (
      <>
        <p className='mb-2'>List Users</p>
        <div className='flex flex-col gap-2'>
            {/* ------------List Table Title----------- */}
  
            <div className='hidden md:grid grid-cols-[1fr_2fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
              <b>User</b>
              <b>Name</b>
              <b>Email</b>
              <b>Action</b>
            </div>
  
            {/* -----------Users List---------- */}
  
            {
              users.map((user,index) => (
                <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_3fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                  <img className='w-6 ' src={assets.profile_icon} alt="" />
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p onClick={()=>removeUser(user._id)} className='cursor-pointer text-lg'>X</p>
                </div>
              ))
            }
        </div>
      </>
    )
}

export default ListUsers
