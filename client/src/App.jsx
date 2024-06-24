import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//---pages
import Root from './pages/Root';
import ProductRoot from './pages/ProductRoot';
import ProductExplorer from './components/products/productExplorer/ProductExplorer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      { 
        path: "", element: <ProductRoot />,
        children: [
          { path: "products/category/:particularCategory", element: <ProductExplorer /> },
          { path: "products/search", element: <ProductExplorer /> },
        ]
      },
      {path: "register", element: <Register />},
      {path: "login", element: <Login />},
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;