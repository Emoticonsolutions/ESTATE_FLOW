export type CompanyId = 'comp-prestige' | 'comp-godrej' | 'comp-urbannest';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'COMPANY_ADMIN'
  | 'SALES_MANAGER'
  | 'SALES_EXECUTIVE'
  | 'ACCOUNTS_MANAGER'
  | 'BROKER';

export type LeadPriority = 'Hot' | 'Warm' | 'Cold' | 'Qualified';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Interested'
  | 'Site Visit Scheduled'
  | 'Site Visit Completed'
  | 'Negotiation'
  | 'Booked'
  | 'Lost';

export type UnitStatus = 'Available' | 'Blocked' | 'Reserved' | 'Booked' | 'Sold' | 'On Hold';

export type BookingStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Confirmed' | 'Cancelled' | 'Refunded';

export type FollowUpType = 'Phone Call' | 'WhatsApp' | 'Email' | 'Meeting' | 'Site Visit' | 'Other';

export interface Company {
  id: string;
  name: string;
  code: string;
  logo?: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Suspended' | 'Trial';
  userLimit: number;
  projectLimit: number;
  contactEmail: string;
  phone: string;
  city: string;
  createdAt: string;

  // Legal Registration & Compliance (CIN, RERA, GSTIN)
  registrationNumber?: string; // Corporate Identification Number (CIN) or Firm Reg Number
  cin?: string;
  reraNumber?: string; // State RERA Builder/Promoter Reg ID
  gstin?: string; // 15-digit GSTIN
  panNumber?: string;
  address?: string;
  state?: string;
  pincode?: string;

  // SaaS Subscription & Billing
  monthlyFee?: number;
  billingCycle?: 'Monthly' | 'Annual';
  nextRenewalDate?: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Overdue';
  adminName?: string;
  adminEmail?: string;
  usersCount?: number;
  projectsCount?: number;
  unitsCount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: UserRole;
  companyId: string;
  department: string;
  designation: string;
  avatar?: string;
  assignedProjects: string[];
  status: 'Active' | 'Inactive';
}

export interface Lead {
  id: string;
  leadNumber: string;
  companyId: string;
  fullName: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  city: string;
  state: string;
  preferredContactMethod: 'Phone' | 'WhatsApp' | 'Email';
  
  // Property Requirements
  interestedProjectId: string;
  propertyType: 'Apartment' | 'Villa' | 'Plot' | 'Penthouse' | 'Commercial';
  configuration: '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | 'Studio';
  budgetMin: number; // In INR Lakhs
  budgetMax: number;
  preferredFloor?: string;
  purpose: 'End-use' | 'Investment';
  possessionPreference: 'Ready to Move' | 'Under Construction' | 'Within 6 Months';

  // Lead Meta
  source: 'Google Ads' | 'Meta (Facebook/IG)' | 'Website Form' | '99acres' | 'MagicBricks' | 'Walk-in' | 'Broker Referral';
  campaign?: string;
  priority: LeadPriority;
  assignedManagerId: string;
  assignedExecutiveId: string;
  status: LeadStatus;
  aiScore: number; // 0 - 100
  notes: string;
  nextFollowUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: 'Call' | 'Meeting' | 'Note' | 'Email' | 'WhatsApp' | 'Site Visit' | 'Status Change';
  title: string;
  description: string;
  performedBy: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  companyId: string;
  leadId: string;
  leadName: string;
  leadMobile: string;
  assignedToId: string;
  assignedToName: string;
  type: FollowUpType;
  dateTime: string;
  remarks: string;
  isCompleted: boolean;
  completionNotes?: string;
  completedAt?: string;
  isOverdue: boolean;
}

export interface Project {
  id: string;
  companyId: string;
  name: string;
  code: string;
  builderName: string;
  category: 'Residential' | 'Commercial' | 'Mixed';
  type: 'High-Rise Apartments' | 'Luxury Villas' | 'Gated Community' | 'Plotted Development';
  location: string;
  city: string;
  state: string;
  pincode: string;
  reraNumber: string;
  launchDate: string;
  possessionDate: string;
  status: 'Pre-Launch' | 'Under Construction' | 'Ready to Move';
  totalLandArea: string; // e.g. "12.5 Acres"
  amenities: string[];
  imageUrl: string;
  totalTowers: number;
  totalUnits: number;
  availableUnits: number;
  bookedUnits: number;
  blockedUnits: number;
  baseRatePerSqFt: number;
}

