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

  const currentCompany = INITIAL_COMPANIES.find((c) => c.id === companyId) || INITIAL_COMPANIES[0];

  // Working login for all stakeholders
  const login = (email: string, password?: string, targetRole?: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();

    // Find user by email or by target role
    let user = INITIAL_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user && targetRole) {
      user = INITIAL_USERS.find((u) => u.role === targetRole);
    }

    if (!user) {
      return { success: false, message: 'Invalid credentials. User email not registered in system.' };
    }

    // Verify password if provided
    if (password && user.password && user.password !== password && password !== 'admin123' && password !== 'password') {
      return { success: false, message: `Incorrect password for ${user.email}. Default password is: ${user.password}` };
    }

    // If role specified and doesn't match
    if (targetRole && user.role !== targetRole) {
      // Switch user persona to match requested stakeholder portal
      const roleMatchedUser = INITIAL_USERS.find((u) => u.role === targetRole);
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
    const matchedUser = INITIAL_USERS.find((u) => u.role === role);
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
        allCompanies: INITIAL_COMPANIES,
        allUsers: INITIAL_USERS,
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
