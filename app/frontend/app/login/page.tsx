"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitEvent, useState } from 'react';
import TextInput from '../components/TextInput/TextInput.component';
import ButtonGlow from '../components/ButtonGlow/ButtonGlow';

export default function LoginPage() {
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');

        const formData = new FormData(event.currentTarget);
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password'),
            }),
        });

        if (!response.ok) {
            setError('Unable to sign in. Check your username and password.');
            return;
        }

        router.push('/admin');
    }

    return (
        <div className="p-1 m-1 flex flex-col h-full w-full">
            <div className="flex flex-row">
                <Image 
                    src="/logo-text-transparent.png" 
                    alt="Bardin Logo"
                    width={200}
                    height={100}
                    className="h-auto"
                />
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full">
                <h1 className="text-[var(--text-primary)] text-3xl ">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                    <TextInput name="username" required sensitive={false} placeholder='Username'/>     
                    <TextInput name="password" required sensitive placeholder='Password'/> 
                    <ButtonGlow text="Sign In" type="submit"/>
                </form>
            </div>
            {error && <p className="text-red-500" role="alert">{error}</p>}
        </div>
    );
}
