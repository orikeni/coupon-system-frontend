import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/LayoutArea/Layout/Layout.tsx';



createRoot(document.getElementById('root')!).render(
<BrowserRouter>
 <Layout />
  </BrowserRouter>
)
