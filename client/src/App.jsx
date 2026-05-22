import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAllUsers from './pages/admin/AdminAllUsers'
import AdminAllOrders from './pages/admin/AdminAllOrders'
import AdminAllShops from './pages/admin/AdminAllShops'
import PrivateComponents from './components/PrivateComponents'
import PriveateAdminComponent from './components/PrivateAdminComponent'
import ShopOwnerProducts from './pages/shop/ShopOwnerProducts'
import ShopOrders from './pages/shop/shopOrders'
import ShopCoupons from './pages/shop/ShopCoupons'
import ShopProfile from './pages/shop/ShopProfile'
import ShopDashboard from './pages/shop/ShopDashBoard'
import ProfilePage from './pages/Profile'
import ProductDetails from './pages/singleProductPage'
import ProductsPage from './pages/AllProducts'
import AllShops from './pages/AllShops'
import ShopDetailsPage from './pages/ShopProfilePage'
import Footer from './components/Footer'
import CartPage from './pages/cartPage'
import ChatPage from './pages/chatPage'
import ChatFab from './components/ChatButton'


function App() {

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/products/:pid' element={<ProductDetails/>}/>
        <Route path='/marketplace' element={<AllShops/>}/>
        <Route path='/marketplace/:sid' element={<ShopDetailsPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
        {/*admin routes*/}
        <Route path='/admin' element={<PriveateAdminComponent/>}>
        <Route path='dashboard' element = {<AdminDashboard/>}/>
        <Route path='users' element = {<AdminAllUsers/>}/>
        <Route path='orders' element = {<AdminAllOrders/>}/>
        <Route path='shops' element = {<AdminAllShops/>}/>
        </Route>
         {/*ShopOwner routes*/}
         <Route path='/shop/dashboard' element={<ShopDashboard/>}/>
         <Route path='/shop/products' element={<ShopOwnerProducts/>}/>
         <Route path='/shop/orders' element={<ShopOrders/>}/>
         <Route path='/shop/coupons' element={<ShopCoupons/>}/>
         <Route path='/shop/profile' element={<ShopProfile/>}/>
          {/*auth routes*/}
         
          <Route path='/auth/profile' element = {<ProfilePage/>}/>
          <Route path='/auth/cart' element = {<CartPage/>}/>
      </Routes>
      <ChatFab/>
      <Footer/>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
