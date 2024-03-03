import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import TokenContextProvider from './Context/TokenContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import CartContextProvider from './Context/CartContext';
import WishListContextProvider from './Context/WishListContext';
import IetmCartContextProvider from './Context/IetmCart';
import IetmWishListContextProvider from './Context/IetmWishList';
import NameContextProvider from './Context/UserName';




const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()
root.render(

  <NameContextProvider>
    <IetmWishListContextProvider>
      <IetmCartContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <QueryClientProvider client={queryClient}>
              <TokenContextProvider>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </TokenContextProvider>
              <ReactQueryDevtools></ReactQueryDevtools>
            </QueryClientProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </IetmCartContextProvider>
    </IetmWishListContextProvider>
  </NameContextProvider>

);

// If you want to start measuring performance in your app, pass a function 
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
