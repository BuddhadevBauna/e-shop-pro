import React, { useEffect } from 'react';
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
import Logout from './components/auth/Logout';
import { ClientError } from './components/error/ClientEroor';
import AdminLayout from './components/layout/AdminLayout';
import ManageUsers from './components/admin/manage-user/ManageUsers';
import ManageCategories from './components/admin/manage-categories/ManageCategories';
import ManageProducts from './components/admin/manage-products/ManageProducts';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCategories } from './store/redux/reducers/categorySlice';


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
      {path: "logout", element: <Logout />},
    ],
  },
  { path: "/*", element: <ClientError /> },
  {
    path: "admin", element: <AdminLayout />,
    children: [
      {path: "categories", element: <ManageCategories />},
      {path: "products", element: <ManageProducts />},
      {path: "user", element: <ManageUsers />}
    ]
  }
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductsCategory = async () => {
      try {
        const response = await axios.get('http://localhost:3030/categories');
        if (response.status === 200) {
          dispatch(setCategories(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductsCategory();
  }, [dispatch]);
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;