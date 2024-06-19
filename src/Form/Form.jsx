import React, { useContext, useEffect, useState } from "react";
import formData from "../assets/question.json";
import "./Form.css";
import MyContext from "../MyContext";

const getPageData = (count) => {
    const pageData = formData.find((item) => item.page === count);
    return pageData ? pageData.questions : [];
};

const Form = () => {
    const { count } = useContext(MyContext);
    const [data, setData] = useState(getPageData(count));

    useEffect(() => {
        setData(getPageData(count));
        const unparsedLocalPageData = localStorage.getItem(`page${count}`);
        const localPageData = JSON.parse(unparsedLocalPageData);
        console.log(localPageData);

        const inputForPageChange = document.querySelectorAll("input");
        inputForPageChange.forEach((item, index) => {
            if (localPageData?.[index]?.inputValue) {
                item.value = localPageData?.[index]?.inputValue;
            }
  
        });
    }, [count]);

    

    return (
        <div className="q-container">
            <form id="form-data">
                {data.map((item, index) => (
                    <div className="q-card" key={index}>
                        <div>
                            <label htmlFor={item.accessor_key}>{item.label}</label>
                            {item.required && <span>*</span>}
                        </div>
                        {item.description && <p>Description: {item.description}</p>}
                        {item.options ? (
                            item.options.map((choice, idx) => (
                                <div className="choice" key={idx}>
                                    <input id={item.accessor_key} type="radio" name={item.accessor_key} required={item.required}  />
                                    <label className="choice-label" htmlFor={item.accessor_key}>
                                        {choice}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <input id={item.accessor_key} type={item.type} required={item.required} placeholder="Your answer"  />
                        )}
                    </div>
                ))}
            </form>
        </div>
    );
};

export default Form;
