import { NextResponse } from 'next/server';
import { getActiveAlerts, filterAllAlerts } from '@/lib/nws-api';

export async function GET() {
  try {
    console.log('API route: Fetching alerts from NWS...');
    const allAlerts = await getActiveAlerts();
    console.log(`API route: Raw alerts count: ${allAlerts?.length || 0}`);
    
    const allAlertsData = filterAllAlerts(allAlerts);
    console.log(`API route: Filtered alerts count: ${allAlertsData?.length || 0}`);

    const alertsWithMetadata = allAlertsData.map((alert) => ({
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
        'Cache-Control': 'no-store, max-age=0',
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
