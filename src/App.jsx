import React, { Suspense } from "react";
import Header from "./Components/Header/Header";
import LoadingModal from "./Components/Utility/LoadingModal";
import { Route, Routes } from "react-router-dom";
import BannerCarousel from "./Components/Main/BannerCarousel";
import Footer from "./Components/Footer/Footer";
import About from "./Components/Pages/About/About";
import Products from "./Components/Main/Product/Products";
import Article from "./Components/Pages/About/Article";
import VideoSection from "./Components/Pages/About/VideoSection";
import Store from "./Components/Main/Store/Store";
import Testimonials from "./Components/Pages/About/Testimonials";
import Contact from "./Components/Pages/About/Contact";
import Profile from "./Components/Pages/About/UserProfile/Profile";
import DashboardRouting from "./Components/Dashboard/DashboardRouting";
import AuthForm from "./Components/Auth/AuthForm";
import ProductDetail from "./Components/Main/ProductDetail/ProductDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoinUs from "./Components/Pages/About/JoinUs";


const AppContent = () => {
  return (
    <>
   <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* {loginPageActive && <LoginModal />} */}

      <Suspense fallback={<LoadingModal />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="">
                  <Header />
                  <BannerCarousel />
                  <JoinUs/>

                  <About />
                  <Products />
                  <Article />
                  <VideoSection />
                  <Store />
                  <Testimonials />
                  <Contact />

                  <Footer />


                  {/* Footer */}


                  {/* Contact */}

                  {/* Testimonials */}


                  {/* VideoSection */}

                  {/* <BannerCarousel /> */}

                </div>
              </>
            }
          />


          <Route
            path="/about"
            element={
              <>
                <div className="">
                  <Header />
                  <About />
                  <Footer />
                </div>
              </>
            }
          />





             <Route
            path="/joinUs"
            element={
              <>
                <div className="">
                  <Header />
                  <JoinUs />
                  <Footer />
                </div>
              </>
            }
          />




          
          <Route
            path="/contact"
            element={
              <>
                <div className="">
                  <Header />
                  <Contact />
                  <Footer />

                </div>
              </>
            }
          />





          <Route
            path="/store"
            element={
              <>
                <div className="">
                  <Header />
                  <Store />
                  <Footer />
                </div>
              </>
            }
          />


          
          <Route
            path="/product/:id"
            element={
              <>
                <div className="">
                  <Header />
                  <ProductDetail />
                  <Footer />
                </div>
              </>
            }
          />


{/*   <Route path="/product/:id" element={<ProductDetail />} /> */}


          
          <Route
            path="/profile"
            element={
              <>
                <div className="">
                  <Header />
                  <Profile />
                  <Footer />
                </div>
              </>
            }
          />


             <Route
            path="/dashboard/*"
            element={
              <>
                <div className="">
                  <DashboardRouting />
                </div>
              </>
            }
          />




           <Route
            path="/authentication"
            element={
              <>
                <div className="">
                  <Header />
                  <AuthForm />
                  <Footer />
                </div>
              </>
            }
          />

      <Route path="/authentication/ref/:refId" 
      
         element={
              <>
                <div className="">
                  <Header />
                  <AuthForm />
                  <Footer />
                </div>
              </>
            }
      
      
      />






































        </Routes>
      </Suspense>



          {/* <Suspense fallback={<LoadingModal />}>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <div className="">
                  <Header />
                  <BannerCarousel />
                  <About />
                  <Products />
                  <Article />
                  <VideoSection />
                  <Footer />
                </div>
              </>
            }
          />
        </Routes>
      </Suspense> */}









    </>
  );
};

// Main App Component
const App = () => (
  <div className="">
    <AppContent />
  </div>
);

export default App;
