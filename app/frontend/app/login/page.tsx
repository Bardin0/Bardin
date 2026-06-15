import Image from 'next/image';
import TextInput from '../components/TextInput/TextInput.component.tsx';
import ButtonGlow from '../components/ButtonGlow/ButtonGlow.tsx';

export default function LoginPage() {

    return (
        <div className="p-1 m-1 flex flex-col h-full w-full">
            <div className="flex flex-row">
                <Image 
                    src="/logo-text-transparent.png" 
                    alt="Bardin Logo"
                    width={200}
                    height={0}
                    className="h-auto"
                />
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full">
                <h1 className="text-[var(--text-primary)] text-3xl ">Login</h1>
                <form method="POST" action="/api/auth/login" className="flex flex-col justify-center items-center">
                    <TextInput required sensitive={false} placeholder='Username'/>     
                    <TextInput required sensitive placeholder='Password'/> 
                    <ButtonGlow text="Sign In" type="submit"/>
                </form>
            </div>
        </div>
    );

}
