import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {email, password});
      console.log(response.data)

      setEmail('')
      setPassword('')
      setError(null)

      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if(response.data.user.role === "admin"){
          navigate("/admin-dashboard")
        }
        else{
          navigate("/employee-dashboard")
        }

        // alert(`Successfully Login`)
      }
    } 
    catch (error) {
      if(error.response && !error.response.data.success){
        setError(error.response.data.error)
      }
      else{
        setError("Server Error")
      }
    }
  }

  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-r from-[#ff9068] to-[#ff4b1f] to-50% space-y-6'>
      <h2 className='text-4xl font-bold text-white text-center'>Employee Management System</h2>
        <div className='border shadow p-6 w-80 bg-white rounded-3xl'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                  <label htmlFor="email" className='block text-gray-700 font-semibold'>Email</label>
                  <input type="email"                             /* email input */
                    placeholder='Enter Email' 
                    className='w-full px-3 py-2 border border-orange-400 rounded-lg'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
              </div>
              <div className='mb-4'>
                <label htmlFor="password" className='block text-gray-700 font-semibold'>Password</label>
                <input type="password"                            /*  password input */
                  placeholder='Enter Password' 
                  className='w-full px-3 py-2 border rounded-lg border-orange-400'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <label className='inline-flex items-center'>
                  <input type="checkbox" className='form-checkbox'/>
                  <span className='ml-2 text-gray-700'>Remember me</span>
                </label>
                <a href="#" className='text-teal-600'>Forget Password?</a>
              </div>
              <div className='mb-4'>
                <button type='submit' className='w-full bg-[#ff4b1f] text-white py-2 rounded-xl font-bold'>Login</button> 
              </div>
          </form>
        </div>
    </div>
  )
}

export default Login