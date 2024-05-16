import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

// Retrieve environment variables
const clientId = process.env.AZURE_CLIENT_ID as string;
const clientSecret = process.env.AZURE_CLIENT_SECRET as string;
const tenantId = process.env.AZURE_TENANT_ID as string;
const userId = process.env.AZURE_USER_ID as string; // The ID of the user whose calendar to fetch

if (!clientId || !clientSecret || !tenantId || !userId) {
  throw new Error('Missing environment variables for Azure AD configuration');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const calendarId = searchParams.get('calendarId');

  if (!calendarId) {
    return NextResponse.json({ message: 'Missing calendarId parameter' }, { status: 400 });
  }

  try {
    // Authenticate with Azure AD using client credentials
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    
    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const tokenResponse = await credential.getToken("https://graph.microsoft.com/.default");
          return tokenResponse.token;
        },
      },
    });

    const events = await client
    .api(`/users/${userId}/calendars/${calendarId}/events`)
    .select('subject,start,end,body') // Include the body field
    .orderby('start/dateTime DESC')
    .get();

    return NextResponse.json(events.value);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "COULD NOT FETCH EVENTS" }, { status: 500 });
  }
}
