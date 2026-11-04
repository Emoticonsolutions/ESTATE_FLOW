import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/v1/ai-assistant — AI Sales Assistant, Lead Scoring & Pitch Generator
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      buyerName = 'Prospective Buyer',
      budgetMax = 150,
      configuration = '3 BHK',
      purpose = 'End-use',
      possession = 'Within 6 Months',
      source = 'Meta Ads',
      notes = '',
    } = body;

    // AI Propensity Algorithm
    let score = 50;
    if (budgetMax >= 140) score += 15;
    if (configuration === '3 BHK' || configuration === '4 BHK') score += 10;
    if (purpose === 'End-use') score += 10;
    if (possession.includes('Within 6 Months') || possession.includes('Ready')) score += 15;
    if (notes.toLowerCase().includes('site visit') || notes.toLowerCase().includes('token')) score += 15;
    if (score > 98) score = 98;

    const intentLevel = score >= 80 ? 'High Intent (Hot)' : score >= 65 ? 'Moderate Intent (Warm)' : 'Early Stage (Cold)';

    const suggestedUnit = budgetMax >= 180
      ? 'Tower A - Penthouse 601 (4 BHK Luxury • 2,400 sq ft • ₹2.25 Cr)'
      : budgetMax >= 130
      ? 'Tower A - Unit 304 (3 BHK Premium • 1,650 sq ft • ₹1.56 Cr)'
      : 'Tower A - Unit 202 (2 BHK Compact • 1,220 sq ft • ₹1.18 Cr)';

    const personalizedWhatsAppPitch = `Hello ${buyerName}! Thank you for your interest in our premium residential towers. Based on your preference for a ${configuration} ${purpose.toLowerCase()} home, we have reserved a preview slot for ${suggestedUnit}. Would you prefer a private site walkthrough today at 4:00 PM or tomorrow morning?`;

    return NextResponse.json({
      success: true,
      data: {
        buyerName,
        aiPropensityScore: score,
        intentLevel,
        suggestedMatchingUnit: suggestedUnit,
        objectionPredictor: 'Buyer may negotiate on floor rise charges for floors above 4th.',
        closingStrategy: 'Offer 1-time covered car parking waiver if token is received within 48 hours.',
        whatsappPitchScript: personalizedWhatsAppPitch,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'AI processing failed', error: err.message },
      { status: 500 }
    );
  }
}

