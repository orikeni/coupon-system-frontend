
interface Coupon {
    title: string,
    description: string,
    company: {
    id: number;
    name: string;
    email: string;
  };
    category: {
    id: number;
    name: string;
  };
    startDate: Date,
    endDate: Date,
    amount: number,
    price: number,
    id?: number,

}

export default Coupon;