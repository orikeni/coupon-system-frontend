import type { JSX } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Main from "../LayoutArea/Main/Main";
import RoutingGuard from "./RoutingGuard";
import CompanyPage from "../Company/UI/CompanyPage/CompanyPage";
import CompanyDetails from "../Company/UI/CompanyDetails/CompanyDetails";
import CustomerPage from "../Customer/UI/CustomerPage/CustomerPage";
import CustomerDetails from "../Customer/UI/CustomerDetails/CustomerDetails";
import CouponPage from "../Coupon/UI/CouponPage/CouponPage";
import CouponDetails from "../Coupon/UI/CouponDetails/CouponDetails";
import MyCoupons from "../Coupon/UI/MyCoupons/MyCoupons";
import PageNotFound from "../Exception/PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/main" element={<Main />}/>
                <Route path="/" element={<Main />}/>
                <Route path="/company-page" element={<RoutingGuard child={<CompanyPage />} />}/>
                <Route path="/company-details/:id?" element={<RoutingGuard child={<CompanyDetails />} />}/>
                <Route path="/customer-page" element={<RoutingGuard child={<CustomerPage />} />}/>
                <Route path="/customer-details/:id?" element={<RoutingGuard child={<CustomerDetails />} />}/>
                <Route path="/coupon-page" element={<RoutingGuard child={<CouponPage />} />}/>
                <Route path="/coupon-details/:id?" element={<RoutingGuard child={<CouponDetails />} />}/>
                <Route path="/my-coupons" element={<RoutingGuard child={<MyCoupons />} />}/>
                <Route path="*" element={<PageNotFound />} />


            </Routes>
        </div>
    );
}

export default Routing;