import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//---pages
import Root from './pages/Root';
import ProductExplorer from './components/products/productExplorer/ProductExplorer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import ClientError from './components/error/ClientError';
import AdminLayout from './components/layout/AdminLayout';
import ManageUsers from './components/admin/manage-user/ManageUsers';
import ManageCategories from './components/admin/manage-categories/ManageCategories';
import ManageProducts from './components/admin/manage-products/ManageProducts';
import { useFetchAllCategory } from './api/categories/categoryAPI';
import { useFetchProductsOfAllCategories } from './api/products/productsAPI';
import { useAuth } from './store/context/auth';
import ServerError from './components/error/ServerError';
import UpdateCategoryOrSubCategory from './components/admin/manage-categories/update/UpdateCategoryOrSubCategory';
import AddCategory from './components/admin/manage-categories/add/AddCategory';
import AddProduct from './components/admin/manage-products/add/AddProduct';
import UpdateProduct from './components/admin/manage-products/update/UpdateProduct';


const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      { path: "products/category/:particularCategory", element: <ProductExplorer /> },
      { path: "products/search", element: <ProductExplorer /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
    ],
  },
  { path: "/*", element: <ClientError /> },
  {
    path: "admin", element: <AdminLayout />,
    children: [
      //categories
      { path: "categories", element: <ManageCategories /> },
      { path: "categories/add", element: <AddCategory /> },
      { path: "categories/update/q", element: <UpdateCategoryOrSubCategory /> },
      //products
      { path: "products", element: <ManageProducts /> },
      { path: "products/add", element: <AddProduct /> },
      { path: "products/update/:productId", element: <UpdateProduct /> },
      //users
      { path: "user", element: <ManageUsers /> }
    ]
  }
]);

function App() {
  const { isServerIssue } = useAuth();

  //call custom hook
  useFetchAllCategory();
  useFetchProductsOfAllCategories();

  if (isServerIssue) {
    return <ServerError />;
  }
  return (
    <RouterProvider router={router} />
  );
}

export default App;