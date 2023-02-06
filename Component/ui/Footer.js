import Link from "next/link";
import $ from "jquery";

const Footer = () => {
  return (
    <div>
      <footer id="main-footer">
        <div className="container">
          <div className="row">
            <div className="col text-center text-light">
              <h3 id="footer-text" style={{fontSize:"16px", margin:"0", padding:'5px'}}>
                PAYKEN copyright &copy; 2022
                {/* {" "} */}
                <span>
                  <button
                    className="btn"
                    style={{ color: "white", textDecoration:"underline", fontSize:"18px", fontWeight:"600", paddingLeft:"5px",paddingTop:"5px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#contactModal"
                  >
                    {" "}
                    Contact Us
                  </button>
                </span>
              </h3>
            </div>
          </div>
        </div>
      </footer>

      <div className="modal fade text-dark" id="contactModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{fontSize:"16px"}}>Contact Us</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea className="form-control"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary btn-block">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

{
  /* <Script>
    $("#year").text(new Date().getFullYear());
    </Script> */
}
