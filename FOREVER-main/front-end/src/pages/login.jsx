import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const login = () => {

   const [currentState,setCurrentState] = useState('Sign Up');
const { token ,setToken,navigate, backendUrl,fetchCartFromDB} = useContext(ShopContext);
const [name,setName] = useState('');
const [password,setPassword] = useState('');
const [email,setEmail] = useState('');
  
   const onSubmitHandler = async (e) => {
         e.preventDefault();
         try{

            if(currentState === 'Sign Up'){
                 
              const response = await axios.post(backendUrl + '/api/user/register',{name,email,password});
            
              if(response.data.status){
        setToken(response.data.token)
                 localStorage.setItem('token',response.data.token);
                 localStorage.setItem('email',email);
                await fetchCartFromDB(email);

                                navigate('/');
              }else{
                toast.error(response.data.message);
              }
              

            }else {
                 
              const response = await axios.post(backendUrl + '/api/user/login',{email,password},{"token":token});
           console.log(response);
           
              if(response.data.status){
                setToken(response.data.token)
                 localStorage.setItem('token',response.data.token);
                 localStorage.setItem('email',email);
                await fetchCartFromDB(email);

                                navigate('/');

              }else{
                       toast.error(response.data.message);

              }



            }

         }catch(err){
               console.log(err);
               toast.error(err.message)
               
         }
         
   }

   useEffect(()=>{
     if(token){
      navigate('/');
     }       

   },[token])


  return (
    <div>
    <Navbar />
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
             <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                  <p className='prata-regular text-3xl'>{currentState}</p>
                 <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
              </div>
             {currentState === 'Login' 
             ? '' 
             : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name' required/>} 
              <input onChange={(e)=> setEmail (e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Email' required/>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Password' required/>
             <div className='w-full flex justify-between text-sm mt-[-8px]'>
                         <p className='cursor-pointer'>Forgot Your Password?</p>
                       {
                        currentState === 'Login' 
                        ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
                        : <p onClick={()=> setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
                       }
             </div>
             <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
    <Footer />
    </div>
  )
}

export default login
