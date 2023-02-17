import Link from 'next/link'
import React from 'react'
import Footer from '../ui/Footer'
import NavBar from '../ui/NavBar'

export default function TransferFunds() {
  return (
    <div>
      <NavBar/>
        <section className="sent">
      <div className="container">
        <h2><a href=""> </a> Dashboard</h2>
        <div className="sent-box">
          <Link className='link' href='/nft'>
          <div className="sent-card">
            <img src="img/nft (1).png" alt="" />
            <span>NFT</span>
          </div>
          </Link>
          <Link className='link' href='/wallet'>
          <div className="sent-card">
            <img src="img/wallet (1).png" alt="" />
            <span>Wallet</span>
          </div>
          </Link>
          <Link className='link' href='/payment'>
          <div className="sent-card">
            <img src="img/hand.png" alt="" />
            <span>Payment</span>
          </div>
          </Link>
          <Link className='link' href='/sendReceive'>
          <div className="sent-card">
            <img src="img/money-transfer.png" alt="" />
            <span>Send/Receive</span>
          </div>
          </Link>
          <Link className='link' href='/contract/collection'>
          <div className="sent-card">
            <img src="img/money-transfer.png" alt="" />
            <span>Collection</span>
          </div>
          </Link>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  )
}
