import React from 'react'
import Link from 'next/link'

export default function MobileLogo() {
  return (
    <>
    <div className='mobile-logo'>
        <Link href='/'>
        <img className='mobile-logo--img' src='/img/mobile-logo.png' />
        </Link>
    </div>
    </>
  )}


