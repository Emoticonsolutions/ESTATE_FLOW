'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  EyeOff,
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
  Copy,
  RefreshCw,
  Hash,
  ShieldCheck,
  FileCheck2,
  ChevronDown,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { Company, User } from '@/types';

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
  cin?: string;
  reraNumber?: string;
  gstin?: string;
}

// Password Generator Utility
function generateSecurePassword(prefix: string = 'Builder'): string {
  const clean = prefix.replace(/[^a-zA-Z]/g, '') || 'Builder';
  const symbols = ['@', '#', '$', '!'];
  const sym = symbols[Math.floor(Math.random() * symbols.length)];
  const randChars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let rand = '';
  for (let i = 0; i < 3; i++) {
    rand += randChars.charAt(Math.floor(Math.random() * randChars.length));
  }
  return `${clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase()}${sym}2026!${rand}`;
}

export default function SuperAdminPage() {
  const router = useRouter();
  const {
    allCompanies,
    allUsers,
    addCompany,
    updateCompany,
    addUser,
    updateUser,
    setCompanyId,
    setRole,
    login,
    logout,
    currentUser,
  } = useTenant();

  // Root Super Admin Gate State
  const [isSuperAdminAuthenticated, setIsSuperAdminAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [showAuthPassword, setShowAuthPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check saved session on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem('estateflow_superadmin_auth');
      const session = localStorage.getItem('estateflow_session');
      if (token === 'verified_owner') {
        setIsSuperAdminAuthenticated(true);
      } else if (session) {
        const parsed = JSON.parse(session);
        if (
          parsed.role === 'SUPER_ADMIN' &&
          (parsed.user?.email === 'solutionsemoticon@gmail.com' || parsed.user?.email === 'solutionsemoticon@gmail')
        ) {
          setIsSuperAdminAuthenticated(true);
          localStorage.setItem('estateflow_superadmin_auth', 'verified_owner');
        }
      }
    } catch {}
    setIsCheckingAuth(false);
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    let cleanEmail = authEmail.trim().toLowerCase();
    if (cleanEmail === 'solutionsemoticon@gmail') {
      cleanEmail = 'solutionsemoticon@gmail.com';
    }

    if (
      (cleanEmail === 'solutionsemoticon@gmail.com' || cleanEmail === 'solutionsemoticon@gmail') &&
      authPassword === 'SuperAdmin@123'
    ) {
      login('solutionsemoticon@gmail.com', 'SuperAdmin@123', 'SUPER_ADMIN');
      try {
        localStorage.setItem('estateflow_superadmin_auth', 'verified_owner');
      } catch {}
      setIsSuperAdminAuthenticated(true);
      showBanner('Root Security Cleared. Welcome, Platform Owner!');
    } else {
      setAuthError('Access Denied: Invalid Master Administrator Email or Root Security Password.');
    }
  };

  const handleLockConsole = () => {
    try {
      localStorage.removeItem('estateflow_superadmin_auth');
    } catch {}
    logout();
    setIsSuperAdminAuthenticated(false);
    setAuthEmail('');
    setAuthPassword('');
    setAuthError(null);
    showBanner('Platform Owner Terminal Locked.');
  };

  // Tab State
  const [activeTab, setActiveTab] = useState<'companies' | 'admins' | 'subscriptions' | 'invoices' | 'audit' | 'settings'>('companies');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('All');

  // Modals State
  const [provisionModalOpen, setProvisionModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<SaaSInvoice | null>(null);
  const [selectedAdminForCredentials, setSelectedAdminForCredentials] = useState<User | null>(null);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [selectedCompanyForSub, setSelectedCompanyForSub] = useState<Company | null>(null);
  const [companyDetailsModalOpen, setCompanyDetailsModalOpen] = useState(false);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState<Company | null>(null);

  // Newly Provisioned Credential Handoff Modal
  const [credentialHandoff, setCredentialHandoff] = useState<{
    company: Company;
    admin: User;
    rawPassword: string;
    loginUrl: string;
  } | null>(null);

  // Success Notification banner
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const showBanner = (msg: string) => {
    setBannerMessage(msg);
    setTimeout(() => setBannerMessage(null), 4000);
  };

  const copyToClipboard = (text: string, label: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(label);
      showBanner(`${label} copied to clipboard!`);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      showBanner(`Copied: ${text}`);
    }
  };

  // SaaS Plans Specification
  const [plans, setPlans] = useState<SaaSPlan[]>([
    {
      id: 'plan-starter',
      name: 'Starter',
      priceMonthly: 199,
      priceAnnualMonthly: 159,
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
      priceMonthly: 499,
      priceAnnualMonthly: 399,
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
        '1-Click WhatsApp & Webhook Integration',
        'Round-Robin Lead Assignment',
        'Milestone Payment Schedules & Stamped Receipts',
        'Broker Commission Payout Approval Flow',
      ],
    },
    {
      id: 'plan-enterprise',
      name: 'Enterprise',
      priceMonthly: 999,
      priceAnnualMonthly: 799,
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

  // SaaS Invoices
  const [invoices, setInvoices] = useState<SaaSInvoice[]>([
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-11-001',
      companyId: 'comp-prestige',
      companyName: 'Prestige Estates Projects Ltd',
      planName: 'Enterprise',
      billingPeriod: 'Nov 01 - Nov 30, 2026',
      baseAmount: 999,
      gstAmount: 0,
      totalAmount: 999,
      dueDate: '2026-11-05',
      paidDate: '2026-11-01',
      status: 'Paid',
      paymentMethod: 'Corporate Wire (USD)',
      paymentRef: 'wire_ref_99812A980',
      cin: 'L45200KA1997PLC022365',
      reraNumber: 'PRM/KA/RERA/1251/310/PR/170915/000123',
      gstin: '29AABCP1234F1Z1',
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2026-11-002',
      companyId: 'comp-godrej',
      companyName: 'Godrej Skyline Developers',
      planName: 'Professional',
      billingPeriod: 'Nov 01 - Nov 30, 2026',
      baseAmount: 499,
      gstAmount: 0,
      totalAmount: 499,
      dueDate: '2026-11-10',
      paidDate: '2026-11-02',
      status: 'Paid',
      paymentMethod: 'Bank Wire Transfer',
      paymentRef: 'WIRE-ICIC-20261102-881',
      cin: 'L74120MH1985PLC035308',
      reraNumber: 'P51800000832',
      gstin: '27AAACG0532N1Z4',
    },
    {
      id: 'inv-3',
      invoiceNumber: 'INV-2026-11-003',
      companyId: 'comp-urbannest',
      companyName: 'Urban Nest Properties',
      planName: 'Starter',
      billingPeriod: 'Nov 01 - Nov 30, 2026',
      baseAmount: 199,
      gstAmount: 0,
      totalAmount: 199,
      dueDate: '2026-11-10',
      status: 'Pending',
      paymentMethod: 'Credit Card / Wire (Pending Authorization)',
      cin: 'U45200DL2018PTC328901',
      reraNumber: 'RC/REP/HARERA/GGM/2018/14',
      gstin: '07AABCU9876D1Z2',
    },
    {
      id: 'inv-4',
      invoiceNumber: 'INV-2026-10-004',
      companyId: 'comp-sobha',
      companyName: 'Sobha Luxury Heights',
      planName: 'Professional',
      billingPeriod: 'Oct 01 - Oct 31, 2026',
      baseAmount: 499,
      gstAmount: 0,
      totalAmount: 499,
      dueDate: '2026-10-25',
      status: 'Overdue',
      paymentMethod: 'Corporate Wire (Awaiting Clearance)',
      cin: 'L45201KA1995PLC018475',
      reraNumber: 'P02400001928',
      gstin: '36AABCS1234K1Z8',
    },
    {
      id: 'inv-5',
      invoiceNumber: 'INV-2026-10-001',
      companyId: 'comp-prestige',
      companyName: 'Prestige Estates Projects Ltd',
      planName: 'Enterprise',
      billingPeriod: 'Oct 01 - Oct 31, 2026',
      baseAmount: 999,
      gstAmount: 0,
      totalAmount: 999,
      dueDate: '2026-10-05',
      paidDate: '2026-10-03',
      status: 'Paid',
      paymentMethod: 'Razorpay Auto-Debit',
      paymentRef: 'rzp_pay_88712A101',
      cin: 'L45200KA1997PLC022365',
      reraNumber: 'PRM/KA/RERA/1251/310/PR/170915/000123',
      gstin: '29AABCP1234F1Z1',
    },
  ]);

  // Provisioning Form State (with Auto Password & Company Reg Numbers)
  const [provisionForm, setProvisionForm] = useState({
    companyName: '',
    code: '',
    city: 'Bangalore',
    phone: '',
    email: '',
    plan: 'Professional' as 'Starter' | 'Professional' | 'Enterprise',
    userLimit: 20,
    projectLimit: 10,
    // Registration Details
    registrationNumber: '',
    cin: '',
    reraNumber: '',
    gstin: '',
    address: '',
    // Admin Account Credentials
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminPassword: '',
    showPassword: true,
  });

  // Re-generate password when modal opens or code changes
  useEffect(() => {
    if (provisionModalOpen && !provisionForm.adminPassword) {
      setProvisionForm((prev) => ({
        ...prev,
        adminPassword: generateSecurePassword(prev.code || 'Builder'),
      }));
    }
  }, [provisionModalOpen]);

  // Helper to autofill realistic Indian corporate registration details
  const handleAutoFillRegDetails = () => {
    const rawCode = provisionForm.code || provisionForm.companyName.slice(0, 4).toUpperCase() || 'BLDR';
    const cityCode = provisionForm.city.toLowerCase().includes('mumbai')
      ? 'MH'
      : provisionForm.city.toLowerCase().includes('delhi') || provisionForm.city.toLowerCase().includes('gurugram')
      ? 'DL'
      : provisionForm.city.toLowerCase().includes('hyderabad')
      ? 'TG'
      : 'KA';
    const gstState = cityCode === 'MH' ? '27' : cityCode === 'DL' ? '07' : cityCode === 'TG' ? '36' : '29';
    const randNum = Math.floor(100000 + Math.random() * 900000);

    const generatedCIN = `U45200${cityCode}2022PTC${randNum}`;
    const generatedRERA = `PRM/${cityCode}/RERA/1251/310/PR/220515/${Math.floor(100000 + Math.random() * 900000)}`;
    const generatedGSTIN = `${gstState}AABCE${Math.floor(1000 + Math.random() * 9000)}F1Z${Math.floor(1 + Math.random() * 9)}`;
    const generatedAddress = `${provisionForm.companyName || 'Corporate'} Towers, Plot 14, CBD Commercial Area, ${provisionForm.city}`;

    setProvisionForm((prev) => ({
      ...prev,
      registrationNumber: generatedCIN,
      cin: generatedCIN,
      reraNumber: generatedRERA,
      gstin: generatedGSTIN,
      address: generatedAddress,
    }));
    showBanner('Auto-generated realistic CIN, RERA ID, and GSTIN registration numbers!');
  };

  // Add Admin Form State
  const [newAdminForm, setNewAdminForm] = useState({
    companyId: allCompanies[0]?.id || 'comp-prestige',
    name: '',
    email: '',
    phone: '',
    designation: 'Managing Director & VP Sales',
    department: 'Executive Leadership',
    password: generateSecurePassword('Admin'),
    showPassword: true,
  });

  // KPI Calculations
  const metrics = useMemo(() => {
    const totalMRR = allCompanies.reduce((acc, c) => acc + (c.status === 'Active' ? (c.monthlyFee || 499) : 0), 0);
    const totalARR = totalMRR * 12;
    const pendingAmount = invoices
      .filter((i) => i.status === 'Pending' || i.status === 'Overdue')
      .reduce((acc, i) => acc + i.totalAmount, 0);
    const totalUsers = allUsers.length;
    const totalUnits = allCompanies.reduce((acc, c) => acc + (c.unitsCount || 50), 0);
    const activeTenants = allCompanies.filter((c) => c.status === 'Active').length;

    return { totalMRR, totalARR, pendingAmount, totalUsers, totalUnits, activeTenants };
  }, [allCompanies, allUsers, invoices]);

  // Action: 1-Click Impersonate Tenant
  const handleImpersonateTenant = (company: Company) => {
    setCompanyId(company.id);
    setRole('COMPANY_ADMIN');
    showBanner(`Logged in as Tenant Owner of "${company.name}". Switching to Live CRM...`);
    setTimeout(() => {
      router.push('/dashboard');
    }, 700);
  };

  // Action: Toggle Company Status
  const handleToggleCompanyStatus = (companyId: string) => {
    const target = allCompanies.find((c) => c.id === companyId);
    if (!target) return;
    const nextStatus = target.status === 'Active' ? 'Suspended' : 'Active';
    updateCompany(companyId, { status: nextStatus });
    showBanner(`Tenant "${target.name}" status changed to ${nextStatus}.`);
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
    const rawCode = (provisionForm.code || provisionForm.companyName.slice(0, 4)).toUpperCase().replace(/[^A-Z0-9]/g, '');
    const newCompanyId = `comp-${rawCode.toLowerCase()}`;
    const monthlyFee =
      provisionForm.plan === 'Starter' ? 199 : provisionForm.plan === 'Enterprise' ? 999 : 499;

    const cinNumber = provisionForm.registrationNumber || provisionForm.cin || `U45200KA2024PTC${Math.floor(100000 + Math.random() * 900000)}`;
    const reraId = provisionForm.reraNumber || `PRM/KA/RERA/1251/310/PR/${Math.floor(100000 + Math.random() * 900000)}`;
    const gstinId = provisionForm.gstin || `29AAAC${rawCode.slice(0, 4)}1234F1Z5`;
    const officeAddress = provisionForm.address || `${provisionForm.companyName} Tech Tower, CBD, ${provisionForm.city}`;

    const securePass = provisionForm.adminPassword || generateSecurePassword(rawCode);

    // Call tenantContext addCompany to register into global multi-tenant state and localStorage!
    const result = addCompany(
      {
        id: newCompanyId,
        name: provisionForm.companyName,
        code: rawCode,
        plan: provisionForm.plan,
        status: 'Active',
        userLimit: provisionForm.userLimit,
        projectLimit: provisionForm.projectLimit,
        contactEmail: provisionForm.email || provisionForm.adminEmail,
        phone: provisionForm.phone,
        city: provisionForm.city,
        registrationNumber: cinNumber,
        cin: cinNumber,
        reraNumber: reraId,
        gstin: gstinId,
        address: officeAddress,
        monthlyFee,
        billingCycle: 'Monthly',
        nextRenewalDate: '2026-12-04',
        paymentStatus: 'Paid',
        adminName: provisionForm.adminName,
        adminEmail: provisionForm.adminEmail,
        usersCount: 1,
        projectsCount: 1,
        unitsCount: 50,
      },
      {
        name: provisionForm.adminName,
        email: provisionForm.adminEmail,
        phone: provisionForm.adminPhone || provisionForm.phone,
        password: securePass,
        role: 'COMPANY_ADMIN',
        department: 'Executive Leadership',
        designation: 'Managing Director & Builder Admin',
      }
    );

    // Also issue initial SaaS invoice for billing tracking
    const newInvoice: SaaSInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-11-${Math.floor(100 + Math.random() * 900)}`,
      companyId: newCompanyId,
      companyName: provisionForm.companyName,
      planName: provisionForm.plan,
      billingPeriod: 'Nov 01 - Nov 30, 2026',
      baseAmount: monthlyFee,
      gstAmount: monthlyFee * 0.18,
      totalAmount: monthlyFee * 1.18,
      dueDate: '2026-11-15',
      paidDate: new Date().toISOString().split('T')[0],
      status: 'Paid',
      paymentMethod: 'Platform Setup Auto-Receipt',
      paymentRef: `PROV-TX-${Date.now().toString().slice(-6)}`,
      cin: cinNumber,
      reraNumber: reraId,
      gstin: gstinId,
    };
    setInvoices([newInvoice, ...invoices]);

    // Also persist asynchronously to live PostgreSQL via API
    try {
      fetch('/api/v1/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: provisionForm.companyName,
          code: rawCode,
          plan: provisionForm.plan,
          userLimit: provisionForm.userLimit,
          projectLimit: provisionForm.projectLimit,
          contactEmail: provisionForm.email || provisionForm.adminEmail,
          phone: provisionForm.phone,
          city: provisionForm.city,
          registrationNumber: cinNumber,
          cin: cinNumber,
          reraNumber: reraId,
          gstin: gstinId,
          address: officeAddress,
          monthlyFee,
          adminName: provisionForm.adminName,
          adminEmail: provisionForm.adminEmail,
          adminPassword: securePass,
        }),
      }).catch((err) => console.warn('Non-blocking cloud db sync notice:', err));
    } catch {}

    // Close provisioning modal and open the Credential Handoff dialog!
    setProvisionModalOpen(false);
    setCredentialHandoff({
      company: result.company,
      admin: result.admin,
      rawPassword: securePass,
      loginUrl: typeof window !== 'undefined' ? `${window.location.origin}/login?portal=admin` : 'https://estate-flow-eta.vercel.app/login?portal=admin',
    });

    showBanner(`Developer tenant "${result.company.name}" successfully provisioned and live!`);

    // Reset form
    setProvisionForm({
      companyName: '',
      code: '',
      city: 'Bangalore',
      phone: '',
      email: '',
      plan: 'Professional',
      userLimit: 20,
      projectLimit: 10,
      registrationNumber: '',
      cin: '',
      reraNumber: '',
      gstin: '',
      address: '',
      adminName: '',
      adminEmail: '',
      adminPhone: '',
      adminPassword: '',
      showPassword: true,
    });
  };

  // Action: Add Admin Submit
  const handleAddAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const company = allCompanies.find((c) => c.id === newAdminForm.companyId) || allCompanies[0];
    const createdUser = addUser({
      name: newAdminForm.name,
      email: newAdminForm.email,
      phone: newAdminForm.phone,
      password: newAdminForm.password,
      role: 'COMPANY_ADMIN',
      companyId: newAdminForm.companyId,
      designation: newAdminForm.designation,
      department: newAdminForm.department,
    });

    setAdminModalOpen(false);
    setSelectedAdminForCredentials(createdUser);
    showBanner(`New Admin profile "${createdUser.name}" added to ${company.name}!`);

    setNewAdminForm({
      companyId: allCompanies[0]?.id || 'comp-prestige',
      name: '',
      email: '',
      phone: '',
      designation: 'Managing Director & VP Sales',
      department: 'Executive Leadership',
      password: generateSecurePassword('Admin'),
      showPassword: true,
    });
  };

  // Action: Update Subscription Submit
  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompanyForSub) return;

    const plan = selectedCompanyForSub.plan;
    const monthlyFee = plan === 'Starter' ? 199 : plan === 'Enterprise' ? 999 : 499;

    updateCompany(selectedCompanyForSub.id, {
      plan,
      userLimit: selectedCompanyForSub.userLimit,
      projectLimit: selectedCompanyForSub.projectLimit,
      monthlyFee,
    });

    setSubscriptionModalOpen(false);
    showBanner(`Subscription updated for ${selectedCompanyForSub.name} (${plan} Tier)!`);
  };

  // Filtered Companies
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.registrationNumber && c.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.reraNumber && c.reraNumber.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchPlan = planFilter === 'All' || c.plan === planFilter;
      return matchSearch && matchStatus && matchPlan;
    });
  }, [allCompanies, searchQuery, statusFilter, planFilter]);

  // Filtered Admins (from allUsers)
  const filteredAdmins = useMemo(() => {
    return allUsers.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.designation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [allUsers, searchQuery]);

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

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0B1522] flex items-center justify-center text-slate-400 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-slate-300">Verifying Platform Root Authority...</span>
        </div>
      </div>
    );
  }

  // PLATFORM OWNER SECURITY GATE (Shown when not authenticated)
  if (!isSuperAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B1522] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-[#132235]/95 backdrop-blur-md border border-[#244264] rounded-3xl p-8 shadow-2xl relative z-10 space-y-6 animate-in zoom-in-95">
          {/* Header */}
          <div className="text-center space-y-2.5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 mx-auto shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#0B1522] rounded-[14px] flex items-center justify-center text-amber-400">
                <Lock size={28} />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-amber-400/10 text-amber-300 border border-amber-400/30 uppercase tracking-widest">
                <ShieldAlert size={12} />
                <span>Restricted • Platform Owner Only</span>
              </span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              ESTATE<span className="text-[#3478C9]">FLOW</span> <span className="text-xs font-mono font-bold text-amber-400">ROOT</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              Global multi-tenant administration, database schemas, builder onboarding, and billing. Authenticate with Platform Owner credentials.
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="bg-rose-500/15 border border-rose-500/40 text-rose-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 animate-in shake">
              <AlertTriangle size={16} className="shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Platform Owner Master Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="solutionsemoticon@gmail"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 bg-[#0B1522] border border-[#244264] rounded-xl text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Root Access Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showAuthPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 bg-[#0B1522] border border-[#244264] rounded-xl text-white placeholder-slate-500 text-xs font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowAuthPassword(!showAuthPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                >
                  {showAuthPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-98"
            >
              <Key size={15} />
              <span>Authenticate & Enter Console</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Footer Security Badges */}
          <div className="pt-2 border-t border-slate-800/80 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>AES-256 Session Encrypted • WORM Audit Trail</span>
            </div>
            <Link
              href="/"
              className="inline-block text-[11px] text-slate-400 hover:text-white transition-colors"
            >
              &larr; Return to Public EstateFlow Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                  Global Multi-Tenant Authority • Builder Registration (CIN/RERA), Password Generator & Invoicing
                </p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Authenticated Owner Badge */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-800/90 border border-slate-700 rounded-lg text-xs font-mono text-slate-300 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-semibold">solutionsemoticon@gmail</span>
                <span className="text-amber-400 font-bold text-[10px] bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/30">ROOT</span>
              </div>

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

              {/* Lock Console & Sign Out Button */}
              <button
                onClick={handleLockConsole}
                className="h-9 px-3.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                title="Immediately lock Super Admin console and terminate root session"
              >
                <Lock size={13} />
                <span className="hidden sm:inline">Lock Console</span>
              </button>

              <Link
                href="/"
                className="h-9 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <span>Public</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Global Notification Banner */}
      {bannerMessage && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-2.5 px-6 text-center shadow-inner flex items-center justify-center gap-2 animate-in fade-in sticky top-18 z-30">
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
              ${metrics.totalMRR.toLocaleString('en-US')}
            </p>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
              +18.4% MoM platform expansion (${(metrics.totalMRR * 12).toLocaleString('en-US')} ARR)
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
              ${metrics.pendingAmount.toLocaleString('en-US')}
            </p>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {invoices.filter((i) => i.status !== 'Paid').length} Accounts awaiting clearance
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
              {allCompanies.length} Registered & Isolated
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
              { id: 'companies', label: 'Tenant Companies (Builders)', count: allCompanies.length, icon: Building },
              { id: 'admins', label: 'Company Admins & Profiles', count: allUsers.length, icon: UserCheck },
              { id: 'subscriptions', label: 'Subscription Manager', count: plans.length, icon: CreditCard },
              { id: 'invoices', label: 'Monthly SaaS Billing & Dues', count: invoices.filter((i) => i.status !== 'Paid').length, icon: Receipt, badgeColor: 'bg-amber-100 text-amber-800' },
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
                  Manage multi-tenant isolation, verified CIN/RERA numbers, active subscription tiers, and 1-click tenant impersonation.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search developer, CIN, RERA, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#3478C9]"
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

                <button
                  onClick={() => setProvisionModalOpen(true)}
                  className="h-9 px-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus size={14} />
                  <span>Onboard Builder</span>
                </button>
              </div>
            </div>

            {/* Companies Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Developer & Code</th>
                    <th className="py-3.5 px-4">Company Registration (CIN & RERA)</th>
                    <th className="py-3.5 px-4">Active Plan & Fee</th>
                    <th className="py-3.5 px-4">Seats & Inventory</th>
                    <th className="py-3.5 px-4">Primary Admin Account</th>
                    <th className="py-3.5 px-4">SaaS Billing</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Super Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCompanies.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors h-14">
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            setSelectedCompanyDetails(c);
                            setCompanyDetailsModalOpen(true);
                          }}
                          className="flex items-center gap-2.5 text-left group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#17324D] text-white flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-[#3478C9] transition-colors">
                            {c.code.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-[#3478C9] transition-colors flex items-center gap-1">
                              <span>{c.name}</span>
                              <FileText size={11} className="text-slate-400 opacity-0 group-hover:opacity-100" />
                            </p>
                            <span className="text-[10px] font-mono text-slate-500 font-semibold">{c.city} • {c.code}</span>
                          </div>
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              CIN: {c.registrationNumber || c.cin || 'CIN-NOT-REGISTERED'}
                            </span>
                            <button
                              onClick={() => copyToClipboard(c.registrationNumber || c.cin || '', 'CIN')}
                              className="text-slate-400 hover:text-slate-700 p-0.5"
                              title="Copy CIN"
                            >
                              <Copy size={11} />
                            </button>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-teal-700 font-mono">
                            <span>RERA: {c.reraNumber || 'PRM/RERA/PENDING'}</span>
                          </div>
                        </div>
                      </td>
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
                          <span className="text-[11px] text-slate-600 font-bold block mt-0.5">
                            ${(c.monthlyFee || (c.plan === 'Enterprise' ? 999 : c.plan === 'Starter' ? 199 : 499)).toLocaleString('en-US')}/mo
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-semibold">
                            <span>{c.usersCount || 1} / {c.userLimit} Seats</span>
                            <span className="text-slate-400 font-mono">
                              {Math.round(((c.usersCount || 1) / c.userLimit) * 100)}%
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            {c.projectsCount || 1} Projects • {c.unitsCount || 50} Units
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-900">{c.adminName || 'Admin User'}</p>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">
                          {c.adminEmail || c.contactEmail}
                        </span>
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
                          {c.paymentStatus || 'Paid'}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                          Renews {c.nextRenewalDate || '2026-12-04'}
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
                  Inspect tenant administrator identities, view generated passwords, and direct 1-click admin login.
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
                  className="h-9 px-3.5 bg-[#17324D] hover:bg-[#244761] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
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
                    <th className="py-3.5 px-4">System Role</th>
                    <th className="py-3.5 px-4">Credentials & Password</th>
                    <th className="py-3.5 px-4 text-right">Super Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredAdmins.map((adm) => {
                    const matchedComp = allCompanies.find((c) => c.id === adm.companyId);
                    return (
                      <tr key={adm.id} className="hover:bg-slate-50/70 transition-colors h-14">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#17324D] to-[#3478C9] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                              {adm.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{adm.name}</p>
                              <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded font-semibold border border-teal-200">
                                {adm.designation || 'Company Admin'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-800">{matchedComp?.name || adm.companyId}</p>
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
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {adm.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => setSelectedAdminForCredentials(adm)}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 border border-amber-200"
                          >
                            <Key size={12} className="text-amber-600" />
                            <span>View Password</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setCompanyId(adm.companyId);
                                setRole(adm.role);
                                showBanner(`Switched persona to "${adm.name}". Opening CRM Dashboard...`);
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Subscription Manager */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-[#17324D]">SaaS Subscription Tier Quotas</h2>
                  <p className="text-xs text-slate-500">
                    Define limits for user seats, active property towers, WhatsApp Cloud API volume, and AI co-pilot features.
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg">
                  Currency: USD ($) • Flat Platform Pricing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p) => {
                  const tenantsOnPlan = allCompanies.filter((c) => c.plan === p.name).length;
                  return (
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
                            {tenantsOnPlan} Active {tenantsOnPlan === 1 ? 'Tenant' : 'Tenants'}
                          </span>
                        </div>

                        <div className="mt-3 mb-2">
                          <span className="text-3xl font-black text-[#17324D]">
                            ${p.priceMonthly.toLocaleString('en-US')}
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
                  );
                })}
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
                  Track subscription realization, pending developer dues, overdue payments, and issue legal GST tax invoices with CIN.
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
                { time: '2026-11-04 02:45:10', tenant: 'PRESTIGE', user: 'Vikramaditya Rao', action: 'Approved Booking BK-PRESTIGE-2026-881 for Unit A-102 (₹1.45 Cr)', ip: '103.21.144.18', level: 'INFO' },
                { time: '2026-11-04 01:45:00', tenant: 'GODREJ', user: 'Priya Nair', action: 'Updated Tower B Stacking plan (12 units marked Available)', ip: '49.36.128.92', level: 'INFO' },
                { time: '2026-11-03 22:10:44', tenant: 'SOBHA', user: 'System (Billing)', action: 'Invoice INV-2026-10-004 marked Overdue. Reminder dispatched.', ip: '127.0.0.1 (Cron)', level: 'WARN' },
                { time: '2026-11-03 18:30:11', tenant: 'PRESTIGE', user: 'Rohan Sharma', action: 'Placed 72-hr Transactional Lock on Unit B-504 for customer Naveen Jindal', ip: '103.21.144.12', level: 'INFO' },
                { time: '2026-11-03 15:12:00', tenant: 'URBAN', user: 'Rajesh Khurana', action: 'Meta Lead Ads Webhook Synced 5 inquiries for Sector 62 project', ip: '31.13.127.1', level: 'INFO' },
                { time: '2026-11-03 11:05:32', tenant: 'ROOT', user: 'Super Admin (Rajesh Malhotra)', action: 'Provisioned developer tenant with dynamic CIN and auto-generated secure credentials', ip: '14.143.18.22', level: 'AUTH' },
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

      {/* MODAL 1: Provision New Builder Tenant (with Password Gen & CIN/RERA/GSTIN) */}
      {provisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 my-8">
            <button
              onClick={() => setProvisionModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase mb-1">
              <Building2 size={16} />
              <span>Multi-Tenant Builder Onboarding</span>
            </div>
            <h3 className="text-lg font-black text-[#17324D]">Onboard New Real Estate Developer</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Configures isolated tenant database workspace, legal registration numbers (CIN/RERA/GSTIN), and auto-generates root admin credentials.
            </p>

            <form onSubmit={handleProvisionSubmit} className="space-y-4 text-xs">
              {/* SECTION 1: Company Profile */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                    1. Developer Identity & Location
                  </span>
                  <button
                    type="button"
                    onClick={handleAutoFillRegDetails}
                    className="text-[11px] text-[#3478C9] hover:underline font-bold flex items-center gap-1"
                  >
                    <Sparkles size={12} />
                    <span>Auto-fill Sample CIN & RERA</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Developer Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brigade Enterprises Ltd"
                      value={provisionForm.companyName}
                      onChange={(e) => setProvisionForm({ ...provisionForm, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tenant Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="BRIGADE"
                      value={provisionForm.code}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setProvisionForm({
                          ...provisionForm,
                          code: val,
                          adminPassword: generateSecurePassword(val || 'Builder'),
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 uppercase font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Headquarters City *</label>
                    <input
                      type="text"
                      required
                      placeholder="Bangalore"
                      value={provisionForm.city}
                      onChange={(e) => setProvisionForm({ ...provisionForm, city: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official Company Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 80 4000 1122"
                      value={provisionForm.phone}
                      onChange={(e) => setProvisionForm({ ...provisionForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Legal Registration (CIN / ROC, RERA, GSTIN) */}
              <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-200 space-y-3">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-[#3478C9]" />
                  <span>2. Legal Entity Registration Details (India RERA / ROC)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Company Registration / CIN Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. U45200KA2024PTC189201"
                      value={provisionForm.registrationNumber}
                      onChange={(e) => setProvisionForm({ ...provisionForm, registrationNumber: e.target.value, cin: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono uppercase text-xs"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">21-digit Corporate Identification Number (CIN)</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      State RERA Registration ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PRM/KA/RERA/1251/310/PR/240115/007890"
                      value={provisionForm.reraNumber}
                      onChange={(e) => setProvisionForm({ ...provisionForm, reraNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-xs"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">State Real Estate Regulatory Authority License</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">GSTIN (for 18% Tax Invoices)</label>
                    <input
                      type="text"
                      placeholder="e.g. 29AABCB9876E1Z4"
                      value={provisionForm.gstin}
                      onChange={(e) => setProvisionForm({ ...provisionForm, gstin: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono uppercase text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Registered Corporate Address</label>
                    <input
                      type="text"
                      placeholder="e.g. Brigade Gateway, Malleswaram, Bangalore"
                      value={provisionForm.address}
                      onChange={(e) => setProvisionForm({ ...provisionForm, address: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Primary Admin & Password Generator */}
              <div className="p-3.5 bg-amber-50/40 rounded-xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px] uppercase tracking-wider">
                    <Key size={14} className="text-amber-600" />
                    <span>3. Primary Builder Admin & Auto-Generated Password</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    High Security Entropy
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Admin Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="M. R. Jaishankar"
                      value={provisionForm.adminName}
                      onChange={(e) => setProvisionForm({ ...provisionForm, adminName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Admin Login Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="admin@brigadegroup.com"
                      value={provisionForm.adminEmail}
                      onChange={(e) => setProvisionForm({ ...provisionForm, adminEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                    />
                  </div>
                </div>

                {/* Password Generator Input Box */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Auto-Generated Admin Temporary Password *
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type={provisionForm.showPassword ? 'text' : 'password'}
                        required
                        value={provisionForm.adminPassword}
                        onChange={(e) => setProvisionForm({ ...provisionForm, adminPassword: e.target.value })}
                        className="w-full px-3 py-2 pr-10 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-sm tracking-wide"
                      />
                      <button
                        type="button"
                        onClick={() => setProvisionForm({ ...provisionForm, showPassword: !provisionForm.showPassword })}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                      >
                        {provisionForm.showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newPass = generateSecurePassword(provisionForm.code || 'Builder');
                        setProvisionForm({ ...provisionForm, adminPassword: newPass });
                        showBanner('New secure password generated!');
                      }}
                      className="h-9 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
                      title="Re-generate high entropy password"
                    >
                      <RefreshCw size={13} />
                      <span>Re-Generate</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    This password will be securely provisioned into the database. You will get a 1-click copy card after saving.
                  </span>
                </div>
              </div>

              {/* SECTION 4: Subscription Plan & Limits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subscription Plan</label>
                  <select
                    value={provisionForm.plan}
                    onChange={(e) => {
                      const p = e.target.value as any;
                      setProvisionForm({
                        ...provisionForm,
                        plan: p,
                        userLimit: p === 'Starter' ? 5 : p === 'Enterprise' ? 50 : 20,
                        projectLimit: p === 'Starter' ? 2 : p === 'Enterprise' ? 25 : 10,
                      });
                    }}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="Starter">Starter Tier ($199/mo)</option>
                    <option value="Professional">Professional Tier ($499/mo)</option>
                    <option value="Enterprise">Enterprise Tier ($999/mo)</option>
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

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
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
                  <span>Provision Tenant & Save Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Newly Provisioned Credentials & Workspace Handoff Card */}
      {credentialHandoff && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setCredentialHandoff(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
              <CheckCircle2 size={26} />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">
              Workspace Provisioned Successfully
            </span>
            <h3 className="text-xl font-black text-[#17324D]">{credentialHandoff.company.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Tenant account is active. Share these credentials with the builder administration team.
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-semibold">Tenant Identifier:</span>
                <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {credentialHandoff.company.code} (ID: {credentialHandoff.company.id})
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-semibold">CIN Registration Number:</span>
                <span className="font-mono font-bold text-slate-800">
                  {credentialHandoff.company.registrationNumber || credentialHandoff.company.cin}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-semibold">State RERA ID:</span>
                <span className="font-mono font-bold text-teal-700">
                  {credentialHandoff.company.reraNumber}
                </span>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block mb-1">Admin Login Email:</span>
                <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-mono">
                  <span className="font-bold text-slate-900">{credentialHandoff.admin.email}</span>
                  <button
                    onClick={() => copyToClipboard(credentialHandoff.admin.email, 'Admin Email')}
                    className="text-slate-400 hover:text-slate-700"
                    title="Copy Email"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block mb-1">Generated Password:</span>
                <div className="flex items-center justify-between bg-amber-50 px-3 py-2 rounded-lg border border-amber-200 font-mono">
                  <span className="font-black text-amber-900 text-sm tracking-wide">{credentialHandoff.rawPassword}</span>
                  <button
                    onClick={() => copyToClipboard(credentialHandoff.rawPassword, 'Password')}
                    className="px-2.5 py-1 bg-amber-200/70 hover:bg-amber-200 text-amber-900 font-bold rounded text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Copy size={12} />
                    <span>Copy Password</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block mb-1">Stakeholder Login Portal URL:</span>
                <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-[11px]">
                  <span className="text-slate-600 truncate mr-2">{credentialHandoff.loginUrl}</span>
                  <button
                    onClick={() => copyToClipboard(credentialHandoff.loginUrl, 'Login URL')}
                    className="text-slate-400 hover:text-slate-700 shrink-0"
                    title="Copy URL"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => {
                  const payload = `ESTATEFLOW BUILDER CREDENTIALS\nCompany: ${credentialHandoff.company.name}\nCIN: ${credentialHandoff.company.registrationNumber}\nRERA: ${credentialHandoff.company.reraNumber}\nAdmin: ${credentialHandoff.admin.name}\nEmail: ${credentialHandoff.admin.email}\nPassword: ${credentialHandoff.rawPassword}\nLogin URL: ${credentialHandoff.loginUrl}`;
                  copyToClipboard(payload, 'Full Credential Dossier');
                }}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Copy size={13} />
                <span>Copy Full Credentials</span>
              </button>

              <button
                onClick={() => {
                  setCredentialHandoff(null);
                  handleImpersonateTenant(credentialHandoff.company);
                }}
                className="px-4 py-2 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <ExternalLink size={13} />
                <span>Impersonate & Open CRM</span>
              </button>

              <button
                onClick={() => setCredentialHandoff(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Add Tenant Admin */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setAdminModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase mb-1">
              <UserCheck size={16} />
              <span>Create Tenant Administrator</span>
            </div>
            <h3 className="text-lg font-black text-[#17324D]">Add Admin to Developer Workspace</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Assign an executive login profile to any registered builder tenant with password generation.
            </p>

            <form onSubmit={handleAddAdminSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assign to Developer Company *</label>
                <select
                  value={newAdminForm.companyId}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, companyId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                >
                  {allCompanies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code}) - {c.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Admin Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Priya Nair"
                    value={newAdminForm.name}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Login Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="priya.nair@company.com"
                    value={newAdminForm.email}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 45678"
                    value={newAdminForm.phone}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="Head of Operations & Co-Founder"
                    value={newAdminForm.designation}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, designation: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              {/* Password Generator */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Generated Password *</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type={newAdminForm.showPassword ? 'text' : 'password'}
                      required
                      value={newAdminForm.password}
                      onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                      className="w-full px-3 py-2 pr-10 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setNewAdminForm({ ...newAdminForm, showPassword: !newAdminForm.showPassword })}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                    >
                      {newAdminForm.showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNewAdminForm({ ...newAdminForm, password: generateSecurePassword('Admin') });
                    }}
                    className="h-9 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold flex items-center gap-1 shrink-0"
                  >
                    <RefreshCw size={13} />
                    <span>Regen</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#17324D] hover:bg-[#244761] text-white rounded-lg font-bold shadow-md flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Create Admin User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Modify Subscription Tier */}
      {subscriptionModalOpen && selectedCompanyForSub && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setSubscriptionModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-purple-600 text-xs font-bold uppercase mb-1">
              <CreditCard size={16} />
              <span>Modify Subscription Tier</span>
            </div>
            <h3 className="text-lg font-black text-[#17324D]">{selectedCompanyForSub.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Upgrade or downgrade active subscription tier, change user seat limits, and recalculate monthly MRR fee.
            </p>

            <form onSubmit={handleSubscriptionSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select SaaS Plan</label>
                <select
                  value={selectedCompanyForSub.plan}
                  onChange={(e) => {
                    const plan = e.target.value as any;
                    setSelectedCompanyForSub({
                      ...selectedCompanyForSub,
                      plan,
                      userLimit: plan === 'Starter' ? 5 : plan === 'Enterprise' ? 50 : 20,
                      projectLimit: plan === 'Starter' ? 2 : plan === 'Enterprise' ? 25 : 10,
                      monthlyFee: plan === 'Starter' ? 199 : plan === 'Enterprise' ? 999 : 499,
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                >
                  <option value="Starter">Starter ($199/mo • 5 Seats)</option>
                  <option value="Professional">Professional ($499/mo • 20 Seats)</option>
                  <option value="Enterprise">Enterprise ($999/mo • 50+ Seats)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">User Limit Quota</label>
                  <input
                    type="number"
                    value={selectedCompanyForSub.userLimit}
                    onChange={(e) => setSelectedCompanyForSub({ ...selectedCompanyForSub, userLimit: parseInt(e.target.value) || 20 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Limit</label>
                  <input
                    type="number"
                    value={selectedCompanyForSub.projectLimit}
                    onChange={(e) => setSelectedCompanyForSub({ ...selectedCompanyForSub, projectLimit: parseInt(e.target.value) || 10 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between">
                <span className="text-purple-900 font-semibold">New Monthly Billing Rate:</span>
                <span className="font-mono font-black text-purple-900 text-sm">
                  ${(selectedCompanyForSub.monthlyFee || 499).toLocaleString('en-US')}/mo
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSubscriptionModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md"
                >
                  Apply Subscription Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: Company Legal Dossier Slide-Over / Modal */}
      {companyDetailsModalOpen && selectedCompanyDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCompanyDetailsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase mb-1">
              <Building2 size={16} />
              <span>Developer Legal Registry Dossier</span>
            </div>
            <h3 className="text-xl font-black text-[#17324D]">{selectedCompanyDetails.name}</h3>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 font-mono mt-1">
              TENANT CODE: {selectedCompanyDetails.code} • ID: {selectedCompanyDetails.id}
            </span>

            <div className="mt-4 space-y-4 text-xs">
              {/* Legal Registrations Block */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block border-b border-slate-200 pb-1">
                  Statutory & Compliance Registrations
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">Company CIN (ROC):</span>
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      {selectedCompanyDetails.registrationNumber || selectedCompanyDetails.cin || 'NOT RECORDED'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">State RERA ID:</span>
                    <span className="font-mono font-bold text-teal-700 text-xs">
                      {selectedCompanyDetails.reraNumber || 'NOT RECORDED'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">GSTIN:</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {selectedCompanyDetails.gstin || 'NOT RECORDED'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">Headquarters:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedCompanyDetails.city}, {selectedCompanyDetails.state || 'India'}
                    </span>
                  </div>
                </div>

                {selectedCompanyDetails.address && (
                  <div className="pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold block">Registered Office:</span>
                    <span className="text-slate-700">{selectedCompanyDetails.address}</span>
                  </div>
                )}
              </div>

              {/* Subscription & Quota Block */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block border-b border-slate-200 pb-1">
                  SaaS Subscription & Account Quotas
                </span>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Current Tier</span>
                    <span className="font-bold text-purple-700 text-xs">{selectedCompanyDetails.plan}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">User Quota</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedCompanyDetails.userLimit} Seats</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Monthly Rate</span>
                    <span className="font-bold text-emerald-700 text-xs">
                      ${(selectedCompanyDetails.monthlyFee || 499).toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Contact */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block border-b border-slate-200 pb-1">
                  Primary Administrator
                </span>
                <p className="font-bold text-slate-900">{selectedCompanyDetails.adminName || 'Admin User'}</p>
                <div className="flex items-center gap-3 text-slate-600 font-mono text-[11px]">
                  <span>{selectedCompanyDetails.contactEmail || selectedCompanyDetails.adminEmail}</span>
                  <span>•</span>
                  <span>{selectedCompanyDetails.phone}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setCompanyDetailsModalOpen(false);
                  handleImpersonateTenant(selectedCompanyDetails);
                }}
                className="px-4 py-2 bg-[#3478C9] hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <ExternalLink size={13} />
                <span>Impersonate Tenant</span>
              </button>
              <button
                onClick={() => setCompanyDetailsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: View Admin Credentials */}
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
              Verified platform credentials for tenant workspace.
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
                    {selectedAdminForCredentials.password || 'admin123'}
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
                  copyToClipboard(
                    `Email: ${selectedAdminForCredentials.email}\nPassword: ${selectedAdminForCredentials.password || 'admin123'}`,
                    'Admin Credentials'
                  );
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

      {/* MODAL 7: Printable Official GST SaaS Tax Invoice */}
      {invoiceModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInvoiceModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 print:hidden"
            >
              <X size={20} />
            </button>

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

              {/* Billed To / Details (with CIN and RERA) */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Billed To (Developer Tenant)</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedInvoice.companyName}</p>
                  <p className="text-slate-600 font-mono text-[11px]">
                    CIN: {selectedInvoice.cin || 'U45200KA2024PTC189201'}
                  </p>
                  <p className="text-teal-700 font-mono text-[11px]">
                    RERA ID: {selectedInvoice.reraNumber || 'PRM/KA/RERA/1251/310/PR/240115'}
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">
                    GSTIN: {selectedInvoice.gstin || '29AABCE9876F1Z5'}
                  </p>
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
                      ${selectedInvoice.baseAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="bg-slate-100/80 font-bold text-slate-900">
                    <td colSpan={2} className="py-3 px-3 text-right text-sm">
                      Total Invoice Value (USD):
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-[#17324D]">
                      ${selectedInvoice.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
