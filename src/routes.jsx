import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { CreateContact } from "./pages/CreateContact.jsx";
import { Layout } from "./pages/Layout.jsx";
import addContext from "./hooks/useGlobalReducer.jsx";

const Slug = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<CreateContact />} />
                    <Route path="/edit/:id" element={<CreateContact />} />
                    <Route path="*" element={<h1 className="text-center mt-5">Not Found!</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default addContext(Slug);
