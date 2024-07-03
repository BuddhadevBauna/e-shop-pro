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
import ClientError from './components/error/ClientError';
import AdminLayout from './components/layout/AdminLayout';
import ManageUsers from './components/admin/manage-user/ManageUsers';
import ManageCategories from './components/admin/manage-categories/ManageCategories';
import ManageProducts from './components/admin/manage-products/ManageProducts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsCategory } from './api/categories/categoryAPI';
import { fetchProducts } from './api/products/productsAPI';
import { useAuth } from './store/context/auth';
import ServerError from './components/error/ServerError';
import UpdateCategoryOrSubCategory from './components/admin/manage-categories/update/UpdateCategoryOrSubCategory';
import AddCategory from './components/admin/manage-categories/add/AddCategory';
import AddProduct from './components/admin/manage-products/add/AddProduct';


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
      //users
      { path: "user", element: <ManageUsers /> }
    ]
  }
]);

function App() {
  const categories = useSelector(state => state.allCategory);
  const dispatch = useDispatch();
  const { isServerIssue } = useAuth();

  useEffect(() => {
    fetchProductsCategory(dispatch);
  }, [dispatch]);

  useEffect(() => {
    categories.forEach(category => {
      if (category.subCategory.length === 0) {
        fetchProducts(dispatch, category.categoryType);
      } else {
        category.subCategory.forEach(subCat => {
          fetchProducts(dispatch, subCat.categoryType);
        })
      }
    })
  }, [categories])

  if (isServerIssue) {
    return <ServerError />;
  }
  return (
    <RouterProvider router={router} />
  );
}

export default App;