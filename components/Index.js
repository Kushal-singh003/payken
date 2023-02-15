import React from "react";
import Link from "next/link";

export default function Index() {
  return (
    <div>
      <section className="login">
        <div className="container">
          <div className="login-box">
            <img src="/img/payken.png" alt="" />
            <h4>Don't swap just Payken</h4>
            <img src="/img/arrow.png" alt="" />
            <Link href="/login" className="login-btn">
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
