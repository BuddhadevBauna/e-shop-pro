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
import AccountRoot from './pages/AccountRoot';
import Information from './components/user/information/Information';
import FavouriteItems from './components/user/favourite/FavouriteItems';
import RoleBasedRoute from './middleware/RoleBasedRoute';
import Verify from './components/auth/verify/Verify';
import ForgotPassword from './components/auth/password_update/ForgotPassword';
import ResetPassword from './components/auth/password_update/ResetPassword';


const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      { path: "", element: <ProductListing /> },
      {
        path: "products", element: <ProductRoot />,
        children: [
          { path: "", element: <ProductListing /> },
          { path: "select", element: <ProductExplorer /> },
          { path: "search", element: <ProductExplorer /> },
          { path: ":productId", element: <ProductDetails /> },
          {
            path: ":productId/review", element: <RoleBasedRoute allowedRoles={["customer"]} />,
            children: [
              { path: "", element: <AddReview /> }
            ]
          },
        ]
      },
      {
        path: 'account', element: <AccountRoot />,
        children: [
          { path: 'register', element: <Register /> },
          { path: 'login', element: <Login /> },
          { path: 'logout', element: <Logout /> },
          { path: 'verify/:token', element: <Verify /> },
          { path: 'password/forgot', element: <ForgotPassword /> },
          { path: 'password/reset/:token', element: <ResetPassword /> },
          {
            path: '', element: <RoleBasedRoute allowedRoles={["customer", "admin"]} />,
            children: [
              { path: 'details', element: <Information /> }
            ]
          }
        ],
      },
      {
        path: "", element: <RoleBasedRoute allowedRoles={["customer"]} />,
        children: [
          { path: "viewcart", element: <Cart /> },
          { path: 'wishlist', element: <FavouriteItems /> },
        ]
      }
    ],
  },
  {
    path: "/admin", element: <RoleBasedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "", element: <AdminLayout />,
        children: [
          {
            path: "categories",
            children: [
              { path: "", element: <ManageCategories /> },
              { path: "add", element: <AddCategory /> },
              { path: "update/q", element: <UpdateCategoryOrSubCategory /> },
            ]
          },
          {
            path: "products",
            children: [
              { path: "", element: <ManageProducts /> },
              { path: "add", element: <AddProduct /> },
              { path: "update/:productId", element: <UpdateProduct /> },
            ]
          },
          {
            path: "user",
            children: [
              { path: "user", element: <ManageUsers /> },
            ]
          }
        ]
      }
    ]
  },
  { path: "/*", element: <ClientError /> },
]);

function App() {
  const { isServerIssueLoading, isServerIssue } = useAuth();

  if (isServerIssueLoading) {
    return (
      <div className='loading home-page'>
        <p>Loading</p>
        <span>.</span><span>.</span><span>.</span>
      </div>
    )
  }
  if (isServerIssue) {
    return <ServerError />;
  }

  //call custom hook
  useFetchAllCategory();
  useFetchProductsOfAllCategories();

  return (
    <RouterProvider router={router} />
  );
}

export default App;