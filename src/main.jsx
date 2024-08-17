import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ConfigProvider, theme } from 'antd'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './utils/Routes.jsx'
const { darkAlgorithm } = theme;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider 
    theme={
      {algorithm: darkAlgorithm}
    }
    > 
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
)
