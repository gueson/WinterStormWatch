import { NextResponse } from 'next/server';
import { getActiveAlerts, filterWinterAlerts } from '@/lib/nws-api';

export async function GET() {
  try {
    const allAlerts = await getActiveAlerts();
    const winterAlerts = filterWinterAlerts(allAlerts);

    const alertsWithMetadata = winterAlerts.map((alert) => ({
      id: alert.id,
      event: alert.properties.event,
      areaDesc: alert.properties.areaDesc,
      severity: alert.properties.severity,
      urgency: alert.properties.urgency,
      certainty: alert.properties.certainty,
      effective: alert.properties.effective,
      expires: alert.properties.expires,
      description: alert.properties.description,
      instruction: alert.properties.instruction,
      url: alert.properties.url,
      headline: alert.properties.headline,
      senderName: alert.properties.senderName,
      state: extractState(alert.properties.areaDesc),
    }));

    return NextResponse.json(alertsWithMetadata, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error in weather-alerts API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather alerts' },
      { status: 500 }
    );
  }
}

function extractState(areaDesc: string): string {
  const stateMatch = areaDesc.match(/([A-Z]{2})\s*$/);
  return stateMatch ? stateMatch[1] : 'US';
}
