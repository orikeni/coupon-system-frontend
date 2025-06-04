import { useNavigate } from "react-router-dom";
import Company from "../../Models/Company";
import { JSX } from "react";
import './CompanyCard.css';
import companyService from "../../Service/CompanyService";
import Swal from "sweetalert2";



interface CompanyCardProps {
    company: Company,
    onDelete: (id: number) => void
}

function CompanyCard(companyCardProps: CompanyCardProps,): JSX.Element {
    const navigate = useNavigate();


    async function onRemove(id: number): Promise<void> {
       const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the customer.',
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
        await companyService.deleteCompany(id);
        companyCardProps.onDelete(id);

        Swal.fire({
            title: 'The company has been deleted.',
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
        navigate('/company-details/' + id);
    }

    return (
        <div className='CompanyCard'>
            <div className='card'>
                <div className="card-icon">
                    <i className="bi bi-building"></i>
                </div>                
                <div className="card-content">
                    <h3 className="card-title">{companyCardProps.company.name}</h3>
                    <p className="card-description">{companyCardProps.company.email}</p>
                    <div className="card-buttons">
                        <button className="remove-btn" onClick={() => onRemove(companyCardProps.company.id!)}>Remove</button>
                         <button className="update-btn" onClick={() => onUpdate(companyCardProps.company.id!)}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyCard;