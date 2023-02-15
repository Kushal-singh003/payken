import React, { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../Utils/SupabaseClient";
import { useRouter } from "next/router";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
  const router = useRouter();
  const [userData, setUserData] = useState();

  async function getAvatar() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      'session'
    );
    setUserData(session?.user?.user_metadata)
  }

  useEffect(() => {
    getAvatar();
  }, [])

  function logoutFn(e) {
    e.preventDefault();
    supabase.auth.signOut();
    window.localStorage.clear();
    router.push("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg " id="payken-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img src="/img/payken-logo.png" alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/wallet">Wallet</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/nft">NFT</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contract/collection">Collection</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/payment">Payment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="settings/kyc/submitKyc">KYC</Link>
              </li>
              {/* <li className="nav-item">
                <Link href='' className="nav-link" onClick={logoutFn}>Logout</Link>
              </li> */}


              {/* <li class="nav-item dropdown" id="profile-login">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="img/apple (2).png" alt=""/>
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
          </li> */}

              <NavDropdown title={userData?.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/settings/updateProfile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings/changeEmail">
                  Settings
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item  onClick={(e)=> logoutFn(e)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
