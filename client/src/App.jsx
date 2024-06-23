import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//---pages
import Root from './pages/Root';
import ProductRoot from './pages/ProductRoot';
import ProductExplorer from './components/products/productExplorer/ProductExplorer';


const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      { 
        path: "", element: <ProductRoot />,
        children: [
          { path: "products/category/:particularCategory", element: <ProductExplorer /> },
          { path: "products/search", element: <ProductExplorer /> }
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