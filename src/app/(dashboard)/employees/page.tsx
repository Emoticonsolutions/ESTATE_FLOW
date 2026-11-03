'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Search,
  Filter,
  UserCheck,
  Building,
  Phone,
  Mail,
  Check,
  X,
  Lock,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { INITIAL_USERS } from '@/lib/mockData';
import { User, UserRole } from '@/types';

export default function EmployeesPage() {
  const { currentCompany, currentRole, setRole, hasPermission } = useTenant();
  const [activeTab, setActiveTab] = useState<'employees' | 'permissions'>('employees');
  const [usersList, setUsersList] = useState<User[]>(INITIAL_USERS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Employee Form
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '+91 ',
    role: 'SALES_EXECUTIVE' as UserRole,
    department: 'Sales',
    designation: 'Property Advisor',
  });

  // Configurable Permission Matrix (Section 4 Module 14)
  const [permissionMatrix, setPermissionMatrix] = useState([
    { module: 'Leads Management', view: true, create: true, edit: true, delete: false, approve: false },
    { module: 'Projects & Master Plans', view: true, create: false, edit: false, delete: false, approve: false },
    { module: 'Towers & Unit Inventory', view: true, create: false, edit: false, delete: false, approve: false },
    { module: 'Bookings & Allotments', view: true, create: true, edit: true, delete: false, approve: true },
    { module: 'Payments & Receipts', view: true, create: true, edit: false, delete: false, approve: true },
    { module: 'Reports & Analytics', view: true, create: false, edit: false, delete: false, approve: false },
  ]);

  const toggleMatrixCell = (moduleIdx: number, field: 'view' | 'create' | 'edit' | 'delete' | 'approve') => {
    setPermissionMatrix((prev) =>
      prev.map((row, idx) => (idx === moduleIdx ? { ...row, [field]: !row[field] } : row))
    );
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newU: User = {
      ...userForm,
      id: `user-${Date.now()}`,
      companyId: currentCompany.id,
      assignedProjects: ['proj-1'],
      status: 'Active',
    };
    setUsersList([...usersList, newU]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">Employee Directory & RBAC Security</h1>
            <span className="text-xs bg-blue-50 text-estate-blue font-bold px-2 py-0.5 rounded-full border border-blue-200">
              Role-Based Access Control
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Manage company team members, project assignments and granular module permission matrix
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-estate-border bg-white px-4 rounded-t-card text-xs font-bold">
        {[
          { id: 'employees', label: 'Company Employees & Roles' },
          { id: 'permissions', label: 'Configurable RBAC Permission Matrix' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-3.5 px-4 border-b-2 transition-all ${
              activeTab === t.id
                ? 'border-estate-blue text-estate-blue'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Employees List */}
      {activeTab === 'employees' && (
        <div className="bg-white rounded-b-card border border-estate-border shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-estate-border text-slate-500 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Designation & Dept</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">System Role</th>
                  <th className="py-3 px-4">Assigned Projects</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Switch As</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-border text-slate-700">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-blue-50/40 h-[52px]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-estate-navy text-white flex items-center justify-center font-bold text-xs">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{u.designation}</p>
                      <span className="text-[10px] text-slate-400">{u.department}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{u.phone}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      Falcon City Ph 2 ({u.assignedProjects.length})
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setRole(u.role);
                          alert(`Switched active session to: ${u.name} (${u.role})`);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-bold"
                      >
                        Simulate Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Configurable Permission Matrix (Section 4 Module 14) */}
      {activeTab === 'permissions' && (
        <div className="bg-white rounded-b-card border border-estate-border shadow-sm p-6 text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-estate-navy">Customizable Role Permission Matrix</h3>
              <p className="text-slate-500 text-xs">
                Fine-tune create, edit, delete and approval capabilities across company roles.
              </p>
            </div>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
              Backend Authorization Guard Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4 text-left">Module</th>
                  <th className="py-3 px-4">View</th>
                  <th className="py-3 px-4">Create</th>
                  <th className="py-3 px-4">Edit</th>
                  <th className="py-3 px-4">Delete</th>
                  <th className="py-3 px-4">Approve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionMatrix.map((row, idx) => (
                  <tr key={row.module} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-left text-slate-900">{row.module}</td>
                    {(['view', 'create', 'edit', 'delete', 'approve'] as const).map((field) => (
                      <td key={field} className="py-3 px-4">
                        <button
                          onClick={() => toggleMatrixCell(idx, field)}
                          className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                            row[field]
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-300 hover:text-slate-500'
                          }`}
                        >
                          {row[field] ? <Check size={16} /> : <X size={16} />}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-estate-border">
            <div className="flex items-center justify-between pb-3 border-b border-estate-border">
              <h3 className="font-black text-base text-estate-navy">Register New Employee</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Karan Mehra"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  placeholder="karan.m@prestigeconstructions.com"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">System Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-bold"
                  >
                    <option value="SALES_EXECUTIVE">Sales Executive</option>
                    <option value="SALES_MANAGER">Sales Manager</option>
                    <option value="ACCOUNTS_MANAGER">Accounts Manager</option>
                    <option value="COMPANY_ADMIN">Company Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-estate-blue text-white rounded-lg font-bold shadow-md hover:bg-blue-600"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

