import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import Category from "./components/category/Category";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/product/Product";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import BottomBar from "./components/bottombar/BottomBar";

const App = () => {
  const [subcategory, setSubcategory] = useState([]);
  const [bottomFlag, setBottomFlag] = useState(false);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const categoryHandler = (subcategoryId1) => {
    setSubcategoryId(subcategoryId1);
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="mainContainer">
          <div style={{ display: "flex", flex: 6, flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Sidebar />
              <div className="middleContainer">
                <Routes>
                  <Route
                    path="/"
                    element={<Home setBottomFlag={setBottomFlag} />}
                  ></Route>
                  <Route
                    path="category"
                    element={
                      <Category
                        subcategory={subcategory}
                        setSubcategory={setSubcategory}
                        setBottomFlag={setBottomFlag}
                      />
                    }
                  ></Route>

                  <Route
                    path="product/:id"
                    element={
                      <Product
                        setBottomFlag={setBottomFlag}
                        subcategoryId={subcategoryId}
                      />
                    }
                  ></Route>
                </Routes>
              </div>
            </div>
            {bottomFlag && (
              <BottomBar
                subcategoryId={subcategory.categoryId}
                clickHandler={categoryHandler}
              />
            )}
          </div>

          <div className="rightContainer">
            <Cart />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
// import React from "react";
// import Navbar from "./components/navbar/Navbar";
// import Sidebar from "./components/sidebar/Sidebar";
// import "./app.css";
// import Category from "./components/category/Category";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Product from "./components/product/Product";
// import SubCategory from "./components/subcategory/SubCategory";
// import Home from "./components/home/Home";
// import Cart from "./components/cart/Cart";
// import BottomBar from "./components/bottombar/BottomBar";

// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Navbar />
//         <div className="mainContainer">
//           <Sidebar />
//           <div className="middleContainer">
//             <Routes>
//               <Route path="/" element={<Home />}></Route>
//               <Route path="category" element={<Category />}>
//                 <Route path="subcategory/:id" element={<SubCategory />}></Route>
//               </Route>

//               <Route path="product/:id" element={<Product />}></Route>
//             </Routes>
//             {/* <Category /> */}
//           </div>

//           <div className="rightContainer">
//             <Cart />
//           </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;
