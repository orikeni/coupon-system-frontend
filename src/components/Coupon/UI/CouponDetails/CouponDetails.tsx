import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Coupon from "../../Models/Coupon";
import couponService from "../../Service/CouponService";
import { couponStore } from "../../Service/CouponState";
import Category from "../../../Category/Models/Category";
import categoryService from "../../../Category/Service/CategoryService";
import { authStore } from "../../../Auth/State/AuthState";
import './CouponDetails.css';

function CouponDetails(): JSX.Element {

  const param = useParams();
  const navigate = useNavigate();
  const { register, watch, handleSubmit, formState, reset, setValue } = useForm<Coupon>();

 const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {

    (async () => {
      const categoryList = await categoryService.getCategoryList();
      setCategoryList(categoryList);
    })();

    if (param.id) {
    const coupon: Coupon | undefined = couponStore.getState().couponList.find(coupon => coupon.id == param.id);
    if (coupon) {
      setValue('title', coupon.title);
      setValue('description', coupon.description);
      setValue('category', coupon.category);
      setValue('startDate', coupon.startDate);
      setValue('endDate', coupon.endDate);
      setValue('amount', coupon.amount);
      setValue('price', coupon.price);
    }
  }
    
    return () => console.log('Destroy');

  }, [param.id, setValue]);


  async function send(coupon: Coupon): Promise<void> {

    const companyId = authStore.getState().user?.id!;
    coupon.company = {
      id: companyId,
      name: "",
      email: ""
    };

    if (param.id) {
       coupon.id = +param.id;
       await couponService.updateCoupon(coupon);
        navigate('/coupon-page');
    }
    else {
      const response = await couponService.addCoupon(coupon, companyId);
      if (response) {
        navigate('/coupon-page');
      }
    }

  }


  return (
    <form onSubmit={handleSubmit(send)} className="my-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Enter Title"
          {...register("title", {
            required: { value: true, message: 'Required' },
            minLength: { value: 2, message: 'Must contain at least 2 characters' }
          })} />
        {formState.errors.title && <span className="error-message">{formState.errors.title?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" id="description" placeholder="Enter Description"
          {...register("description", {
            required: { value: true, message: 'Required' },
            minLength: { value: 2, message: 'Must contain at least 2 characters' }
          })} />
        {formState.errors.description && <span className="error-message">{formState.errors.description?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category </label>
        <select
            id="category"
            onChange={(e) => {
            const selectedId = parseInt(e.target.value);
            const selectedCategory = categoryList.find((cat) => cat.id === selectedId);
            setValue("category", selectedCategory!);
            }}
        >
            <option value="">Select category</option>
            {categoryList.map((cat) => (
            <option key={cat.id} value={cat.id}>
                {cat.name}
            </option>
            ))}
        </select>
        {formState.errors.category && <span className="error-message">{formState.errors.category?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" placeholder="Select start date"
          {...register("startDate", {
            required: { value: true, message: 'Required' },
            validate: (value) => {
              const today = new Date();
              const selectedDate = new Date(value);
              today.setHours(0, 0, 0, 0);
              selectedDate.setHours(0, 0, 0, 0);
              return selectedDate >= today || "Start date must be today or in the future";
            }
          })} />
        {formState.errors.startDate && <span className="error-message">{formState.errors.startDate?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" placeholder="Select end date"
          {...register("endDate", {
            required: { value: true, message: 'Required' },
            validate: (value) => {
              const start = new Date(watch("startDate"));
              const end = new Date(value);
              start.setHours(0, 0, 0, 0);
              end.setHours(0, 0, 0, 0);
              return end > start || "End date must be after start date";
            }
          })} />
        {formState.errors.endDate && <span className="error-message">{formState.errors.endDate?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" placeholder="Enter amount"
          {...register("amount", { 
            required: { value: true, message: 'Required' } ,
            })} />
        {formState.errors.amount && <span className="error-message">{formState.errors.amount?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="price">Price </label>
        <input type="number" id="price" placeholder="Enter price"
          {...register("price", { 
            required: { value: true, message: 'Required' } ,
            })} />
        {formState.errors.price && <span className="error-message">{formState.errors.price?.message}</span>}
      </div>
      <button>{param.id ? 'Update' : 'Add'}</button>
    </form>
  );
}


export default CouponDetails;