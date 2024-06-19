import "./Header.css";

import React from "react";

const Header = () => {
    return (
        <div className="header">
            <div className="header-container">
            <img src="https://res.cloudinary.com/dboa7dqkl/image/upload/v1718640956/samples/forms_bg_img_gpvdhp.jpg" alt="" />
            <div className="header-card">
                <h1>Candidate Application Form - VYZEN</h1>
                <hr />
                <div>
                    <p>
                        sarthanur@gmail.com <em>Switch account</em>{" "}
                    </p>
                    <span class="material-symbols-outlined">cloud_upload</span>
                </div>
                <p>The name, email, and photo associated with your Google account will be recorded when you upload files and submit this form</p>
                <hr />
                <span>* Indicates required question</span>
            </div>
        </div>
        </div>
        
    );
};

export default Header;
