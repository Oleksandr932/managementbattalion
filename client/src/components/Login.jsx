import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const { axios, setToken, navigate } = useAppContext()
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showLogin, setShowLogin] = React.useState(true);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(`/api/user/login-recruiterombr`, {
                name,
                email,
                password
            })
            if (data.success) {
                navigate('/owner')
                setToken(data.token)
                localStorage.setItem('token', data.token)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        (showLogin &&
            <div onClick={() => setShowLogin(false)} className='fixed top-0 left-0 right-0  
        bottom-0 z-100 flex text-sm text-gray-600 bg-black/50 items-center'>
                <form className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl 
            border border-gray-200 bg-white" onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()}>
                    <p className="text-2xl font-medium m-auto">
                        <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                    </p>

                    <div className="w-full ">
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                    </div>
                    <div className="w-full ">
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                    </div>

                    <button className="bg-primary hover:bg-primery-dull 
                transition-all text-white w-full py-2 rounded-md cursor-pointer">
                        {state === "register" ? "Create Account" : "Login"}
                    </button>
                </form>
            </div>
        )
    )
}

export default Login