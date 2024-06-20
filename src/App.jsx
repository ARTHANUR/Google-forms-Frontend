import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Form/Form";
import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Response from "./Response/Response";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header />
                        <Form />
                        <Footer />
                    </>
                } />
                <Route path="/response" element={<Response />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
