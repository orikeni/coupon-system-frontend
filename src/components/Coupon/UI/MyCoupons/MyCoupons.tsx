import { JSX, useEffect, useState } from "react";
import CouponCard from "../CouponCard/CouponCard";
import { authStore } from "../../../Auth/State/AuthState";
import Coupon from "../../Models/Coupon";
import couponService from "../../Service/CouponService";
import './MyCoupons.css';

function MyCoupons(): JSX.Element {
    const [myCoupons, setMyCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        async function fetchCoupons() {
            const customerId = authStore.getState().user?.id;
            if (customerId !== undefined) {
                const coupons = await couponService.getCustomerCoupons(customerId);
                setMyCoupons(coupons);
            }
        }

        fetchCoupons();
    }, []);

    return (
        <div className="CouponPage">
            <div className="coupon-list">
                {myCoupons.length === 0 ? (
                    <p>You haven't purchased any coupons yet.</p>
                ) : (
                    myCoupons.map(c => <CouponCard key={c.id} coupon={c} onDelete={() => {}} showPurchaseButton={false}/>)
                )}
            </div>
        </div>
    );
}

export default MyCoupons;