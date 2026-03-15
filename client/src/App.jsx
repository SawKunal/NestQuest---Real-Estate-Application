import React from 'react';
import { Layout, RequireAuth } from './routes/layout/Layout';
import HomePage from './routes/homePage/HomePage';
import ListPage from './routes/listPage/ListPage';
import SinglePage from './routes/singlePage/SinglePage';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import ProfilePage from './routes/profilePage/ProfilePage';
import ProfileUpdatePage from './routes/profileUpdatePage/ProfileUpdatePage';
import NewPostPage from './routes/newPostPage/NewPostPage';
import AboutPage from './routes/aboutPage/AboutPage';
import ContactPage from './routes/contactPage/ContactPage';
import AgentsPage from './routes/agentsPage/AgentsPage';
import { singlePageLoader, listPageLoader, profilePageLoader } from './lib/loaders';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

function App() {
  console.log("App component rendering");

  const router = createBrowserRouter([
    {
      path: '/',
      element:( <Layout/> ),
      children:[
        {
          path: '/',
          element:( <HomePage/> )
        },
        {
          path: '/list',
          element:( <ListPage/> ),
          loader: listPageLoader
        },
        {
          path: '/:id',
          element:( <SinglePage/> ),
          loader: singlePageLoader
        },
        {
          path: '/login',
          element:( <Login/> )
        },
        {
          path: '/register',
          element:( <Register/> )
        },
        {
          path: '/about',
          element:( <AboutPage/> )
        },
        {
          path: '/contact',
          element:( <ContactPage/> )
        },
        {
          path: '/agents',
          element:( <AgentsPage/> )
        }
      ]
    },
    {
      path:'/',
      element: <RequireAuth/>,
      children:[
        {
          path: '/profile',
          element:( <ProfilePage/> ),
          loader: profilePageLoader
        },
        {
          path: '/profile/update',
          element:( <ProfileUpdatePage/> )
        },
        {
          path: '/add',
          element:( <NewPostPage/> )
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App;