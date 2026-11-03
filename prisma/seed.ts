import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding on Neon PostgreSQL...');

  // 1. Seed Companies (Developer Tenants)
  const prestige = await prisma.company.upsert({
    where: { code: 'PRESTIGE' },
    update: {},
    create: {
      id: 'comp-prestige',
      name: 'Prestige Estates Projects Ltd',
      code: 'PRESTIGE',
      plan: 'Enterprise',
      status: 'Active',
      userLimit: 50,
      projectLimit: 25,
      contactEmail: 'crm-admin@prestigeconstructions.com',
      phone: '+91 80 2559 1080',
      city: 'Bangalore',
      registrationNumber: 'L45200KA1997PLC022365',
      cin: 'L45200KA1997PLC022365',
      reraNumber: 'PRM/KA/RERA/1251/310/PR/170915/000123',
      gstin: '29AABCP1234F1Z1',
      panNumber: 'AABCP1234F',
      address: 'The Falcon House, No. 1 Main Guard Cross Road, Bangalore - 560001',
      state: 'Karnataka',
      pincode: '560001',
      monthlyFee: 89999,
      billingCycle: 'Annual',
      nextRenewalDate: '2027-01-15',
      paymentStatus: 'Paid',
      adminName: 'Vikramaditya Rao',
      adminEmail: 'vikram.rao@prestigeconstructions.com',
    },
  });

  const godrej = await prisma.company.upsert({
    where: { code: 'GODREJ' },
    update: {},
    create: {
      id: 'comp-godrej',
      name: 'Godrej Skyline Developers',
      code: 'GODREJ',
      plan: 'Professional',
      status: 'Active',
      userLimit: 20,
      projectLimit: 10,
      contactEmail: 'support@godrejskyline.com',
      phone: '+91 22 6796 5656',
      city: 'Mumbai',
      registrationNumber: 'L74120MH1985PLC035308',
      cin: 'L74120MH1985PLC035308',
      reraNumber: 'P51800000832',
      gstin: '27AAACG0532N1Z4',
      panNumber: 'AAACG0532N',
      address: 'Godrej One, 5th Floor, Pirojshanagar, Eastern Express Highway, Vikhroli East, Mumbai - 400079',
      state: 'Maharashtra',
      pincode: '400079',
      monthlyFee: 34999,
      billingCycle: 'Monthly',
      nextRenewalDate: '2026-11-20',
      paymentStatus: 'Paid',
      adminName: 'Priya Nair',
      adminEmail: 'priya.nair@godrejskyline.com',
    },
  });

  const urbanNest = await prisma.company.upsert({
    where: { code: 'URBAN' },
    update: {},
    create: {
      id: 'comp-urbannest',
      name: 'Urban Nest Properties',
      code: 'URBAN',
      plan: 'Starter',
      status: 'Active',
      userLimit: 5,
      projectLimit: 2,
      contactEmail: 'sales@urbannest.in',
      phone: '+91 11 4152 7890',
      city: 'Gurugram',
      registrationNumber: 'U45200DL2018PTC328901',
      cin: 'U45200DL2018PTC328901',
      reraNumber: 'RC/REP/HARERA/GGM/2018/14',
      gstin: '07AABCU9876D1Z2',
      panNumber: 'AABCU9876D',
      address: 'Golf Course Road, Sector 54, Gurugram, Haryana - 122002',
      state: 'Haryana',
      pincode: '122002',
      monthlyFee: 14999,
      billingCycle: 'Monthly',
      nextRenewalDate: '2026-11-10',
      paymentStatus: 'Pending',
      adminName: 'Rajesh Khurana',
      adminEmail: 'rajesh.k@urbannest.in',
    },
  });

  console.log('✅ Seeded 3 Developer Companies (Prestige, Godrej, Urban Nest)');

  // 2. Seed Super Admin & Company Users
  await prisma.user.upsert({
    where: { email: 'solutionsemoticon@gmail.com' },
    update: {
      password: 'SuperAdmin@123',
    },
    create: {
      id: 'user-super-admin',
      name: 'Platform Owner (Emoticon Solutions)',
      email: 'solutionsemoticon@gmail.com',
      phone: '+91 98100 12345',
      password: 'SuperAdmin@123',
      role: 'SUPER_ADMIN',
      companyId: prestige.id,
      department: 'Platform Administration',
      designation: 'Platform Owner & Super Admin',
      status: 'Active',
    },
  });

  await prisma.user.upsert({
    where: { email: 'vikram.rao@prestigeconstructions.com' },
    update: {},
    create: {
      id: 'user-company-admin',
      name: 'Vikramaditya Rao',
      email: 'vikram.rao@prestigeconstructions.com',
      phone: '+91 98450 78901',
      password: 'admin123',
      role: 'COMPANY_ADMIN',
      companyId: prestige.id,
      department: 'Executive Leadership',
      designation: 'Managing Director & VP Sales',
      status: 'Active',
    },
  });

  await prisma.user.upsert({
    where: { email: 'ananya.d@prestigeconstructions.com' },
    update: {},
    create: {
      id: 'user-sales-manager',
      name: 'Ananya Deshmukh',
      email: 'ananya.d@prestigeconstructions.com',
      phone: '+91 98860 34567',
      password: 'sales123',
      role: 'SALES_MANAGER',
      companyId: prestige.id,
      department: 'Sales & Marketing',
      designation: 'Senior General Manager - Sales',
      status: 'Active',
    },
  });

  await prisma.user.upsert({
    where: { email: 'rohan.s@prestigeconstructions.com' },
    update: {},
    create: {
      id: 'user-sales-exec-1',
      name: 'Rohan Sharma',
      email: 'rohan.s@prestigeconstructions.com',
      phone: '+91 97401 22334',
      password: 'sales123',
      role: 'SALES_EXECUTIVE',
      companyId: prestige.id,
      department: 'Sales',
      designation: 'Senior Property Advisor',
      status: 'Active',
    },
  });

  console.log('✅ Seeded Users (Super Admin + Prestige Team)');

  // 3. Seed Projects & Towers
  const project1 = await prisma.project.upsert({
    where: { id: 'proj-1' },
    update: {},
    create: {
      id: 'proj-1',
      companyId: prestige.id,
      name: 'Prestige Falcon City Phase 2',
      code: 'PFC-PH2',
      location: 'Kanakapura Road, Near Metro Station',
      city: 'Bangalore',
      reraNumber: 'PRM/KA/RERA/1251/310/PR/170915/000123',
      status: 'Active',
      totalUnits: 120,
      availableUnits: 84,
      launchDate: '2024-03-01',
      completionDate: '2027-12-31',
    },
  });

  const towerA = await prisma.tower.upsert({
    where: { id: 'tower-1' },
    update: {},
    create: {
      id: 'tower-1',
      projectId: project1.id,
      name: 'Tower A (Falcon Crest)',
      floorsCount: 14,
      unitsPerFloor: 4,
    },
  });

  // 4. Seed Inventory Units
  const sampleUnits = [
    { id: 'unit-101', num: 'A-101', floor: 1, config: '2 BHK', sba: 1250, carpet: 950, facing: 'East', rate: 7800, cost: 9750000, status: 'Available' },
    { id: 'unit-102', num: 'A-102', floor: 1, config: '3 BHK', sba: 1680, carpet: 1280, facing: 'North', rate: 8200, cost: 13776000, status: 'Booked', customer: 'Ramesh Sundaram', mobile: '+91 98450 11223' },
    { id: 'unit-103', num: 'A-103', floor: 1, config: '3 BHK', sba: 1720, carpet: 1310, facing: 'Park View', rate: 8500, cost: 14620000, status: 'Blocked', blockedBy: 'Rohan Sharma' },
    { id: 'unit-104', num: 'A-104', floor: 1, config: '2 BHK', sba: 1250, carpet: 950, facing: 'West', rate: 7600, cost: 9500000, status: 'Available' },
    { id: 'unit-201', num: 'A-201', floor: 2, config: '2 BHK', sba: 1250, carpet: 950, facing: 'East', rate: 7900, cost: 9875000, status: 'Available' },
    { id: 'unit-202', num: 'A-202', floor: 2, config: '3 BHK', sba: 1680, carpet: 1280, facing: 'North', rate: 8300, cost: 13944000, status: 'Available' },
  ];

  for (const u of sampleUnits) {
    await prisma.unit.upsert({
      where: { id: u.id },
      update: {},
      create: {
        id: u.id,
        companyId: prestige.id,
        towerId: towerA.id,
        unitNumber: u.num,
        floorNumber: u.floor,
        configuration: u.config,
        superBuiltUpArea: u.sba,
        carpetArea: u.carpet,
        facing: u.facing,
        baseRatePerSqFt: u.rate,
        totalCost: u.cost,
        status: u.status,
        ownerCustomerName: u.customer,
        ownerMobile: u.mobile,
        blockedBy: u.blockedBy,
      },
    });
  }
  console.log('✅ Seeded Project, Tower & Inventory Units');

  // 5. Seed Real Estate Leads
  const sampleLeads = [
    {
      id: 'lead-1',
      leadNumber: 'LEAD-2026-1001',
      fullName: 'Dr. Arjun Rampal',
      mobile: '+91 98450 23456',
      email: 'arjun.rampal@hospital.org',
      city: 'Bangalore',
      propertyType: 'Apartment',
      configuration: '3 BHK',
      budgetMin: 130,
      budgetMax: 160,
      source: 'Google Ads',
      priority: 'Hot',
      status: 'Negotiation',
      aiScore: 92,
      notes: 'Visited site yesterday with spouse. Very interested in Tower A East-facing unit.',
    },
    {
      id: 'lead-2',
      leadNumber: 'LEAD-2026-1002',
      fullName: 'Siddharth Mallya',
      mobile: '+91 98860 88991',
      email: 'sid.mallya@techcorp.io',
      city: 'Bangalore',
      propertyType: 'Apartment',
      configuration: '2 BHK',
      budgetMin: 90,
      budgetMax: 110,
      source: 'Meta (Facebook/IG)',
      priority: 'Warm',
      status: 'Site Visit Scheduled',
      aiScore: 78,
      notes: 'Scheduled site visit for this upcoming Saturday 11:00 AM.',
    },
    {
      id: 'lead-3',
      leadNumber: 'LEAD-2026-1003',
      fullName: 'Kavita Menon',
      mobile: '+91 97400 44552',
      email: 'kavita.menon@finconsult.in',
      city: 'Bangalore',
      propertyType: 'Villa',
      configuration: '4 BHK',
      budgetMin: 250,
      budgetMax: 350,
      source: 'Website Form',
      priority: 'Qualified',
      status: 'Contacted',
      aiScore: 84,
      notes: 'Looking for luxury premium villa ready-to-move within 6 months.',
    },
  ];

  for (const l of sampleLeads) {
    await prisma.lead.upsert({
      where: { leadNumber: l.leadNumber },
      update: {},
      create: {
        id: l.id,
        leadNumber: l.leadNumber,
        companyId: prestige.id,
        fullName: l.fullName,
        mobile: l.mobile,
        email: l.email,
        city: l.city,
        propertyType: l.propertyType,
        configuration: l.configuration,
        budgetMin: l.budgetMin,
        budgetMax: l.budgetMax,
        source: l.source,
        priority: l.priority,
        status: l.status,
        aiScore: l.aiScore,
        notes: l.notes,
      },
    });
  }
  console.log('✅ Seeded Real Estate Leads');

  // 6. Seed SaaS Invoices
  await prisma.saaSInvoice.upsert({
    where: { invoiceNumber: 'INV-2026-11-001' },
    update: {},
    create: {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-11-001',
      companyId: prestige.id,
      companyName: prestige.name,
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
      cin: prestige.cin,
      reraNumber: prestige.reraNumber,
      gstin: prestige.gstin,
    },
  });

  console.log('🎉 Neon PostgreSQL database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
