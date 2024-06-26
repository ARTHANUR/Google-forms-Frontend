import React, { useContext } from "react";
import "./Footer.css";
import ProgressBar from "@ramonak/react-progress-bar";
import MyContext from "../MyContext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const { count, setCount } = useContext(MyContext);
    const navigate = useNavigate();

    const handleNext = () => {
        if (count < 11) {
            setCount(count + 1);
        }
    };

    const handleBack = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const setLocalJsonData = () => {
        const arrOfInput = document.querySelectorAll("input");

        const inputJsonList = [];
        arrOfInput.forEach((item) => {
            inputJsonList.push({
                inputKey: item.id,
                inputValue: item.value,
            });
            item.value = "";
        });
        const stringifiedJson = JSON.stringify(inputJsonList);
        localStorage.setItem(`page${count}`, stringifiedJson);
        console.log("====", stringifiedJson);
    };

    const handleNextClick = () => {
        const form = document.querySelector("form");

        if (form.checkValidity()) {
            setLocalJsonData();
            handleNext();
        } else {
            form.reportValidity();
        }
    };

    const clearForm = () => {
        const arrOfInput = document.querySelectorAll("input");
        arrOfInput.forEach((item) => {
            item.value = "";
        });
    };

    const handleSubmit = async () => {
        setLocalJsonData();

        let allPagesData = [];
        for (let i = 1; i <= 11; i++) {
            const pageData = localStorage.getItem(`page${i}`);
            if (pageData) {
                allPagesData.push({
                    page: i,
                    inputs: JSON.parse(pageData),
                });
            }
            navigate("/response");
        }

        try {
            const response = await fetch("https://google-forms-backend-80i9.onrender.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(allPagesData),
            });

            if (response.ok) {
                console.log("Data submitted successfully");

                for (let i = 1; i <= 11; i++) {
                    localStorage.removeItem(`page${i}`);
                }
            } else {
                console.error("Error submitting data");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="footer">
            <div className="footer-container">
                <div>
                    <span>
                        {count === 11 ? (
                            <>
                                {count > 1 && <button onClick={handleBack}>Back</button>}
                                <button onClick={handleSubmit}>Submit</button>
                            </>
                        ) : (
                            <>
                                {count > 1 && <button onClick={handleBack}>Back</button>}
                                <button onClick={handleNextClick}>Next</button>
                            </>
                        )}
                    </span>
                    <div>
                        <ProgressBar completed={(count / 11) * 100} bgColor="green" width="10rem" height="10px" isLabelVisible={false} />
                        <p>Page {count} out of 11</p>
                    </div>

                    <p onClick={clearForm}>Clear form</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
