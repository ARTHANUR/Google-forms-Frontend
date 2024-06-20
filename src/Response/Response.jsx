import "./Response.css";

import React, { useState } from "react";

const Response = () => {
    const [resData, setResData] = useState(null);
    const GetData = async () => {
        try {
            const response = await fetch("http://localhost:5000/response");
            const data = await response.json();
            console.log(data);
            setResData(data);
        } catch (err) {
            console.log("Unable to fetch data", err);
        }
    };
    return (
        <div className="response">
            <div className="response-container">
                <img src="https://res.cloudinary.com/dboa7dqkl/image/upload/v1718640956/samples/forms_bg_img_gpvdhp.jpg" alt="" />
                <div>
                    <h1>Candidate Application Form - VYZEN</h1>
                    <p>Your response has been recorded</p>
                </div>
                <span>
                    <p>
                        This form was created inside of VYZEN. <em>Report Abuse</em>
                    </p>
                    <h2>
                        Google <em>Forms</em>
                    </h2>
                </span>
            </div>

            <button className="response-btn" onClick={GetData}>Get Data</button>
            {resData && (
                <>
                    <div className="response-container">
                        {resData.map((item, index) => {
                            return (
                                <>
                                    <div className="response-page">
                                        <h1>Page {index+1} :</h1>
                                        {
                                            item.inputs.map((data)=>{
                                                return(<>
                                                    <div className="response-card">
                                                        <p>{data.inputKey}</p>
                                                        <p>:</p>
                                                        <p>{data.inputValue}</p>
                                                    </div>
                                                </>)
                                            })
                                        }
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default Response;
