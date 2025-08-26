import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';

const Navbar = async () => {

  const session = await auth();

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo.png' alt='logo' width={100} height={100} className=''/>
        </Link>

        <div className='flex items-center gap-5 text-black'>
          {session && session.user ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>

              <button onClick={() =>signOut}>
                <span>Logout</span>
              </button>

              <Link href={`/user/${session?.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <>
              <button onClick={ async () => {
                'use server';

                await signIn('github');
              }}>
                <span>Login</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
