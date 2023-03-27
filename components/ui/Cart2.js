import React from 'react'

export default function Cart2() {
  return (
    <div>
        <section id='cart-section'>
            <div className='cart-div'>
                <div className='cartMain-div'>
                    <div className='cart-img'>
                        <img src='/img/Mask Group -6.png'/>
                        <div>
                            <h2>Product name</h2>
                            <div className='price-div'>

                            <span>$</span>
                            <span>200</span>
                            </div>
                        </div>
                    </div>

                    <div className='cart-action'>
                        <div className='cart-quantity'>

                        <img src='/img/sub.png' />
                        <input defaultValue={12} />
                        <img src='/img/add.png' />
                        </div>

                        <div className='cart-delete'>
                            <i className="bi bi-trash3"></i>
                        </div>
                    </div>

                    {/* <div>
                        <button>cartCheckout</button>
                    </div> */}
                </div>

            </div>

        </section>
    </div>
  )
}
