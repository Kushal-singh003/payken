import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, userSession, useSession } from "next-auth/react";
import supabase from "../utils/SupabaseClient";

const SideBar = () => {
  const [avatar, setAvatar] = useState();
  const [avatarImage,setAvatarImage] = useState();
  const [provider, setProvider] = useState();
  const [toggle, setToggle] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function getAvatar() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    setAvatar(session?.user?.user_metadata?.avatar_url);
    setAvatarImage(session?.user?.user_metadata?.avatar_image);
  }

  useEffect(() => {
    getAvatar();
  }, []);

  async function uploadAvatar(event) {
    event.preventDefault();
    setSpinner(true);
    setIsLoading(true);

    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const mathRandom = Math.floor(Math.random() * 9999999999);
      const fileName = `${mathRandom}.${fileExt}`;
      const filePath = `${fileName}`;
      setAvatarImage(URL.createObjectURL(file));

      const { error, data } = await supabase.storage
        .from("avatar")
        .upload(filePath, file);

      if (error) {
        throw error;
        setSpinner(false);
        setIsLoading(false);
      }

      if (data) {
        console.log(data.path);
        const imageUrl =
          "https://abnoypqlmlphutiagnsi.supabase.co/storage/v1/object/public/avatar/" +
          data.path;

        updateUploadAvatar(imageUrl);
      }
    } catch (err) {
      console.log(err, "to get the error");
    }
  }

  async function updateUploadAvatar(imageUrl) {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_image: imageUrl },
    });

    if (data) {
      console.log(data, "to see the image uploaded");
      // toast.success("Image upladed successfully")

      setSpinner(false);
    }

    if (error) {
      console.log(error, "to see the status of the error");
      toast.error("Failed to upload the image");
      setSpinner(false);
    }
  }

  function signOut(e) {
    e.preventDefault();
    supabase.auth.signOut();
    window.localStorage.clear();
    router.push("/profilePages/login");
  }

  return (
    <div>
      <div className={toggle ? "" : "toggle-sidebar"}>
        <button
          onClick={() => setToggle(!toggle)}
          className="btn primary bi bi-list toggle-sidebar"
          id="toggle-setting"
        >
          {" "}
        </button>
        <ToastContainer />
        <aside className=" sidebar ">
          <ul className="sidebar-nav" id="sidebar-nav">
            <button
              type="button"
              id="close-btn"
              onClick={() => setToggle(!toggle)}
              className="btn-close"
              data-bs-dismiss="sidebar"
              aria-label="sidebar"
            ></button>
            <a className="navbar-brand" href="/dashboard" id="href-set">
              <img id="logo-id" src="/logo.png" />
            </a>

            <div className="profile-menu">
              {  spinner ? <> <span style={{alignSelf:'center', marginTop:'20px'}} className="spinner-border "> </span> </>
               :
<>
              <img
                className="profileImage"
                id="profilePictureMenu"
                src={avatarImage || avatar}
                alt=""
              />
              <div className="hover-icon-set">
              <label htmlFor="img">
                <i id="upload-icon" className="bi bi-upload upload-icon"></i>
              </label>
              </div>
              </>
              }
              <input
                id="img"
                onChange={(e) => uploadAvatar(e)}
                type="file"
                placeholder="Upload Front Side"
                style={{ marginTop: "10px", display: "none" }}
              />
              <div className="profile-info overflowHidden" title=""></div>
            </div>

            <li className="nav-item">
              <a className="collap" href="/dashboard">
                {/* <img src="/dashboard.png"/> */}
                <i className="fa-regular fa-grid"></i>
                {/* <i className="bi bi-circle"></i> */}

                <span className="dash-texts">Dashboard</span>
              </a>
            </li>
            {/* <!-- End Dashboard Nav --> */}

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                <span className="spanic">PROFILE</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul
                id="components-nav"
                className="nav-content collapse show"
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="/profilePages/userProfile">
                    <i className="fa fa-circle"></i>
                    <span>MY PROFILE</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#components-nav1"
                data-bs-toggle="collapse"
                href="#"
              >
                <span className="spanic"> NFT</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul
                id="components-nav1"
                className="nav-content collapse show"
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="/nftPages/nftStart">
                    <i className="fa fa-circle"></i>
                    <span>MY NFT COLLECTION </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link "
                data-bs-target="#components-nav2"
                data-bs-toggle="collapse"
                href="#"
              >
                <span className="spanic"> SETTINGS</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul
                id="components-nav2"
                className="nav-content collapse2 show"
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="/settings/emailModify">
                    <i className="fa fa-circle"></i>
                    <span>EMAIL MODIFY </span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <button
                className="nav-link "
                onClick={signOut}
                style={{ border: "none" }}
              >
                {/* <i className="fa-solid fa-comments"></i> */}
                <span className="spanic">LOGOUT</span>
                {/* <i className="fa fa-chevron-down" id="icon-cd"></i> */}
              </button>
            </li>

            {/* <!-- End Components Nav --> */}

            {/* <!-- End Icons Nav --> */}
          </ul>
        </aside>
        {/* ):null} */}
        {/* <!-- End Sidebar--> */}
      </div>
    </div>
  );
};

export default SideBar;
