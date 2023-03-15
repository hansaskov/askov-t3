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
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-md p-6 bg-white rounded-lg shadow">
                <div className="space-y-6">
                    <h1 className="text-3xl font-semibold text-center">Login</h1>
                    <form onSubmit={void handleEmailSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input type="email" name="email" id="email" required placeholder="Type your email" className="input input-bordered w-full" />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Login with Email</button>
                    </form>
                    <div className="text-center my-4 text-gray-500">
                        <span>or</span>
                    </div>
                    <div className="space-y-2">
                        <button
                            onClick={() => void handleLogin('google')}
                            className="btn btn-outline btn-primary w-full flex items-center justify-center space-x-2"
                        >
                            <FcGoogle />
                            <span>Login with Google</span>
                        </button>
                        <button
                            onClick={() => void handleLogin('github')}
                            className="btn btn-outline btn-dark w-full flex items-center justify-center space-x-2"
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
