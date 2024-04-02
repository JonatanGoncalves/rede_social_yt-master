"use client"

import AuthInput from '@/components/AuthInput';
import Link from "next/link";
import { useState, useContext } from "react";
import { makeRequest } from '../../../../axios';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';

function Login() { //Commit Main

        const [email, setEmail]=useState('teste@email.com');
        const [password, setPassword]=useState('teste');
        const [error, setError] = useState('');
        const {setUser} = useContext(UserContext);

        const router = useRouter();


    const handleLogin = (e:any)=>{
        e.preventDefault();
        makeRequest
        .post("auth/login", {email, password}).then((res)=>{
            localStorage.setItem("rede-social-yt:user", JSON.stringify(res.data.user));
            setUser(res.data.user)
            setError('')
            router.push('/main')
        }).catch((err)=> {
            console.log(err);
            setError(err.response.data.msg)
        })
    }

    return (
        <>
                <h1 className="font-bold text-2xl">LOGIN</h1>
                <AuthInput label="Email:" newState={setEmail} />
                <AuthInput label="Password" newState={setPassword} IsPassword />
                {error.length > 0 && <span className="text-red-600">* {error}</span>}
                <button className="bg-green-600 py-3 font-bold text-white rounded-lg hover:bg-green-800" onClick={(e)=> handleLogin(e)}>ENTRAR</button>
                <Link href="/register" className="text-center underline">Cadastrar-se</Link>
        </>  
    );
}

export default Login;













