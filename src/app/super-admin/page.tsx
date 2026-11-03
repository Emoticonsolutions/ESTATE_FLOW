'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Building,
  Users,
  CreditCard,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Power,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Receipt,
  Download,
  Send,
  Eye,
  Key,
  Edit,
  ExternalLink,
  Lock,
  Clock,
  Sparkles,
  Server,
  Database,
  Radio,
  FileText,
  UserCheck,
  Building2,
  X,
  AlertCircle,
  Check,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';

interface TenantCompany {
  id: string;
  name: string;
  code: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Suspended' | 'Trial';
  userLimit: number;
  usersCount: number;
  projectLimit: number;
  projectsCount: number;
  unitsCount: number;
  contactEmail: string;
  phone: string;
  city: string;
  adminName: string;
  adminEmail: string;
  monthlyFee: number;
  billingCycle: 'Monthly' | 'Annual';
  nextRenewalDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  joinedDate: string;
}

interface TenantAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId: string;
  companyName: string;
  designation: string;
  department: string;
  assignedProjectsCount: number;
  status: 'Active' | 'Suspended';
  lastLogin: string;
  tempPass: string;
  joinedDate: string;
}

interface SaaSPlan {
  id: string;
  name: 'Starter' | 'Professional' | 'Enterprise';
  priceMonthly: number;
  priceAnnualMonthly: number;
  userLimit: number;
  projectLimit: number;
  storageGB: number;
  whatsappQuota: number;
  aiAssistant: boolean;
  activeTenantsCount: number;
  description: string;
  features: string[];
}

interface SaaSInvoice {
  id: string;
  invoiceNumber: string;
  companyId: string;
  companyName: string;
  planName: string;
  billingPeriod: string;
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod: string;
  paymentRef?: string;
}

export default function SuperAdminPage() {
  const router = useRouter();
  const { setCompanyId, setRole } = useTenant();

  // Tab State
  const [activeTab, setActiveTab] = useState<'companies' | 'admins' | 'subscriptions' | 'invoices' | 'audit' | 'settings'>('companies');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('All');

  // Modals
  const [provisionModalOpen, setProvisionModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<SaaSInvoice | null>(null);
  const [selectedAdminForCredentials, setSelectedAdminForCredentials] = useState<TenantAdmin | null>(null);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [selectedCompanyForSub, setSelectedCompanyForSub] = useState<TenantCompany | null>(null);

  // Success Notification banner
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const showBanner = (msg: string) => {
    setBannerMessage(msg);
    setTimeout(() => setBannerMessage(null), 3500);
  };

  // 1. Initial Tenant Companies Data
  const [companies, setCompanies] = useState<TenantCompany[]>([
    {
      id: 'comp-prestige',
      name: 'Prestige Estates Projects Ltd',
      code: 'PRESTIGE',
      plan: 'Enterprise',
      status: 'Active',
      userLimit: 50,
      usersCount: 42,
      projectLimit: 25,
      projectsCount: 8,
      unitsCount: 480,
      contactEmail: 'crm-admin@prestigeconstructions.com',
      phone: '+91 80 2559 1080',
      city: 'Bangalore',
      adminName: 'Vikramaditya Rao',
      adminEmail: 'vikram.rao@prestigeconstructions.com',
      monthlyFee: 89999,
      billingCycle: 'Annual',
      nextRenewalDate: '2027-01-15',
      paymentStatus: 'Paid',
      joinedDate: '2024-01-15',
    },
    {
      id: 'comp-godrej',
      name: 'Godrej Skyline Developers',
      code: 'GODREJ',
      plan: 'Professional',
      status: 'Active',
      userLimit: 20,
      usersCount: 18,
      projectLimit: 10,
      projectsCount: 4,
      unitsCount: 220,
      contactEmail: 'support@godrejskyline.com',
      phone: '+91 22 6796 5656',
      city: 'Mumbai',
      adminName: 'Priya Nair',
      adminEmail: 'priya.nair@godrejskyline.com',
      monthlyFee: 34999,
      billingCycle: 'Monthly',
      nextRenewalDate: '2026-11-20',
      paymentStatus: 'Paid',
      joinedDate: '2024-03-20',
    },
    {
      id: 'comp-urbannest',
      name: 'Urban Nest Properties',
      code: 'URBAN',
      plan: 'Starter',
      status: 'Active',
      userLimit: 5,
      usersCount: 5,
      projectLimit: 2,
      projectsCount: 2,
      unitsCount: 80,
      contactEmail: 'sales@urbannest.in',
      phone: '+91 11 4152 7890',
      city: 'Gurugram',
      adminName: 'Rajesh Khurana',
      adminEmail: 'rajesh.k@urbannest.in',
      monthlyFee: 14999,
      billingCycle: 'Monthly',
      nextRenewalDate: '2026-11-10',
      paymentStatus: 'Pending',
      joinedDate: '2024-05-10',
    },
    {
      id: 'comp-sobha',
      name: 'Sobha Luxury Heights',
      code: 'SOBHA',
      plan: 'Professional',
      status: 'Active',
      userLimit: 20,
      usersCount: 12,
      projectLimit: 10,
      projectsCount: 3,
      unitsCount: 140,
      contactEmail: 'corp@sobhahomes.in',
      phone: '+91 40 4011 2233',
      city: 'Hyderabad',
      adminName: 'Tarun Varma',
      adminEmail: 'tarun.varma@sobhahomes.in',
      monthlyFee: 34999,
      billingCycle: 'Monthly',
      nextRenewalDate: '2026-10-25',
      paymentStatus: 'Overdue',
      joinedDate: '2024-07-01',
    },
  ]);

  // 2. Initial Tenant Admins Data
  const [tenantAdmins, setTenantAdmins] = useState<TenantAdmin[]>([
    {
      id: 'adm-1',
      name: 'Vikramaditya Rao',
      email: 'vikram.rao@prestigeconstructions.com',
      phone: '+91 98450 78901',
      companyId: 'comp-prestige',
      companyName: 'Prestige Estates Projects Ltd',
      designation: 'Managing Director & VP Sales',
      department: 'Executive Leadership',
      assignedProjectsCount: 8,
      status: 'Active',
      lastLogin: 'Today, 08:42 AM',
      tempPass: 'admin123',
      joinedDate: '2024-01-15',
    },
    {
      id: 'adm-2',
      name: 'Priya Nair',
      email: 'priya.nair@godrejskyline.com',
      phone: '+91 98200 45678',
      companyId: 'comp-godrej',
      companyName: 'Godrej Skyline Developers',
      designation: 'Head of Operations & Co-Founder',
      department: 'Corporate Strategy',
      assignedProjectsCount: 4,
      status: 'Active',
      lastLogin: 'Yesterday, 06:15 PM',
      tempPass: 'admin123',
      joinedDate: '2024-03-20',
    },
    {
      id: 'adm-3',
      name: 'Rajesh Khurana',
      email: 'rajesh.k@urbannest.in',
      phone: '+91 98111 89234',
      companyId: 'comp-urbannest',
      companyName: 'Urban Nest Properties',
      designation: 'Managing Partner',
      department: 'Executive Management',
      assignedProjectsCount: 2,
      status: 'Active',
      lastLogin: '2 days ago',
      tempPass: 'admin123',
      joinedDate: '2024-05-10',
    },
    {
      id: 'adm-4',
      name: 'Tarun Varma',
      email: 'tarun.varma@sobhahomes.in',
      phone: '+91 98490 11223',
      companyId: 'comp-sobha',
      companyName: 'Sobha Luxury Heights',
      designation: 'VP Commercial Sales',
      department: 'Sales & Expansion',
      assignedProjectsCount: 3,
      status: 'Active',
      lastLogin: '4 days ago',
      tempPass: 'admin123',
      joinedDate: '2024-07-01',
    },
  ]);

  // 3. SaaS Plans
  const [plans, setPlans] = useState<SaaSPlan[]>([
    {
      id: 'plan-starter',
      name: 'Starter',
      priceMonthly: 14999,
      priceAnnualMonthly: 11999,
      userLimit: 5,
      projectLimit: 2,
      storageGB: 25,
      whatsappQuota: 1000,
      aiAssistant: false,
      activeTenantsCount: 1,
      description: 'Ideal for boutique builders & localized developer launches.',
      features: [
        '5 User Seats included',
        '2 Active Projects & Towers',
        'Omni-Channel Lead Ingestion',
        'Visual Tower Floor Stacking',
        'Standard Email Notifications',
      ],
    },
    {
      id: 'plan-pro',
      name: 'Professional',
      priceMonthly: 34999,
      priceAnnualMonthly: 27999,
      userLimit: 20,
      projectLimit: 10,
      storageGB: 100,
      whatsappQuota: 10000,
      aiAssistant: true,
      activeTenantsCount: 2,
      description: 'Designed for fast-growing developers with active sales teams.',
      features: [
        '20 User Seats included',
        '10 Active Projects & Towers',
        'Meta WhatsApp Cloud API Integration',
        'Round-Robin Lead Assignment',
        'Milestone Payment Schedules & Stamped Receipts',
        'Broker Commission Payout Approval Flow',
      ],
    },
    {
      id: 'plan-enterprise',
      name: 'Enterprise',
      priceMonthly: 89999,
      priceAnnualMonthly: 71999,
      userLimit: 50,
      projectLimit: 25,
      storageGB: 1000,
      whatsappQuota: 50000,
      aiAssistant: true,
      activeTenantsCount: 1,
      description: 'Full-scale enterprise operating system for top real estate developers.',
      features: [
        '50+ User Seats (Custom Scalable)',
        'Unlimited Towers & Inventory Stacking',
        'AI Sales Assistant & 0-100 Lead Intent Scoring',
        'Dedicated RERA Escrow Audit Trails',
        'Custom Roles & Granular RBAC Matrix',
        '99.9% Uptime SLA & 24/7 Dedicated Support',
      ],
    },
  ]);

  // 4. SaaS Monthly Invoices
  const [invoices, setInvoices] = useState<SaaSInvoice[]>([
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-11-001',
      companyId: 'comp-prestige',
      companyName: 'Prestige Estates Projects Ltd',
      planName: 'Enterprise',
      billingPeriod: 'Nov 01 - Nov 30, 2026',
      baseAmount: 89999,
      gstAmount: 16199.82,
      totalAmount: 106198.82,
      dueDate: '2026-11-05',
      paidDate: '2026-11-01',
      status: 'Paid',
      paymentMethod: 'Razorpay Auto-Debit (Corporate HDFC)',
      paymentRef: 'rzp_pay_99812A980',
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2026-11-002',
      companyId: 'comp-godrej',
      companyName: 'Godrej Skyline Developers',
      planName: 'Professional',
      billingPeriod: 'Nov 01 - Nov 30, 2026',
      baseAmount: 34999,
      gstAmount: 6299.82,
      totalAmount: 41298.82,
      dueDate: '2026-11-10',
      paidDate: '2026-11-02',
      status: 'Paid',
      paymentMethod: 'Bank Transfer (NEFT)',
      paymentRef: 'NEFT-ICIC-20261102-881',
    },
    {
      id: 'inv-3',
      invoiceNumber: 'INV-2026-11-003',
      companyId: 'comp-urbannest',
      companyName: 'Urban Nest Properties',
      planName: 'Starter',
      billingPeriod: 'Nov 01 - Nov 30, 2026',
      baseAmount: 14999,
      gstAmount: 2699.82,
      totalAmount: 17698.82,
      dueDate: '2026-11-10',
      status: 'Pending',
      paymentMethod: 'Razorpay Mandate (Pending Authorization)',
    },
    {
      id: 'inv-4',
      invoiceNumber: 'INV-2026-10-004',
      companyId: 'comp-sobha',
      companyName: 'Sobha Luxury Heights',
      planName: 'Professional',
      billingPeriod: 'Oct 01 - Oct 31, 2026',
      baseAmount: 34999,
      gstAmount: 6299.82,
      totalAmount: 41298.82,
      dueDate: '2026-10-25',
      status: 'Overdue',
      paymentMethod: 'Corporate Cheque (Awaiting Clearance)',
    },
    {
      id: 'inv-5',
      invoiceNumber: 'INV-2026-10-001',
      companyId: 'comp-prestige',
      companyName: 'Prestige Estates Projects Ltd',
      planName: 'Enterprise',
      billingPeriod: 'Oct 01 - Oct 31, 2026',
      baseAmount: 89999,
      gstAmount: 16199.82,
      totalAmount: 106198.82,
      dueDate: '2026-10-05',
      paidDate: '2026-10-03',
      status: 'Paid',
      paymentMethod: 'Razorpay Auto-Debit',
      paymentRef: 'rzp_pay_88712A101',
    },
  ]);

  // 5. New Tenant Provisioning Form State
  const [provisionForm, setProvisionForm] = useState({
    companyName: '',
    code: '',
    city: 'Bangalore',
    phone: '',
    email: '',
    plan: 'Professional' as 'Starter' | 'Professional' | 'Enterprise',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    userLimit: 20,
    projectLimit: 10,
  });

  // KPI Calculations
  const metrics = useMemo(() => {
    const totalMRR = companies.reduce((acc, c) => acc + (c.status === 'Active' ? c.monthlyFee : 0), 0);
    const totalARR = totalMRR * 12;
    const pendingAmount = invoices
      .filter((i) => i.status === 'Pending' || i.status === 'Overdue')
      .reduce((acc, i) => acc + i.totalAmount, 0);
    const totalUsers = companies.reduce((acc, c) => acc + c.usersCount, 0);
    const totalUnits = companies.reduce((acc, c) => acc + c.unitsCount, 0);
    const activeTenants = companies.filter((c) => c.status === 'Active').length;

    return { totalMRR, totalARR, pendingAmount, totalUsers, totalUnits, activeTenants };
  }, [companies, invoices]);

  // Action: 1-Click Impersonate Tenant
  const handleImpersonateTenant = (company: TenantCompany) => {
    setCompanyId(company.id as any);
    setRole('COMPANY_ADMIN');
    showBanner(`Logged in as Tenant Owner of "${company.name}". Switching to Live CRM...`);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  // Action: Toggle Company Status
  const handleToggleCompanyStatus = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === companyId) {
          const nextStatus = c.status === 'Active' ? 'Suspended' : 'Active';
          showBanner(`Tenant "${c.name}" status changed to ${nextStatus}.`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  // Action: Mark Invoice Paid
  const handleMarkInvoicePaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          showBanner(`Invoice ${inv.invoiceNumber} marked as Paid!`);
          return {
            ...inv,
            status: 'Paid',
            paidDate: new Date().toISOString().split('T')[0],
            paymentRef: `MANUAL-SUPERADMIN-${Date.now().toString().slice(-6)}`,
          };
        }
        return inv;
      })
    );
  };

  // Action: Send Payment Reminder
  const handleSendReminder = (invoice: SaaSInvoice) => {
    showBanner(`WhatsApp & Email payment reminder dispatched to ${invoice.companyName} accounting team.`);
  };

  // Action: Provision New Tenant Submit
  const handleProvisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `comp-${provisionForm.code.toLowerCase()}`;
    const monthlyFee =
      provisionForm.plan === 'Starter' ? 14999 : provisionForm.plan === 'Professional' ? 34999 : 89999;

    const newCompany: TenantCompany = {
      id: newId,
      name: provisionForm.companyName,
      code: provisionForm.code.toUpperCase(),
      plan: provisionForm.plan,
      status: 'Active',
      userLimit: provisionForm.userLimit,
      usersCount: 1,
      projectLimit: provisionForm.projectLimit,
      projectsCount: 1,
      unitsCount: 50,
      contactEmail: provisionForm.email,
      phone: provisionForm.phone,
      city: provisionForm.city,
      adminName: provisionForm.adminName,
      adminEmail: provisionForm.adminEmail,
      monthlyFee,
      billingCycle: 'Monthly',
      nextRenewalDate: '2026-12-04',
      paymentStatus: 'Paid',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    const newAdmin: TenantAdmin = {
      id: `adm-${Date.now()}`,
      name: provisionForm.adminName,
      email: provisionForm.adminEmail,
      phone: provisionForm.adminPhone || provisionForm.phone,
      companyId: newId,
      companyName: provisionForm.companyName,
      designation: 'Managing Director & VP Sales',
      department: 'Executive Management',
      assignedProjectsCount: 1,
      status: 'Active',
      lastLogin: 'Never (Just Provisioned)',
      tempPass: 'admin123',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setCompanies([newCompany, ...companies]);
    setTenantAdmins([newAdmin, ...tenantAdmins]);
    setProvisionModalOpen(false);
    showBanner(`Developer tenant "${newCompany.name}" onboarded successfully with 1 Admin account!`);
  };

  // Filtered Companies
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchPlan = planFilter === 'All' || c.plan === planFilter;
      return matchSearch && matchStatus && matchPlan;
    });
  }, [companies, searchQuery, statusFilter, planFilter]);

  // Filtered Admins
  const filteredAdmins = useMemo(() => {
    return tenantAdmins.filter((a) => {
      return (
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [tenantAdmins, searchQuery]);

  // Filtered Invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchSearch =
        inv.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = invoiceStatusFilter === 'All' || inv.status === invoiceStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [invoices, searchQuery, invoiceStatusFilter]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#263445]">
      {/* Platform Owner Header */}
      <header className="bg-[#17324D] text-white border-b border-[#244761] sticky top-0 z-40 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between gap-4">
            {/* Left: Brand & Authority */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg">
                <ShieldAlert size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-white">
                    ESTATE<span className="text-[#3478C9]">FLOW</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                    SaaS Platform Owner Console
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Global Multi-Tenant Authority • All Developer Accounts, Subscriptions & Invoicing
                </p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setProvisionModalOpen(true)}
                className="h-9 px-4 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus size={15} />
                <span>Provision Builder Tenant</span>
              </button>

              <Link
                href="/dashboard"
                className="h-9 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <span>Live Company CRM</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/"
                className="h-9 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <span>Public Site</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Global Notification Banner */}
      {bannerMessage && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-2.5 px-6 text-center shadow-inner flex items-center justify-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} />
          <span>{bannerMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Platform Revenue & Growth Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Monthly SaaS MRR</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <TrendingUp size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#17324D] mt-2">
              ₹{(metrics.totalMRR / 100000).toFixed(2)} Lakhs
            </p>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
              +18.4% MoM platform expansion
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Pending SaaS Payments</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-amber-600 mt-2">
              ₹{(metrics.pendingAmount).toLocaleString('en-IN')}
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">
              2 Accounts awaiting clearance
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Active Builder Tenants</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Building2 size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#17324D] mt-2">
              {metrics.activeTenants} Developers
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {companies.length} Total Registered
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Active Users</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Users size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#17324D] mt-2">
              {metrics.totalUsers} Accounts
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Across all company portals
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Real Estate Inventory</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Layers size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#17324D] mt-2">
              {metrics.totalUnits} Units
            </p>
            <span className="text-[11px] text-teal-600 font-bold mt-1 block">
              Active in Visual Stacking
            </span>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
            {[
              { id: 'companies', label: 'Tenant Companies (Builders)', count: companies.length, icon: Building },
              { id: 'admins', label: 'Company Admins & Profiles', count: tenantAdmins.length, icon: UserCheck },
              { id: 'subscriptions', label: 'Subscription Manager', count: plans.length, icon: CreditCard },
              { id: 'invoices', label: 'Monthly SaaS Billing & Dues', count: invoices.filter(i => i.status !== 'Paid').length, icon: Receipt, badgeColor: 'bg-amber-100 text-amber-800' },
              { id: 'audit', label: 'Platform Audit Trail', icon: ShieldAlert },
              { id: 'settings', label: 'Cloud Infrastructure & Health', icon: Server },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#17324D] text-white shadow-sm font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-teal-400' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        tab.badgeColor || (isActive ? 'bg-slate-800 text-teal-300' : 'bg-slate-100 text-slate-600')
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: Registered Tenant Companies */}
        {activeTab === 'companies' && (
          <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-[#17324D]">Registered Real Estate Developers</h2>
                <p className="text-xs text-slate-500">
                  Manage multi-tenant developer isolation, active subscriptions, seat allocations, and 1-click company impersonation.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search developer, code, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  />
                </div>

                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                >
                  <option value="All">All Plans</option>
                  <option value="Enterprise">Enterprise Tier</option>
                  <option value="Professional">Professional Tier</option>
                  <option value="Starter">Starter Tier</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active Tenants</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Companies Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Developer & Code</th>
                    <th className="py-3.5 px-4">Headquarters</th>
                    <th className="py-3.5 px-4">Active Plan & Fee</th>
                    <th className="py-3.5 px-4">User Seats Quota</th>
                    <th className="py-3.5 px-4">Project & Units</th>
                    <th className="py-3.5 px-4">Primary Admin</th>
                    <th className="py-3.5 px-4">SaaS Billing</th>
                    <th className="py-3.5 px-4">Tenant Status</th>
                    <th className="py-3.5 px-4 text-right">Super Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCompanies.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors h-14">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#17324D] text-white flex items-center justify-center font-bold text-xs">
                            {c.code.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{c.name}</p>
                            <span className="text-[10px] font-mono text-[#3478C9] font-bold">{c.code}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{c.city}</td>
                      <td className="py-3.5 px-4">
                        <div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              c.plan === 'Enterprise'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : c.plan === 'Professional'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {c.plan} Tier
                          </span>
                          <span className="text-[11px] text-slate-500 font-bold block mt-0.5">
                            ₹{c.monthlyFee.toLocaleString('en-IN')}/mo
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-semibold">
                            <span>{c.usersCount} / {c.userLimit} Seats</span>
                            <span className="text-slate-400 font-mono">
                              {Math.round((c.usersCount / c.userLimit) * 100)}%
                            </span>
                          </div>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                c.usersCount >= c.userLimit ? 'bg-rose-500' : 'bg-teal-500'
                              }`}
                              style={{ width: `${Math.min(100, (c.usersCount / c.userLimit) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-800">{c.projectsCount} Projects</p>
                        <span className="text-[11px] text-slate-400 font-mono">{c.unitsCount} Units Tracked</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-900">{c.adminName}</p>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[140px]">{c.adminEmail}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.paymentStatus === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : c.paymentStatus === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {c.paymentStatus}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                          Renews {c.nextRenewalDate}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Impersonate Button */}
                          <button
                            onClick={() => handleImpersonateTenant(c)}
                            className="px-2.5 py-1.5 bg-[#3478C9] hover:bg-blue-600 text-white rounded text-[11px] font-bold shadow-xs transition-all flex items-center gap-1"
                            title="Log in directly as this tenant's owner"
                          >
                            <ExternalLink size={12} />
                            <span>Impersonate</span>
                          </button>

                          {/* Subscription Modal Trigger */}
                          <button
                            onClick={() => {
                              setSelectedCompanyForSub(c);
                              setSubscriptionModalOpen(true);
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                            title="Upgrade / Modify Subscription Plan"
                          >
                            <CreditCard size={14} />
                          </button>

                          {/* Toggle Active / Suspend */}
                          <button
                            onClick={() => handleToggleCompanyStatus(c.id)}
                            className={`p-1.5 rounded text-white transition-colors ${
                              c.status === 'Active'
                                ? 'bg-rose-600 hover:bg-rose-700'
                                : 'bg-emerald-600 hover:bg-emerald-700'
                            }`}
                            title={c.status === 'Active' ? 'Suspend Tenant Access' : 'Reactivate Tenant'}
                          >
                            <Power size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Company Admins & Profiles */}
        {activeTab === 'admins' && (
          <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-[#17324D]">Tenant Administrators & Developer Owners</h2>
                <p className="text-xs text-slate-500">
                  Inspect tenant administrator identities, verified passwords, associated developer portfolios, and 1-click admin login.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search admin name, email, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  />
                </div>

                <button
                  onClick={() => setAdminModalOpen(true)}
                  className="h-9 px-3.5 bg-[#17324D] hover:bg-[#244761] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Plus size={14} />
                  <span>Add Tenant Admin</span>
                </button>
              </div>
            </div>

            {/* Admins Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Admin Profile</th>
                    <th className="py-3.5 px-4">Developer Company</th>
                    <th className="py-3.5 px-4">Designation & Department</th>
                    <th className="py-3.5 px-4">Direct Contact</th>
                    <th className="py-3.5 px-4">Assigned Projects</th>
                    <th className="py-3.5 px-4">Last Activity</th>
                    <th className="py-3.5 px-4">Credentials</th>
                    <th className="py-3.5 px-4 text-right">Super Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredAdmins.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-50/70 transition-colors h-14">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#17324D] to-[#3478C9] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            {adm.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{adm.name}</p>
                            <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded font-semibold border border-teal-200">
                              Company Admin
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-800">{adm.companyName}</p>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {adm.companyId}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-900">{adm.designation}</p>
                        <span className="text-[10px] text-slate-400">{adm.department}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Mail size={12} className="text-[#3478C9]" />
                            <span>{adm.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                            <Phone size={12} className="text-teal-600" />
                            <span>{adm.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {adm.assignedProjectsCount} Active Projects
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-700 font-medium">{adm.lastLogin}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">Member since {adm.joinedDate}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => setSelectedAdminForCredentials(adm)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-mono font-bold flex items-center gap-1 border border-slate-200"
                        >
                          <Key size={12} className="text-amber-600" />
                          <span>View Password</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setCompanyId(adm.companyId as any);
                              setRole('COMPANY_ADMIN');
                              showBanner(`Logged in as Admin "${adm.name}". Opening Company Dashboard...`);
                              setTimeout(() => router.push('/dashboard'), 600);
                            }}
                            className="px-2.5 py-1.5 bg-[#17324D] hover:bg-[#244761] text-white rounded text-[11px] font-bold shadow-xs transition-all flex items-center gap-1"
                            title="Direct Login as this Admin"
                          >
                            <UserCheck size={12} />
                            <span>Login As</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Subscription Manager */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {/* SaaS Tiers Matrix */}
            <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-[#17324D]">SaaS Subscription Tier Quotas</h2>
                  <p className="text-xs text-slate-500">
                    Define limits for user seats, active property towers, WhatsApp Cloud API volume, and AI co-pilot features.
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg">
                  Currency: INR (₹) • Tax: 18% GST Applicable
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-2xl p-6 border relative flex flex-col justify-between transition-all ${
                      p.name === 'Enterprise'
                        ? 'border-purple-300 ring-2 ring-purple-100 bg-gradient-to-b from-white to-purple-50/20'
                        : p.name === 'Professional'
                        ? 'border-blue-300 ring-2 ring-blue-100 bg-gradient-to-b from-white to-blue-50/20'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{p.name} Tier</span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                          {p.activeTenantsCount} Active {p.activeTenantsCount === 1 ? 'Tenant' : 'Tenants'}
                        </span>
                      </div>

                      <div className="mt-3 mb-2">
                        <span className="text-3xl font-black text-[#17324D]">
                          ₹{p.priceMonthly.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 font-medium"> / month</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-4">{p.description}</p>

                      <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs font-semibold text-slate-700 mb-4 border border-slate-100">
                        <div className="flex justify-between">
                          <span className="text-slate-500">User Seats:</span>
                          <span className="font-bold">{p.userLimit} Accounts</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Active Projects:</span>
                          <span className="font-bold">{p.projectLimit} Portfolios</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Cloud Storage:</span>
                          <span className="font-bold">{p.storageGB} GB Vault</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">WhatsApp Messages:</span>
                          <span className="font-bold">{p.whatsappQuota.toLocaleString('en-IN')}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">AI Sales Co-Pilot:</span>
                          <span className={p.aiAssistant ? 'text-teal-600 font-bold' : 'text-slate-400'}>
                            {p.aiAssistant ? 'Included' : 'Not Included'}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-xs text-slate-600">
                        {p.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Check size={14} className="text-teal-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => showBanner(`Plan "${p.name}" configuration saved.`)}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all"
                      >
                        Edit Plan Quotas
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Monthly SaaS Invoices & Pending Payments */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-[#17324D]">Monthly SaaS Billing & Dues Collection</h2>
                <p className="text-xs text-slate-500">
                  Track subscription realization, pending developer dues, overdue payments, and issue legal GST tax invoices.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search invoice # or developer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
                  />
                </div>

                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
                  {['All', 'Paid', 'Pending', 'Overdue'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setInvoiceStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-md transition-all ${
                        invoiceStatusFilter === s
                          ? 'bg-white text-[#17324D] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Invoice #</th>
                    <th className="py-3.5 px-4">Developer Tenant</th>
                    <th className="py-3.5 px-4">Plan & Billing Period</th>
                    <th className="py-3.5 px-4">Base Fee</th>
                    <th className="py-3.5 px-4">GST (18%)</th>
                    <th className="py-3.5 px-4">Total Payable</th>
                    <th className="py-3.5 px-4">Due Date</th>
                    <th className="py-3.5 px-4">Payment Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors h-14">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#3478C9]">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{inv.companyName}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{inv.paymentMethod}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800">{inv.planName} Tier</span>
                        <span className="text-[10px] text-slate-500 block font-mono">{inv.billingPeriod}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        ₹{inv.baseAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        ₹{inv.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#17324D] text-sm">
                        ₹{inv.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        {inv.dueDate}
                        {inv.paidDate && (
                          <span className="text-[10px] text-emerald-600 block">Paid on {inv.paidDate}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : inv.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View GST Tax Invoice */}
                          <button
                            onClick={() => {
                              setSelectedInvoice(inv);
                              setInvoiceModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-bold transition-all flex items-center gap-1 border border-slate-200"
                            title="Generate Official GST Tax Invoice"
                          >
                            <FileText size={12} className="text-[#3478C9]" />
                            <span>Tax Invoice</span>
                          </button>

                          {/* Send Reminder (if pending/overdue) */}
                          {inv.status !== 'Paid' && (
                            <button
                              onClick={() => handleSendReminder(inv)}
                              className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded text-[11px] font-bold transition-all flex items-center gap-1"
                              title="Send Reminder on WhatsApp & Email"
                            >
                              <Send size={11} />
                              <span>Remind</span>
                            </button>
                          )}

                          {/* Mark Paid Button (if pending/overdue) */}
                          {inv.status !== 'Paid' && (
                            <button
                              onClick={() => handleMarkInvoicePaid(inv.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-all shadow-xs"
                              title="Record Offline / Cheque Payment"
                            >
                              Mark Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: Platform Audit Trail */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-[#17324D]">Global Cross-Tenant Audit Trail</h2>
                <p className="text-xs text-slate-500">
                  Cryptographically timestamped audit log of all multi-tenant actions, logins, cost sheet calculations, and bookings.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                Immutable WORM Storage
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              {[
                { time: '2026-11-04 02:22:15', tenant: 'PRESTIGE', user: 'Vikramaditya Rao', action: 'Approved Booking BK-089 for Unit A-102 (₹1.45 Cr)', ip: '103.21.144.18', level: 'INFO' },
                { time: '2026-11-04 01:45:00', tenant: 'GODREJ', user: 'Priya Nair', action: 'Updated Tower B Stacking plan (12 units marked Available)', ip: '49.36.128.92', level: 'INFO' },
                { time: '2026-11-03 22:10:44', tenant: 'SOBHA', user: 'System (Billing)', action: 'Invoice INV-2026-10-004 marked Overdue. Reminder dispatched.', ip: '127.0.0.1 (Cron)', level: 'WARN' },
                { time: '2026-11-03 18:30:11', tenant: 'PRESTIGE', user: 'Rohan Sharma', action: 'Placed 72-hr Transactional Lock on Unit B-504 for customer Naveen Jindal', ip: '103.21.144.12', level: 'INFO' },
                { time: '2026-11-03 15:12:00', tenant: 'URBAN', user: 'Rajesh Khurana', action: 'Meta Lead Ads Webhook Synced 5 inquiries for Sector 62 project', ip: '31.13.127.1', level: 'INFO' },
                { time: '2026-11-03 11:05:32', tenant: 'ROOT', user: 'Super Admin (Rajesh Malhotra)', action: 'Upgraded tenant PRESTIGE to Enterprise Plan with 50 User Seats', ip: '14.143.18.22', level: 'AUTH' },
              ].map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 font-mono">{log.time}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        log.level === 'WARN'
                          ? 'bg-amber-100 text-amber-800'
                          : log.level === 'AUTH'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      [{log.tenant}]
                    </span>
                    <span className="text-slate-800 font-bold">{log.user}:</span>
                    <span className="text-slate-600">{log.action}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">IP: {log.ip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Cloud Infrastructure & System Health */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#17324D]">Cloud Infrastructure & Provider Integration Health</h2>
              <p className="text-xs text-slate-500">
                Live status of external APIs, multi-tenant databases, WhatsApp message brokers, and cloud object vaults.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Multi-Tenant PostgreSQL</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-slate-500 text-[11px]">AWS Aurora RDS PostgreSQL 16</p>
                <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded border border-emerald-200">
                  Pool Healthy • Latency: 12ms
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Meta WhatsApp Cloud API</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-slate-500 text-[11px]">WABA Production Webhook v21.0</p>
                <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded border border-emerald-200">
                  99.98% Delivery Rate • 0 Queued
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Razorpay / Stripe Billing</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-slate-500 text-[11px]">Automated SaaS Subscriptions</p>
                <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded border border-emerald-200">
                  Auto-Debit Mandates Active
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Private Document Vault</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-slate-500 text-[11px]">AWS S3 Mumbai (ap-south-1)</p>
                <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded border border-emerald-200">
                  AES-256 Encryption Active
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: Provision New Builder Tenant */}
      {provisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setProvisionModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase mb-1">
              <Building2 size={16} />
              <span>Multi-Tenant Provisioning</span>
            </div>
            <h3 className="text-lg font-black text-[#17324D]">Onboard New Real Estate Developer</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Instantly provisions dedicated isolated tenant database schemas, company workspace, and generates root administrator credentials.
            </p>

            <form onSubmit={handleProvisionSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Company / Developer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brigade Group"
                    value={provisionForm.companyName}
                    onChange={(e) => setProvisionForm({ ...provisionForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tenant Code</label>
                  <input
                    type="text"
                    required
                    placeholder="BRIGADE"
                    value={provisionForm.code}
                    onChange={(e) => setProvisionForm({ ...provisionForm, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Headquarters City</label>
                  <input
                    type="text"
                    required
                    placeholder="Bangalore"
                    value={provisionForm.city}
                    onChange={(e) => setProvisionForm({ ...provisionForm, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 80 4000 1122"
                    value={provisionForm.phone}
                    onChange={(e) => setProvisionForm({ ...provisionForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                  Primary Company Admin Account
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Admin Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="M. R. Jaishankar"
                      value={provisionForm.adminName}
                      onChange={(e) => setProvisionForm({ ...provisionForm, adminName: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Admin Login Email</label>
                    <input
                      type="email"
                      required
                      placeholder="admin@brigadegroup.com"
                      value={provisionForm.adminEmail}
                      onChange={(e) => setProvisionForm({ ...provisionForm, adminEmail: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subscription Plan</label>
                  <select
                    value={provisionForm.plan}
                    onChange={(e) => setProvisionForm({ ...provisionForm, plan: e.target.value as any })}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Starter">Starter (₹14,999)</option>
                    <option value="Professional">Professional (₹34,999)</option>
                    <option value="Enterprise">Enterprise (₹89,999)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">User Seats Quota</label>
                  <input
                    type="number"
                    value={provisionForm.userLimit}
                    onChange={(e) => setProvisionForm({ ...provisionForm, userLimit: parseInt(e.target.value) || 20 })}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Limit</label>
                  <input
                    type="number"
                    value={provisionForm.projectLimit}
                    onChange={(e) => setProvisionForm({ ...provisionForm, projectLimit: parseInt(e.target.value) || 10 })}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProvisionModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-md flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Provision Tenant Workspace</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: View Admin Verified Credentials */}
      {selectedAdminForCredentials && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setSelectedAdminForCredentials(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase mb-1">
              <Key size={16} />
              <span>Admin Authentication Record</span>
            </div>
            <h3 className="text-lg font-black text-[#17324D]">{selectedAdminForCredentials.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Verified platform credentials for {selectedAdminForCredentials.companyName}.
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Login Email Address:</span>
                <span className="font-mono font-bold text-slate-900">{selectedAdminForCredentials.email}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Active Password:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded text-sm">
                    {selectedAdminForCredentials.tempPass}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">(Verified Production Credential)</span>
                </div>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Designation:</span>
                <span className="font-bold text-slate-800">{selectedAdminForCredentials.designation}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Email: ${selectedAdminForCredentials.email}\nPassword: ${selectedAdminForCredentials.tempPass}`
                  );
                  showBanner('Admin credentials copied to clipboard!');
                  setSelectedAdminForCredentials(null);
                }}
                className="px-4 py-2 bg-[#17324D] hover:bg-[#244761] text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Copy Credentials
              </button>
              <button
                onClick={() => setSelectedAdminForCredentials(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Printable Official GST SaaS Tax Invoice */}
      {invoiceModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInvoiceModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 print:hidden"
            >
              <X size={20} />
            </button>

            {/* Printable Tax Invoice Container */}
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#17324D] text-white font-black text-sm flex items-center justify-center">
                      EF
                    </div>
                    <span className="text-xl font-black text-[#17324D] tracking-tight">
                      ESTATE<span className="text-[#3478C9]">FLOW</span> SaaS
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">EstateFlow Software Solutions Pvt. Ltd.</p>
                  <p className="text-[11px] text-slate-400 font-mono">GSTIN: 29AAACE1234F1Z5 • HSN/SAC: 998314</p>
                  <p className="text-[11px] text-slate-400">Tech Park, Outer Ring Road, Bangalore - 560103</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Tax Invoice</span>
                  <p className="text-lg font-mono font-black text-slate-900 mt-0.5">{selectedInvoice.invoiceNumber}</p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-1 ${
                      selectedInvoice.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedInvoice.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    STATUS: {selectedInvoice.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Billed To / Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Billed To (Developer Tenant)</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedInvoice.companyName}</p>
                  <p className="text-slate-600 mt-0.5">Corporate Real Estate Entity</p>
                  <p className="text-slate-500 font-mono text-[11px] mt-1">Tenant ID: {selectedInvoice.companyId}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Billing Period:</span>
                    <span className="font-mono font-bold text-slate-800">{selectedInvoice.billingPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Due Date:</span>
                    <span className="font-mono font-bold text-slate-800">{selectedInvoice.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Channel:</span>
                    <span className="font-semibold text-slate-800">{selectedInvoice.paymentMethod}</span>
                  </div>
                  {selectedInvoice.paymentRef && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transaction ID:</span>
                      <span className="font-mono text-[10px] text-emerald-700 font-bold">{selectedInvoice.paymentRef}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">SAC Code</th>
                    <th className="py-2.5 px-3 text-right">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">
                        EstateFlow CRM SaaS Subscription &mdash; {selectedInvoice.planName} Tier
                      </p>
                      <span className="text-[11px] text-slate-500">
                        Multi-tenant cloud platform, visual tower stacking, cost sheet engine, and WhatsApp automation.
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">998314</td>
                    <td className="py-3 px-3 text-right font-mono font-bold">
                      ₹{selectedInvoice.baseAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td colSpan={2} className="py-2 px-3 text-right text-slate-600 font-semibold">
                      CGST @ 9%
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700">
                      ₹{(selectedInvoice.gstAmount / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td colSpan={2} className="py-2 px-3 text-right text-slate-600 font-semibold">
                      SGST @ 9%
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700">
                      ₹{(selectedInvoice.gstAmount / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="bg-slate-100/80 font-bold text-slate-900">
                    <td colSpan={2} className="py-3 px-3 text-right text-sm">
                      Total Invoice Value (INR):
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-[#17324D]">
                      ₹{selectedInvoice.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Digital Verification & Stamp */}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 size={16} />
                  <span className="font-bold">Digitally Authorized Computer Generated SaaS Tax Invoice</span>
                </div>
                <div className="flex items-center gap-2 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold flex items-center gap-1.5"
                  >
                    <Download size={14} />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    onClick={() => setInvoiceModalOpen(false)}
                    className="px-4 py-2 bg-[#17324D] text-white hover:bg-[#244761] rounded-lg font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
