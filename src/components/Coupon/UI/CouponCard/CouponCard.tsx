import { JSX } from 'react';
import Coupon from '../../Models/Coupon';
import './CouponCard.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import couponService from '../../Service/CouponService';
import { authStore } from '../../../Auth/State/AuthState';


interface CouponCardProps {
    coupon: Coupon,
    onDelete: (id: number) => void
    showPurchaseButton?: boolean;
}

function CouponCard({ coupon, onDelete, showPurchaseButton = true }: CouponCardProps): JSX.Element {

    const navigate = useNavigate();
    const starDate = new Date(coupon.startDate).toLocaleDateString(); 
    const endDate = new Date(coupon.endDate).toLocaleDateString();

    const roleId = authStore.getState().user?.roleId;



    async function onRemove(id: number): Promise<void> {
        const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the coupon.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        customClass: {
            popup: 'small-swal',
        }
        });

        if (result.isConfirmed) {
        await couponService.deleteCoupon(id);
        onDelete(id);

        Swal.fire({
            title: 'The coupon has been deleted.',
            icon: 'success',
            customClass: {
            popup: 'small-swal',
            title: 'small-swal-title',
            },
            showConfirmButton: false,
            timer: 2000
        });
        }
    }

    async function onUpdate(id: number): Promise<void> {
        navigate('/coupon-details/' + id);
    }

    async function onPurchase(couponId: number): Promise<void> {
        const isConfirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to purchase this coupon?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, purchase it!',
        cancelButtonText: 'Cancel',
        customClass: {
        popup: 'small-swal',
        }
    });

    if (isConfirmed.isConfirmed) {
        try {
            const customerId = authStore.getState().user?.id!;
            await couponService.purchaseCoupon(couponId, customerId);

            Swal.fire({
                title: 'Purchased!',
                text: 'The coupon was successfully purchased.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                popup: 'small-swal',
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'You have already purchased this coupon.',
                icon: 'error',
                customClass: {
                popup: 'small-swal',
                }
            });
        }
    }



  }

    return (
        <div className='CouponCard'>
            <div className='card'>
                <div className="card-icon">
                    <i className="bi bi-ticket-perforated"></i>
                </div>                
                <div className="card-content">
                    <h3 className="card-title">{coupon.title}</h3>
                    <p className="card-description">{coupon.description}</p>
                    <p className="card-description">Company : {coupon.company.name}</p>
                    <p className="card-description">Category : {coupon.category.name}</p>
                    <p className="card-description">Start Date : {starDate}</p>
                    <p className="card-description">End Date : {endDate}</p>
                    <p className="card-description">Amount : {coupon.amount}</p>
                    <p className="card-description">Price : {coupon.price} ₪</p>

                    {roleId === 2 && ( 
                        <div className="card-buttons">
                        <button className="remove-btn" onClick={() => onRemove(coupon.id!)}>Remove</button>
                        <button className="update-btn" onClick={() => onUpdate(coupon.id!)}>Update</button>
                        </div>
                        )}

                    {roleId === 3 && showPurchaseButton && (
                        <div className="card-purchase">
                            <button className="purchase-btn" onClick={() => onPurchase(coupon.id!)}>Purchase</button>
                        </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default CouponCard;