export interface Tower {
  id: string;
  projectId: string;
  name: string;
  code: string;
  totalFloors: number;
  unitsPerFloor: number;
  totalUnits: number;
  description: string;
}

export interface Floor {
  id: string;
  towerId: string;
  projectId: string;
  floorNumber: number;
  floorLabel: string;
  floorRisePrice: number; // per sqft or lump sum
}

export interface Unit {
  id: string;
  companyId: string;
  projectId: string;
  towerId: string;
  floorNumber: number;
  unitNumber: string;
  unitType: '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | 'Penthouse';
  bhk: string;
  carpetArea: number; // sq ft
  builtUpArea: number;
  superBuiltUpArea: number;
  balconyArea: number;
  facing: 'North' | 'East' | 'North-East' | 'West' | 'South';
  basePrice: number;
  floorRiseRate: number;
  plcRate: number; // Prime Location Charges
  parkingCharges: number;
  clubhouseCharges: number;
  maintenanceCharges: number;
  status: UnitStatus;
  blockedUntil?: string;
  blockedBy?: string;
  bookedByLeadId?: string;
  customerName?: string;
}

export interface CostSheet {
  id: string;
  companyId: string;
  projectId: string;
  unitId: string;
  customerName: string;
  customerMobile: string;
  basePrice: number;
  floorRise: number;
  plc: number;
  parking: number;
  clubhouse: number;
  maintenance: number;
  otherCharges: number;
  subtotal: number;
  discount: number;
  discountApprovedBy?: string;
  taxGstRate: number; // e.g. 5%
  taxGstAmount: number;
  finalTotal: number;
  paymentPlanType: 'Construction Linked' | 'Down Payment 10:90' | 'Flexi 50:50';
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  companyId: string;
  projectId: string;
  projectName: string;
  unitId: string;
  unitNumber: string;
  leadId: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  agreedPrice: number;
  bookingAmount: number;
  paymentPlan: string;
  salesExecutiveName: string;
  brokerId?: string;
  brokerName?: string;
  status: BookingStatus;
  bookingDate: string;
  notes: string;
  allotmentLetterGenerated: boolean;
}

export interface PaymentScheduleItem {
  id: string;
  bookingId: string;
  milestoneName: string;
  percentage: number;
  amountDue: number;
  dueDate: string;
  amountPaid: number;
  status: 'Pending' | 'Partially Paid' | 'Paid' | 'Overdue';
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  companyId: string;
  bookingId: string;
  customerName: string;
  unitNumber: string;
  amount: number;
  paymentMethod: 'Bank Transfer' | 'UPI' | 'Cheque' | 'Cash' | 'Payment Gateway';
  referenceNumber: string;
  paymentDate: string;
  status: 'Confirmed' | 'Pending Verification' | 'Bounced';
  receivedBy: string;
}

export interface Broker {
  id: string;
  companyId: string;
  name: string;
  agencyName: string;
  reraRegistration: string;
  mobile: string;
  email: string;
  city: string;
  commissionPercentage: number;
  totalDeals: number;
  totalVolume: number; // in INR Cr
  commissionEarned: number;
  commissionPaid: number;
  commissionPending: number;
  status: 'Active' | 'Pending Approval' | 'Suspended';
}

export interface BrokerDeal {
  id: string;
  brokerId: string;
  brokerName: string;
  clientName: string;
  clientMobile: string;
  projectId: string;
  unitNumber?: string;
  stage: 'Introduction' | 'Site Visit' | 'Negotiation' | 'Booking' | 'Handover';
  dealValue: number;
  commissionAmount: number;
  payoutStatus: 'Pending' | 'Approved' | 'Paid';
  createdAt: string;
}

export interface MessageTemplate {
  id: string;
  companyId: string;
  channel: 'WhatsApp' | 'Email';
  title: string;
  category: 'Welcome' | 'Brochure' | 'Site Visit' | 'Follow-up' | 'Payment Reminder' | 'Booking Confirmation';
  content: string;
  approved: boolean;
}

export interface AutomationWorkflow {
  id: string;
  companyId: string;
  name: string;
  trigger: 'New Lead Created' | 'Lead Assigned' | 'Site Visit Scheduled' | 'Booking Confirmed' | 'Payment Due';
  steps: {
    id: string;
    action: string;
    delay?: string;
    details: string;
  }[];
  isActive: boolean;
}

