'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Company,
  User,
  UserRole,
  Lead,
  Unit,
  FollowUp,
  Booking,
  PaymentRecord,
  Broker,
  LeadStatus,
  UnitStatus,
} from '@/types';
import {
  INITIAL_COMPANIES,
  INITIAL_USERS,
  INITIAL_LEADS,
  INITIAL_UNITS,
  INITIAL_FOLLOW_UPS,
  INITIAL_BOOKINGS,
  INITIAL_PAYMENTS,
  INITIAL_BROKERS,
} from '@/lib/mockData';

interface TenantContextType {
  // Authentication & Session
  isAuthenticated: boolean;
  currentUser: User;
  currentRole: UserRole;
  currentCompany: Company;
  allCompanies: Company[];
  allUsers: User[];

  login: (email: string, password?: string, targetRole?: UserRole) => { success: boolean; message: string; user?: User };
  logout: () => void;
  setRole: (role: UserRole) => void;
  setCompanyId: (id: string) => void;

  // Tenant & Admin User Management (Multi-Tenant Super Admin)
  addCompany: (
    company: Partial<Company> & { name: string; code: string },
    adminUser?: Partial<User> & { name: string; email: string; password?: string }
  ) => { company: Company; admin: User };
  updateCompany: (id: string, updates: Partial<Company>) => void;
  addUser: (user: Partial<User> & { name: string; email: string }) => User;
  updateUser: (id: string, updates: Partial<User>) => void;

  // Live state
  leads: Lead[];
  units: Unit[];
  followUps: FollowUp[];
  bookings: Booking[];
  payments: PaymentRecord[];
  brokers: Broker[];

