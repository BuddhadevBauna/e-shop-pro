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
import axios from 'axios';
import { setCategories } from './store/redux/reducers/categorySlice';
import { setAllCategoriesProducts } from './store/redux/reducers/allCategoryProductSlice';
import { useAuth } from './store/context/auth';
import ServerError from './components/error/ServerError';
import UpdateCategoryOrSubCategory from './components/admin/manage-categories/update/UpdateCategoryOrSubCategory';



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
      { path: "categories/update/q", element: <UpdateCategoryOrSubCategory /> },
      //products
      { path: "products", element: <ManageProducts /> },
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
    const fetchProductsCategory = async () => {
      try {
        const response = await axios.get('http://localhost:3030/categories');
        if (response.status === 200) {
          dispatch(setCategories({ categories: response.data }));
        }
      } catch (error) {
        console.log(error);
        // throw error; // This will trigger ErrorBoundary to handle the error
      }
    }
    fetchProductsCategory();
  }, [dispatch]);

  const fetchProducts = async (categoryType) => {
    try {
      const response = await axios.get(`http://localhost:3030/products/category/${categoryType}`);
      // console.log(response.data);
      // console.log({categoryType, products: response.data});
      dispatch(setAllCategoriesProducts({ categoryType, products: response.data }));
    } catch (error) {
      console.error(`Error fetching products for ${categoryType}:`, error);
      // throw error; // This will trigger ErrorBoundary to handle the error
    }
  }
  useEffect(() => {
    categories.forEach(category => {
      if (category.subCategory.length === 0) {
        fetchProducts(category.categoryType);
      } else {
        category.subCategory.forEach(subCat => {
          fetchProducts(subCat.categoryType);
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