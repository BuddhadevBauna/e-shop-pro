import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//---pages
import Root from './pages/Root';
import ProductRoot from './pages/ProductRoot';
import ProductOfCategory from './components/products/productOfCategory/ProductOfCategory';


const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      { 
        path: "", element: <ProductRoot />,
        children: [
          { path: "products/category/:particularCategory", element: <ProductOfCategory /> },
          { path: "products/search/q", element: <ProductOfCategory /> }
        ]
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;