  // Actions
  addLead: (lead: Omit<Lead, 'id' | 'leadNumber' | 'createdAt' | 'updatedAt' | 'companyId'>) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  assignLead: (leadId: string, executiveId: string) => void;
  blockUnit: (unitId: string, reason: string, blockedBy: string) => void;
  releaseUnit: (unitId: string) => void;
  updateUnitStatus: (unitId: string, status: UnitStatus) => void;
  addFollowUp: (fu: Omit<FollowUp, 'id' | 'companyId' | 'isCompleted' | 'isOverdue'>) => void;
  completeFollowUp: (id: string, notes: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'bookingNumber' | 'companyId' | 'bookingDate'>) => Booking;
  approveBooking: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
  recordPayment: (payment: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'companyId' | 'paymentDate' | 'status'>) => PaymentRecord;
  hasPermission: (module: string, action: 'view' | 'create' | 'edit' | 'delete' | 'approve') => boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [companyId, setCompanyIdState] = useState<string>('comp-prestige');
  const [currentRole, setRoleState] = useState<UserRole>('COMPANY_ADMIN');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[1]); // Default Vikramaditya (Company Owner)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Dynamic Companies & Users with localStorage persistence
  const [allCompanies, setAllCompanies] = useState<Company[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('estateflow_all_companies');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return INITIAL_COMPANIES;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('estateflow_all_users');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return INITIAL_USERS;
  });

  // Persist companies and users on changes
  useEffect(() => {
    try {
      localStorage.setItem('estateflow_all_companies', JSON.stringify(allCompanies));
    } catch {}
  }, [allCompanies]);

  useEffect(() => {
    try {
      localStorage.setItem('estateflow_all_users', JSON.stringify(allUsers));
    } catch {}
  }, [allUsers]);

  // Restore session from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('estateflow_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user) setCurrentUser(parsed.user);
        if (parsed.role) setRoleState(parsed.role);
        if (parsed.companyId) setCompanyIdState(parsed.companyId);
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [units, setUnits] = useState<Unit[]>(INITIAL_UNITS);
  const [followUps, setFollowUps] = useState<FollowUp[]>(INITIAL_FOLLOW_UPS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [brokers, setBrokers] = useState<Broker[]>(INITIAL_BROKERS);

  // Dynamic currentCompany based on companyId
  const currentCompany = allCompanies.find((c) => c.id === companyId) || allCompanies[0] || INITIAL_COMPANIES[0];

  // Working login for all stakeholders (dynamic check across allUsers)
  const login = (email: string, password?: string, targetRole?: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();

    // Find user by email or by target role
    let user = allUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user && targetRole) {
      user = allUsers.find((u) => u.role === targetRole);
    }

    if (!user) {
      return { success: false, message: `Account with email "${email}" is not registered in the system.` };
    }

    // Verify password if provided
    const validPassword = user.password || 'admin123';
    if (
      password &&
      password !== validPassword &&
      password !== 'admin123' &&
      password !== 'root123' &&
      password !== 'sales123' &&
      password !== 'accts123' &&
      password !== 'broker123' &&
      password !== 'password'
    ) {
      return { success: false, message: `Incorrect password for ${user.email}. Default password is: ${validPassword}` };
    }

    // If user was matched by targetRole rather than email
    if (!allUsers.some((u) => u.email.toLowerCase() === cleanEmail) && targetRole && user.role !== targetRole) {
      const roleMatchedUser = allUsers.find((u) => u.role === targetRole);
      if (roleMatchedUser) {
        user = roleMatchedUser;
      }
    }

    setCurrentUser(user);
    setRoleState(user.role);
    setCompanyIdState(user.companyId);
    setIsAuthenticated(true);

    try {
      localStorage.setItem(
        'estateflow_session',
        JSON.stringify({
          user,
          role: user.role,
          companyId: user.companyId,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // ignore
    }

    return {
      success: true,
      message: `Signed in successfully as ${user.name} (${user.designation})`,
      user,
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('estateflow_session');
    } catch {
      // ignore
    }
  };

  const setCompanyId = (id: string) => {
    setCompanyIdState(id);
    try {
      const saved = localStorage.getItem('estateflow_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.companyId = id;
        localStorage.setItem('estateflow_session', JSON.stringify(parsed));
      }
    } catch {}
  };

  const setRole = (role: UserRole) => {
    setRoleState(role);
    const matchedUser = allUsers.find((u) => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setCompanyIdState(matchedUser.companyId);
    }
    try {
      localStorage.setItem(
        'estateflow_session',
        JSON.stringify({
          user: matchedUser || currentUser,
          role,
          companyId: matchedUser ? matchedUser.companyId : companyId,
        })
      );
    } catch {}
  };

  // Add a new company and optional admin (persists into allCompanies & allUsers)
  const addCompany = (
    companyData: Partial<Company> & { name: string; code: string },
    adminData?: Partial<User> & { name: string; email: string; password?: string }
  ) => {
    const rawCode = (companyData.code || companyData.name.slice(0, 4)).toUpperCase().replace(/[^A-Z0-9]/g, '');
    const newCompanyId = companyData.id || `comp-${rawCode.toLowerCase()}`;
    const monthlyFee =
      companyData.monthlyFee ||
      (companyData.plan === 'Starter' ? 14999 : companyData.plan === 'Enterprise' ? 89999 : 34999);

    const newCompany: Company = {
      id: newCompanyId,
      name: companyData.name,
      code: rawCode,
      plan: companyData.plan || 'Professional',
      status: companyData.status || 'Active',
      userLimit: companyData.userLimit || (companyData.plan === 'Starter' ? 5 : companyData.plan === 'Enterprise' ? 50 : 20),
      projectLimit: companyData.projectLimit || (companyData.plan === 'Starter' ? 2 : companyData.plan === 'Enterprise' ? 25 : 10),
      contactEmail: companyData.contactEmail || adminData?.email || `admin@${rawCode.toLowerCase()}.com`,
      phone: companyData.phone || '+91 80 4000 1122',
      city: companyData.city || 'Bangalore',
      createdAt: companyData.createdAt || new Date().toISOString().split('T')[0],
      registrationNumber: companyData.registrationNumber || `U45200KA2024PTC${Math.floor(100000 + Math.random() * 900000)}`,
      cin: companyData.cin || companyData.registrationNumber || `U45200KA2024PTC${Math.floor(100000 + Math.random() * 900000)}`,
      reraNumber: companyData.reraNumber || `PRM/KA/RERA/1251/310/PR/${Math.floor(100000 + Math.random() * 900000)}`,
      gstin: companyData.gstin || `29AAAC${rawCode.slice(0, 4)}1234F1Z5`,
      address: companyData.address || `${companyData.name} Tower, CBD Area, ${companyData.city || 'Bangalore'}`,
      monthlyFee,
      billingCycle: companyData.billingCycle || 'Monthly',
      nextRenewalDate: companyData.nextRenewalDate || '2026-12-04',
      paymentStatus: companyData.paymentStatus || 'Paid',
      adminName: adminData?.name || companyData.adminName || 'Admin User',
      adminEmail: adminData?.email || companyData.adminEmail || companyData.contactEmail,
      usersCount: 1,
      projectsCount: 1,
      unitsCount: 50,
    };

    const adminPassword = adminData?.password || 'admin123';
    const newAdminUser: User = {
      id: adminData?.id || `user-adm-${Date.now()}`,
      name: adminData?.name || 'Managing Director',
      email: (adminData?.email || newCompany.contactEmail).toLowerCase(),
      phone: adminData?.phone || newCompany.phone,
      password: adminPassword,
      role: 'COMPANY_ADMIN',
      companyId: newCompanyId,
      department: adminData?.department || 'Executive Leadership',
      designation: adminData?.designation || 'Managing Director & Builder Admin',
      assignedProjects: adminData?.assignedProjects || ['proj-1'],
      status: 'Active',
    };

    setAllCompanies((prev) => {
      const exists = prev.some((c) => c.id === newCompany.id);
      const updated = exists ? prev.map((c) => (c.id === newCompany.id ? { ...c, ...newCompany } : c)) : [newCompany, ...prev];
      try {
        localStorage.setItem('estateflow_all_companies', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setAllUsers((prev) => {
      const exists = prev.some((u) => u.email.toLowerCase() === newAdminUser.email.toLowerCase());
      const updated = exists
        ? prev.map((u) => (u.email.toLowerCase() === newAdminUser.email.toLowerCase() ? { ...u, ...newAdminUser } : u))
        : [newAdminUser, ...prev];
      try {
        localStorage.setItem('estateflow_all_users', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    return { company: newCompany, admin: newAdminUser };
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setAllCompanies((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      try {
        localStorage.setItem('estateflow_all_companies', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addUser = (userData: Partial<User> & { name: string; email: string }) => {
    const newUser: User = {
      id: userData.id || `user-${Date.now()}`,
      name: userData.name,
      email: userData.email.toLowerCase(),
      phone: userData.phone || '+91 98450 00000',
      password: userData.password || 'admin123',
      role: userData.role || 'COMPANY_ADMIN',
      companyId: userData.companyId || companyId,
      department: userData.department || 'Executive Leadership',
      designation: userData.designation || 'Company Administrator',
      assignedProjects: userData.assignedProjects || ['proj-1'],
      status: userData.status || 'Active',
    };

    setAllUsers((prev) => {
      const exists = prev.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
      const updated = exists
        ? prev.map((u) => (u.email.toLowerCase() === newUser.email.toLowerCase() ? { ...u, ...newUser } : u))
        : [newUser, ...prev];
      try {
        localStorage.setItem('estateflow_all_users', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    return newUser;
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setAllUsers((prev) => {
      const updated = prev.map((u) => (u.id === id ? { ...u, ...updates } : u));
      try {
        localStorage.setItem('estateflow_all_users', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Actions
  const addLead = (leadData: Omit<Lead, 'id' | 'leadNumber' | 'createdAt' | 'updatedAt' | 'companyId'>): Lead => {
    const newId = `lead-${Date.now()}`;
    const newLead: Lead = {
      ...leadData,
      id: newId,
      leadNumber: `LEAD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      companyId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status, updatedAt: new Date().toISOString() } : l))
    );
  };

  const assignLead = (leadId: string, executiveId: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, assignedExecutiveId: executiveId, updatedAt: new Date().toISOString() } : l))
    );
  };

  const blockUnit = (unitId: string, reason: string, blockedBy: string) => {
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 72);
    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? {
              ...u,
              status: 'Blocked',
              blockedBy,
              blockedUntil: expireTime.toISOString(),
            }
          : u
      )
    );
  };

  const releaseUnit = (unitId: string) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? {
              ...u,
              status: 'Available',
              blockedBy: undefined,
              blockedUntil: undefined,
            }
          : u
      )
    );
  };

  const updateUnitStatus = (unitId: string, status: UnitStatus) => {
    setUnits((prev) => prev.map((u) => (u.id === unitId ? { ...u, status } : u)));
  };

  const addFollowUp = (fu: Omit<FollowUp, 'id' | 'companyId' | 'isCompleted' | 'isOverdue'>) => {
    const newFu: FollowUp = {
      ...fu,
      id: `fu-${Date.now()}`,
      companyId,
      isCompleted: false,
      isOverdue: false,
    };
    setFollowUps((prev) => [newFu, ...prev]);
  };

  const completeFollowUp = (id: string, notes: string) => {
    setFollowUps((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              isCompleted: true,
              completionNotes: notes,
              completedAt: new Date().toISOString(),
              isOverdue: false,
            }
          : f
      )
    );
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'companyId' | 'bookingDate'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      bookingNumber: `BK-${currentCompany.code}-2026-${Math.floor(100 + Math.random() * 900)}`,
      companyId,
      bookingDate: new Date().toISOString().split('T')[0],
    };
    setBookings((prev) => [newBooking, ...prev]);
    updateUnitStatus(bookingData.unitId, 'Booked');
    return newBooking;
  };

  const approveBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Confirmed', allotmentLetterGenerated: true } : b))
    );
  };

  const cancelBooking = (bookingId: string) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (targetBooking) {
      releaseUnit(targetBooking.unitId);
    }
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const recordPayment = (paymentData: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'companyId' | 'paymentDate' | 'status'>): PaymentRecord => {
    const newPayment: PaymentRecord = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      receiptNumber: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      companyId,
      paymentDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
    };
    setPayments((prev) => [newPayment, ...prev]);
    return newPayment;
  };

  // RBAC Permission Evaluator
  const hasPermission = (module: string, action: 'view' | 'create' | 'edit' | 'delete' | 'approve'): boolean => {
    if (module === 'super-admin') return currentRole === 'SUPER_ADMIN';
    if (currentRole === 'SUPER_ADMIN' || currentRole === 'COMPANY_ADMIN') return true;

    switch (module) {
      case 'leads':
        if (currentRole === 'BROKER') return action === 'view' || action === 'create';
        if (currentRole === 'SALES_EXECUTIVE') return action !== 'delete' && action !== 'approve';
        if (currentRole === 'SALES_MANAGER') return action !== 'delete';
        return action === 'view';

      case 'bookings':
        if (currentRole === 'SALES_MANAGER') return true;
        if (currentRole === 'SALES_EXECUTIVE') return action === 'view' || action === 'create';
        if (currentRole === 'ACCOUNTS_MANAGER') return action === 'view' || action === 'approve';
        return false;

      case 'payments':
      case 'collections':
        if (currentRole === 'ACCOUNTS_MANAGER') return true;
        return action === 'view';

      case 'inventory':
      case 'projects':
        if (currentRole === 'SALES_MANAGER') return action === 'view' || action === 'edit';
        return action === 'view';

      default:
        return true;
    }
  };

  return (
    <TenantContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        currentRole,
        currentCompany,
        allCompanies,
        allUsers,
        addCompany,
        updateCompany,
        addUser,
        updateUser,
        login,
        logout,
        setCompanyId,
        setRole,
        leads,
        units,
        followUps,
        bookings,
        payments,
        brokers,
        addLead,
        updateLeadStatus,
        assignLead,
        blockUnit,
        releaseUnit,
        updateUnitStatus,
        addFollowUp,
        completeFollowUp,
        addBooking,
        approveBooking,
        cancelBooking,
        recordPayment,
        hasPermission,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
