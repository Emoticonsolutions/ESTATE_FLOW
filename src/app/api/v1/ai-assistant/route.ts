import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/v1/ai-assistant — Live Google Gemini AI Sales Assistant, Lead Scoring & Pitch Generator
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      mode = 'pitch', // 'pitch' | 'query'
      query,
      buyerName = 'Prospective Buyer',
      budgetMax = 150,
      configuration = '3 BHK',
      purpose = 'End-use',
      possession = 'Within 6 Months',
      source = 'Meta Ads',
      notes = '',
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Mode 1: Natural Language Conversational BI Queries
    if (mode === 'query' && query) {
      if (apiKey) {
        try {
          const prompt = `You are EstateFlow AI, an executive real estate sales and Business Intelligence co-pilot for high-volume residential developers.
Current Organization Real Estate Context:
- Active Projects: Azure Heights Tower B (140 units total, 24 available, $14.2M contracted sales), Falcon City Phase 2 (28 units absorbed, ₹38.6 Cr).
- Leading Sales Rep: Rohan Sharma (22.4% conversion rate, 8 completed bookings).
- Average Booking Velocity: 18 days from first site walkthrough to earnest token deposit.
- Active Leads: 6 hot deals in progress, average ticket size ₹1.45 Cr.

Developer / Sales Manager Question: "${query}"

Provide a concise, direct, professional executive answer (2 to 3 sentences maximum) with clear data points and actionable recommendation.`;

          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            }
          );

          if (res.ok) {
            const data = await res.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (aiText) {
              return NextResponse.json({
                success: true,
                provider: 'Google Gemini AI (gemini-3-flash-preview)',
                data: {
                  answer: aiText.trim(),
                  metrics: [
                    { label: 'AI Intelligence', value: 'Google Gemini 3' },
                    { label: 'Confidence', value: '98.4%' },
                    { label: 'Response', value: 'Real-Time' },
                  ],
                },
              });
            }
          }
        } catch (e) {
          // Fall through to fallback
        }
      }

      // BI Query Fallback
      return NextResponse.json({
        success: true,
        provider: 'EstateFlow BI Rules Engine',
        data: {
          answer: `Tenant pipeline analysis: Active deals in queue demonstrate 18.2% conversion with average ticket size ₹1.45 Cr across towers.`,
          metrics: [
            { label: 'Active Pipeline', value: '6 Deals' },
            { label: 'Avg Ticket Size', value: '₹1.45 Cr' },
            { label: 'Conversion', value: '18.2%' },
          ],
        },
      });
    }

    // Mode 2: Lead Intent Scoring & AI WhatsApp Pitch Generation
    if (apiKey) {
      try {
        const prompt = `You are EstateFlow AI, an expert luxury real estate sales strategist.
Analyze this prospective apartment buyer:
- Customer Name: ${buyerName}
- Budget Range: Up to ₹${budgetMax} Lakhs
- Desired Layout: ${configuration}
- Purchase Purpose: ${purpose}
- Possession Timeline: ${possession}
- Lead Attribution: ${source}
- Additional Notes: ${notes || 'Customer is comparing with nearby competitor and asked about clubhouse amenities.'}

Respond with ONLY raw valid JSON (no markdown formatting, no backticks) with this structure:
{
  "aiPropensityScore": 89,
  "intentLevel": "High Intent (Hot)",
  "suggestedMatchingUnit": "Tower A - Unit 304 (3 BHK Premium • 1,650 sq ft • ₹1.56 Cr)",
  "objectionPredictor": "Customer may seek a waiver on floor rise charges or clubhouse amenities fees.",
  "closingStrategy": "Offer a limited 48-hour covered parking concession to lock down immediate token booking.",
  "whatsappPitchScript": "Hello ${buyerName}! Thank you for your interest in our luxury residences. Based on your requirement for a ${configuration} home, we have reserved a VIP preview slot for Unit 304. Would you prefer a private site walkthrough today at 4:00 PM or tomorrow morning?"
}`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanJson);
            return NextResponse.json({
              success: true,
              provider: 'Google Gemini AI (gemini-3-flash-preview)',
              data: {
                buyerName,
                ...parsed,
              },
            });
          }
        }
      } catch (geminiErr) {
        // Fall back to rule-based calculation
      }
    }

    // Deterministic Rule-Based Fallback
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
      provider: 'Deterministic Real Estate Engine (Fallback)',
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
