'use client'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Hhome from './HomePage/page'


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
    <div>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleLogout}>Log out</button>
    </main>
    <Hhome/>
    </div>
  );
}
