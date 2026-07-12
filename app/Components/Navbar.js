import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
    <nav className='flex justify-around p-1.5 bg-linear-120 from-purple-700 to-purple-500'>
        <span className='font-bold bungee.className'>Code Campass</span>
        <div>
            <ul className='flex gap-10 font-bold'>
                <Link href="/home">Home</Link>
                <Link href="/languages">Languages</Link>
                <Link href="/about">About</Link>
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar
