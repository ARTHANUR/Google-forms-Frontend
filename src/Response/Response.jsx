import "./Response.css";

import React, { useState } from "react";

const Response = () => {
    const [resData, setResData] = useState(null);
    const GetData = async () => {
        try {
            const response = await fetch("https://google-forms-backend-80i9.onrender.com/response");
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
                <div>
                    <h1> Application Form </h1>
                    <p>Your response has been recorded</p>
                </div>
                <span>
                    <p>
                        This form was created for Shashank <em>Report Abuse</em>
                    </p>
                    
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
                                                        <p>{data.inputKey.replace("_"," ")}</p>
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
