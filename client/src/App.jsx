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
import ProductListing from './components/products/allProducts/ProductListing';
import ProductDetails from './components/products/single-product/ProductDetails';
import AddReview from './components/user/review/AddReview';
import ProductRoot from './pages/ProductRoot';
import Cart from './components/user/cart/Cart';


const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      // Home routes
      { path: "", element: <ProductListing /> },
      {
        path: "products", element: <ProductRoot />,
        children: [
          { path: "", element: <ProductListing /> },
          { path: "category/:particularCategory", element: <ProductExplorer /> },
          { path: "search", element: <ProductExplorer /> },
          { path: ":productId", element: <ProductDetails /> },
          { path: ":productId/review", element: <AddReview /> },
        ]
      },
      // Auth routes
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      //user related routes
      { path: "cart", element: <Cart /> }
    ],
  },
  // Error route
  { path: "/*", element: <ClientError /> },
  {
    path: "admin", element: <AdminLayout />,
    children: [
      // Category management routes
      {
        path: "categories",
        children: [
          { path: "", element: <ManageCategories /> },
          { path: "add", element: <AddCategory /> },
          { path: "update/q", element: <UpdateCategoryOrSubCategory /> },
        ]
      },
      // Product management routes
      {
        path: "products",
        children: [
          { path: "", element: <ManageProducts /> },
          { path: "add", element: <AddProduct /> },
          { path: "update/:productId", element: <UpdateProduct /> },
        ]
      },
      // User management routes
      {
        path: "user",
        children: [
          { path: "user", element: <ManageUsers /> },
        ]
      }
      
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