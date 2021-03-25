import React from "react";
import "./footer.css";

const Footer = () => (
  <footer className='footer'>
    <div className='container-fluid'>
      <div className='row text-muted'>
        <div className='col-6 text-left'>
          <p className='mb-0'>
              <strong>CRM ticket System </strong>
            {" "}
            &copy;
          </p>
        </div>
        <div className='col-6 text-right'>
          <ul className='list-inline'>
            <li className='footer-item'>
                Support
            </li>
            <li className='footer-item'>
              
                Help Center
              
            </li>
            <li className='footer-item'>
              
                Privacy
              
            </li>
            <li className='footer-item'>
              
                Terms
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
