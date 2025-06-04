import { JSX, useEffect, useState } from 'react';
import './CouponPage.css';
import { authStore } from '../../../Auth/State/AuthState';
import Company from '../../../Company/Models/Company';
import companyService from '../../../Company/Service/CompanyService';
import CouponList from '../CouponList/CouponList';
import { useNavigate } from 'react-router-dom';
import Category from '../../../Category/Models/Category';
import categoryService from '../../../Category/Service/CategoryService';


function CouponPage(): JSX.Element {
    const roleId = authStore.getState().user?.roleId;
    const [companyList, setcompanyList] = useState<Company[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        async function getCompanyList() {
            if (roleId === 3) { 
                const list = await companyService.getCompanyList(); 
                setcompanyList(list);
                setSelectedCompanyId(list[0]?.id ?? null); 

                const categories = await categoryService.getCategoryList();
                setCategoryList(categories);
            }

            if (roleId === 2) {
                const companyId = authStore.getState().user?.id!;
                setSelectedCompanyId(companyId);
            }
        }
        getCompanyList();
    }, []);


    function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const id = parseInt(e.target.value);
        setSelectedCompanyId(id);
    }

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const val = +e.target.value;
        setSelectedCategoryId(val === -1 ? null : val);
    }

    function handleMaxPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setMaxPrice(val ? +val : null);
    }

    function addCoupon(): void {
        navigate("/coupon-details");
    }

    return (
        <div className="CouponPage">
            <div className="filters">
            {roleId === 3 && (
                <>
                <select onChange={handleSelectChange} value={selectedCompanyId ?? ""}>
                    {companyList.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>

                <select onChange={handleCategoryChange} value={selectedCategoryId ?? -1}>
                            <option value={-1}>All Categories</option>
                            {categoryList.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Max Price"
                            onChange={handleMaxPriceChange}
                            value={maxPrice ?? ""}
                        />
                </>
            )}

            {roleId === 2 && (
                <button onClick={addCoupon} className="add-item-btn">
                    <span className="icon">+</span> Add Coupon
                </button>
            )}

            {selectedCompanyId !== null && (
                    <CouponList
                    companyId={selectedCompanyId}
                    categoryId={selectedCategoryId}
                    maxPrice={maxPrice}
                />            )}
            </div>
        </div>
    );
}

export default CouponPage;