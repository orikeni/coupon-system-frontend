import { JSX, useEffect, useState } from 'react';
import './CouponList.css';
import Coupon from '../../Models/Coupon';
import { authStore } from '../../../Auth/State/AuthState';
import couponService from '../../Service/CouponService';
import { couponStore } from '../../Service/CouponState';
import CouponCard from '../CouponCard/CouponCard';
import { Circles } from 'react-loader-spinner';

interface CouponListProps {
 companyId: number;
 categoryId?: number | null;
 maxPrice?: number | null;
}

function CouponList({companyId, categoryId, maxPrice}: CouponListProps): JSX.Element {
    
    const [couponList, setCouponList] = useState<Coupon[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const roleId = authStore.getState().user?.roleId
 
    useEffect(() => {
       (async function getCouponList() {
          if (roleId === 2 || (roleId === 3 && companyId !== null)) {
                const list = await couponService.getCouponListByCompany(true, companyId);

                let filteredList = list;

                if (categoryId) {
                filteredList = filteredList.filter(coupon => coupon.category.id === categoryId);}

                if (maxPrice !== null && maxPrice !== undefined) {
                filteredList = filteredList.filter(coupon => coupon.price <= maxPrice);} 

                setCouponList(filteredList);
            }
          setLoading(false);
       })();

      const unsubscribe = couponStore.subscribe(() => {
      let  updatedList = couponStore.getState().couponList;

      if (categoryId) {
            updatedList = updatedList.filter(coupon => coupon.category.id === categoryId);
        }
        if (maxPrice !== null && maxPrice !== undefined) {
            updatedList = updatedList.filter(coupon => coupon.price <= maxPrice);
        }
      setCouponList([...updatedList]);
  });
 
       return () => unsubscribe();
 
    }, [companyId, categoryId, maxPrice]);
 
  function onDelete(id: number) {
        setCouponList([...couponStore.getState().couponList]);
     }
 
 
    return (
       <div className="List">
         {isLoading && (
            <div className="spinner-container">
               <Circles
                  height="60"
                  width="60"
                  color="#4f46e5"
                  ariaLabel="loading"
               />
            </div>
            )}
         <div className="row">
            {!isLoading &&
               couponList.map((coupon) => (
               <CouponCard key={coupon.id} coupon={coupon} onDelete={onDelete} />
               ))}
         </div>
      </div>
   );
 }
 
 export default CouponList;