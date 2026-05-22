import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://api.weather.gov/alerts/active';
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  
  try {
    console.log(`Attempting to fetch from NWS API: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'application/geo+json',
      },
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      const text = await response.text();
      console.log(`Response text: ${text}`);
      return NextResponse.json({ 
        success: false, 
        status: response.status,
        error: `HTTP error! Status: ${response.status}`,
        responseText: text 
      });
    }
    
    const data = await response.json();
    console.log(`Features count: ${data.features?.length || 0}`);
    
    return NextResponse.json({
      success: true,
      featuresCount: data.features?.length || 0,
      type: data.type,
      updated: data.updated,
    });
  } catch (error) {
    console.error('Error fetching from NWS API:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
