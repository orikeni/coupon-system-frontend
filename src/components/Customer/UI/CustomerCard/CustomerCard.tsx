import { useNavigate } from "react-router-dom";
import Customer from "../../Models/Customer";
import Swal from "sweetalert2";
import { JSX } from "react";
import customerService from "../../Service/CustomerService";
import './CustomerCard.css';

interface CustomerCardProps {
    customer: Customer,
    onDelete: (id: number) => void
}

function CustomerCard(customerCardProps: CustomerCardProps,): JSX.Element {
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
        await customerService.deleteCustomer(id);
        customerCardProps.onDelete(id);

        Swal.fire({
            title: 'The customer has been deleted.',
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
        navigate('/customer-details/' + id);
    }

    return (
        <div className='CustomerCard'>
            <div className='card'>
                <div className="card-icon">
                    <i className="bi bi-person-circle"></i>
                </div>                
                <div className="card-content">
                    <h3 className="card-title">{customerCardProps.customer.firstName + " " + customerCardProps.customer.lastName}</h3>
                    <p className="card-description">{customerCardProps.customer.email}</p>
                    <div className="card-buttons">
                        <button className="remove-btn" onClick={() => onRemove(customerCardProps.customer.id!)}>Remove</button>
                        <button className="update-btn" onClick={() => onUpdate(customerCardProps.customer.id!)}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerCard;