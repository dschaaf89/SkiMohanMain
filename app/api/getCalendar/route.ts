import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

// Retrieve environment variables
const clientId = process.env.AZURE_CLIENT_ID as string;
const clientSecret = process.env.AZURE_CLIENT_SECRET as string;
const tenantId = process.env.AZURE_TENANT_ID as string;
const userId = process.env.AZURE_USER_ID as string; // The ID of the user whose calendars to fetch

if (!clientId || !clientSecret || !tenantId || !userId) {
  throw new Error('Missing environment variables for Azure AD configuration');
}

export async function GET(req: NextRequest) {
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

    const calendars = await client
      .api(`/users/${userId}/calendars`)
      .select('id,name')
      .get();

    return NextResponse.json(calendars.value);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "COULD NOT FETCH CALENDARS" }, { status: 500 });
  }
}
