import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { local } from "web3modal";
import supabase from "../../utils/SupabaseClient";
// import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [name, setName] = useState();
  const [session, setSession] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // async function getSession() {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   console.log(session, "to get the session from supabase for navbar");
  //   setName(session?.user?.user_metadata?.full_name)

  // }
  // useEffect(() => {
  //   getSession();
  // }, []);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setName(session?.user?.user_metadata?.full_name)

      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    }

    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);

  function signout(e) {
    e.preventDefault();
    supabase.auth.signOut();
    window.localStorage.clear();
    router.push("/");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-sm   " style={{ paddingTop: "0px" }}>
        <div className="container-fluid">
          <a href="/" className="navbar-brand" style={{ color: "white" }}>
            <img src="/navLogo.png" style={{ width: "18%" }} />
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#collapseNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapseNavbar">
            <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
              {/* {session ? (
                <li className="nav-item">
                  <Link href="/dashboard">
                    <a href="#" className="nav-link text-light" style={{color:"white"}}>
                      Dashboard
                    </a>
                  </Link>
                </li>
               ) : null}{" "} */}
              {/* <li className="nav-item">
                <Link href ="#" >
                  <a href="#" className="nav-link text-light">Contact Us</a>
                </Link>
            </li> */}
              {/* {session ? (
              <>
              <li className="nav-item">
                <Link href="#">
                  <a href="#" className="nav-link text-light">
                    Welcome {" "}{name}
                  </a>
                </Link>
              </li>
               <li className="nav-item">
               {/* <Link href="/login"> */}
              {/* <a
                   href="#"
                   className="nav-link text-light"
                   onClick={signOut}
                 >
                   Logout
                 </a>
               {/* </Link> */}
              {/* </li>
             </>
              ) :  <li className="nav-item">
              <Link href="/">
                <a href="#" className="nav-link text-light">
                  Login/SignUp
                </a>
              </Link>
            </li> }  */}

              {!session ? (
                <li className="nav-item">
                  <Link href="/">
                    <a href="#" className="nav-link text-light">
                      Login/SignUp
                    </a>
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/dashboard">
                      <a
                        href="#"
                        className="nav-link text-light"
                        style={{ color: "white" }}
                      >
                        Dashboard
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link text-light mb-0">Welcome {name}</p>
                  </li>
                  <li className="nav-item">
                    <button
                      style={{backgroundColor:"transparent", border:"none", color:"white"}}
                      className="nav-link text-light"
                      onClick={(e) => signout(e)}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

              {/* {!session? (
              <li className="nav-item">
                <Link href="/">
                  <a href="#" className="nav-link text-light">
                    Login/SignUp
                  </a>
                </Link>
              </li>
              ) : null}{" "}
              {session ? (
              <li className="nav-item">
                {/* <Link href="/login"> */}
              {/* <a
                    href="#"
                    className="nav-link text-light"
                    onClick={signOut}
                  >
                    Logout
                  </a>
                {/* </Link> */}
              {/* </li>
               ) : null} */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
