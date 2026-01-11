import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Components/Home/Home.jsx'
import Game from './Components/Game/Game.jsx'
import Layout from './Layout.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "game",
        element: <Game />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
