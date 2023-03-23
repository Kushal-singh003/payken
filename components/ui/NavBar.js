import React, { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../Utils/SupabaseClient";
import { useRouter } from "next/router";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Collapse } from "react-bootstrap";

export default function NavBar() {
  const router = useRouter(false);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);

  async function getAvatar() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");
    setUserData(session?.user?.user_metadata);
  }

  useEffect(() => {
    getAvatar();
  }, []);

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
          <button
            onClick={() => setOpen(!open)}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Collapse className="navbar-collapse" in={open}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/wallet">
                  Wallet
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/directPay">
                  Direct Pay
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" href="/contract/collection">Collection</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" href="/payment">
                  Payment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/settings/kyc/submitKyc">
                  KYC
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/cart">
                  <i className="bi bi-cart4"></i>
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link href='' className="nav-link" onClick={logoutFn}>Logout</Link>
              </li> */}

              {/* <li className="nav-item dropdown" id="profile-login">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="img/apple (2).png" alt=""/>
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
          </li> */}

              <NavDropdown
                title={
                  userData?.name ? (
                    <> {userData?.name} </>
                  ) : (
                    <i className="bi bi-person-circle profile-icon"></i>
                  )
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  {" "}
                  <Link
                    className="profile-update"
                    href="/settings/updateProfile"
                  >
                    Profile
                  </Link>
                </NavDropdown.Item>
                {/* <NavDropdown.Item ><Link href="/dashboard/cart">Cart</Link></NavDropdown.Item> */}

                {/* <NavDropdown.Item href="/settings/changeEmail">
                  Settings
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={(e) => logoutFn(e)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </ul>
            {/* {/ </div> /} */}
          </Collapse>
        </div>
      </nav>
    </div>
  );
}
