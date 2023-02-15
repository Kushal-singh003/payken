import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="footer-upper">
            <div className="footer-row">
              <img src="/img/payken-logo.png" alt="" />
              <span>
                Neque Porro Quisquam Est Qui Dolorem Ipsum Quia Dolor Sit Amet,
                Consectetur, Adipisci Velit.
              </span>
            </div>
            <div className="footer-row1">
              <ul>
                <h5>Products</h5>
                <li>Payment</li>
                <li>Tokenomics</li>
                <li>Enquiry</li>
                <li>About</li>
              </ul>
            </div>
            <div className="footer-row2">
              <ul>
                <h5>Learn</h5>
                <li>Documentation</li>
                <li>Medium</li>
                <li>Download Whitepaper</li>
              </ul>
            </div>
            <div className="footer-row3">
              <ul>
                <h5>Join the Community</h5>
                <li>Join Discord</li>
              </ul>
            </div>
          </div>
          <div className="footer-lower">
            <div className="flower-left">
              <img src="/img/google.png" alt="" />
              <img src="/img/twitter.png" alt="" />
              <img src="/img/meta.png" alt="" />
              <img src="/img/telegram.png" alt="" />
              <img src="/img/whatsapp.png" alt="" />
            </div>
            <div className="flower-right">
              <span>©2022 Payken. All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
