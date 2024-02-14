'use client'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config.js';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (typeof window !== 'undefined') {
    const userSession = sessionStorage.getItem('user');

    console.log({ user });

    if (!user && !userSession) {
      router.push('/SignUp');
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/SignUp');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleLogout}>Log out</button>
    </main>
  );
}
