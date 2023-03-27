import React from 'react'
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown';
import supabase from "../Utils/SupabaseClient";
import { useRouter } from "next/router";

export default function BottomNav() {
  const router = useRouter();

  function logoutFn(e) {
    e.preventDefault();
    supabase.auth.signOut();
    window.localStorage.clear();
    router.push("/");
  }
  return (
    <div>
      <section className="bottom-nav">
        <div className="container">
          <div className="main-bottomNav">
            <ul>

              <li>
                <Link href='/'>
                  <img className="bottomNav-icons" src="/img/home-bottom.png" />
                </Link>

              </li>
              <li>
                <Link href='/dashboard/cart'>
                  <img className="bottomNav-icons" src="/img/cart.png" />
                </Link>
              </li>
              <li>
                <Link href='/settings/updateProfile'>
                  <img className="bottomNav-icons" src="/img/profile-bottom.png" />
                </Link>
              </li>
              <li>
                {/* <Link href=''>
                  <img className="bottomNav-icons" src="/img/bar-bottom.png" />
                  </Link> */}

                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className='bottomNav-icon'>
                    <img className="bottomNav-icons" src="/img/bar-bottom.png" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item ><Link className='bottom-Link' href='/settings/kyc/submitKyc'>Kyc</Link></Dropdown.Item>
                    {/* <Dropdown.Item ><Link className='bottom-Link' href='/payment'>Payment</Link></Dropdown.Item> */}
                    <Dropdown.Item ><Link className='bottom-Link' href='/wallet'>Wallet</Link></Dropdown.Item>
                    <Dropdown.Item ><Link className='bottom-Link' href='/dashboard/directPay'>Direct Pay</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(e) => logoutFn(e)}>
                      Logout
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
