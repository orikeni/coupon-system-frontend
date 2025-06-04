import { JSX, useEffect, useState } from "react";
import { authStore } from "../Auth/State/AuthState";
import companyService from "../Company/Service/CompanyService";
import couponService from "../Coupon/Service/CouponService";
import customerService from "../Customer/Service/CustomerService";
import './Dashboard.css';



function StatCard({ title, value, icon, colorClass }: { title: string, value: number, icon: string, colorClass: string }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${colorClass}`}>
        <i className={icon}></i>
      </div>
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${colorClass}`}>{value ?? '-'}</div>
    </div>
  );
}

function Dashboard(): JSX.Element {
  const roleId = authStore.getState().user?.roleId;
  const userId = authStore.getState().user?.id;
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    async function fetchStats() {
      if (roleId === 1) {
        const customers = await customerService.getCustomerList();
        const companies = await companyService.getCompanyList();
        setStats({ customers: customers.length, companies: companies.length });
      } else if (roleId === 2) {
        const coupons = await couponService.getCouponListByCompany(true, userId!);
        setStats({ coupons: coupons.length });
      } else if (roleId === 3) {
        const myCoupons = await couponService.getCustomerCoupons(userId!);
        setStats({ purchased: myCoupons.length });
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {roleId === 1 && (
        <>
        <h2 className="dashboard-heading">System Overview</h2>
        <p className="dashboard-subheading">Manage your users and companies with real-time stats.</p>
        <div className="stats-container">
          <StatCard title="Total Customers" value={stats.customers} icon="bi bi-person" colorClass="stat-customers" />
          <StatCard title="Total Companies" value={stats.companies} icon="bi bi-building" colorClass="stat-companies" />
          </div>
        </>
      )}
      {roleId === 2 && (
        <>
        <h2 className="dashboard-heading">Company Dashboard</h2>
        <p className="dashboard-subheading">Track your active coupons and performance.</p>
        <div className="stats-container">
        <StatCard title="Your Coupons" value={stats.coupons} icon="bi bi-ticket" colorClass="stat-coupons" />
        </div>
        </>
      )}
      {roleId === 3 && (
        <>
        <h2 className="dashboard-heading">Your Coupon Stats</h2>
        <p className="dashboard-subheading">See how many coupons you’ve purchased and explore new offers.</p>
        <div className="stats-container">
          <StatCard title="Purchased Coupons" value={stats.purchased} icon="bi bi-cart-check" colorClass="stat-purchased" />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;