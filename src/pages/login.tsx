import React, { type FormEvent } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {

    const { data: sessionData, status: sessionStatus } = useSession();
    const router = useRouter();

    const handleLogin = async (provider: string) => {
        const callbackUrl = router.query.callbackUrl || '/';
        await signIn(provider, { callbackUrl: callbackUrl as string });
    };

    const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
        const callbackUrl = router.query.callbackUrl || '/';
        await signIn('email', { email: email.value, callbackUrl: callbackUrl as string });
    };

    if (sessionStatus == "loading") {
        return <div>Loading...</div>;
    }

    if (sessionStatus == "authenticated") {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="max-w-md p-6 bg-white rounded-lg shadow">
                    <h1 className="text-3xl font-semibold text-center">Welcome, {sessionData?.user.name}!</h1>
                    <p className="text-center mt-4">You are already logged in.</p>
                    <button
                        onClick={() => void signOut()}
                        className="btn btn-danger mt-6 w-full"
                    >
                        Log out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center">
            <div className="max-w-xl w-full p-10 bg-base-100 rounded-xl shadow-lg">
                <div className="space-y-6">
                    <h1 className="text-4xl font-semibold text-center text-indigo-900">Login</h1>
                    <div className="space-y-2">
                        <button
                            onClick={() => void handleLogin('google')}
                            className="btn btn-ghost btn-primary btn-lg w-full flex items-center justify-center space-x-2 border-2 border-blue-500 hover:bg-opacity-10 hover:bg-blue-500"
                        >
                            <FcGoogle />
                            <span>Login with Google</span>
                        </button>
                        <button
                            onClick={() => void handleLogin('github')}
                            className="btn btn-ghost btn-dark btn-lg w-full flex items-center justify-center space-x-2 border-2 border-gray-800 hover:bg-opacity-10 hover:bg-gray-800"
                        >
                            <FaGithub />
                            <span>Login with GitHub</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;
