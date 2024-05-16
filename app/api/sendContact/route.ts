import { NextResponse, NextRequest } from 'next/server';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

// Retrieve environment variables
const clientId = process.env.AZURE_CLIENT_ID as string;
const clientSecret = process.env.AZURE_CLIENT_SECRET as string;
const tenantId = process.env.AZURE_TENANT_ID as string;
const senderEmail = process.env.SENDER_EMAIL as string;
const receiverEmail = process.env.RECEIVER_EMAIL as string;

if (!clientId || !clientSecret || !tenantId || !senderEmail || !receiverEmail) {
  throw new Error('Missing environment variables for Azure AD configuration or email addresses');
}

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, details } = await request.json();

    if (!fullName || !email || !details) {
      return new NextResponse(JSON.stringify({ message: 'Missing form data' }), { status: 400 });
    }

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

    const mail = {
      message: {
        subject: `Contact Form Submission from ${email}`,
        body: {
          contentType: "HTML",
          content: `
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Details:</strong> ${details}</p>
          `,
        },
        from: {
          emailAddress: {
            address: senderEmail,
          },
        },
        toRecipients: [
          {
            emailAddress: {
              address: receiverEmail,
            },
          },
        ],
      },
      saveToSentItems: "true",
    };

    await client.api(`/users/${senderEmail}/sendMail`).post(mail);
    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "COULD NOT SEND MESSAGE" }), { status: 500 });
  }
}
