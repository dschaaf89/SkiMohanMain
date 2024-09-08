import { NextRequest, NextResponse } from 'next/server';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';

const {
  AZURE_CLIENT_ID,
  AZURE_TENANT_ID,
  AZURE_CLIENT_SECRET,
  SENDER_EMAIL,
  RECEIVER_EMAIL
} = process.env;

export async function POST(req: NextRequest) {
    console.log('sendInstructorDocs route reached'); 
  try {
    // Parse form data (this includes the files and other details sent from the client)
    const formData = await req.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const files = formData.getAll('files') as File[];

    if (!firstName || !lastName || files.length === 0) {
      throw new Error('Missing required fields or no files found in form data');
    }

    // Prepare attachments for Microsoft Graph API
    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: file.name,
          contentBytes: buffer.toString('base64'),
        };
      })
    );

    // Ensure Azure configuration is provided
    if (!AZURE_CLIENT_ID || !AZURE_TENANT_ID || !AZURE_CLIENT_SECRET || !SENDER_EMAIL || !RECEIVER_EMAIL) {
      throw new Error('Azure configuration is missing');
    }

    // Authenticate with Azure AD using the ClientSecretCredential
    const credential = new ClientSecretCredential(AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET);
    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token.token;
        }
      }
    });

    // Define the email message
    const message = {
      subject: `${firstName} ${lastName} Instructor Documents Submitted`,
      body: {
        contentType: 'Text',
        content: `Instructor documents from ${firstName} ${lastName} have been submitted.`,
      },
      toRecipients: [
        {
          emailAddress: {
            address: RECEIVER_EMAIL,
          },
        },
      ],
      attachments: attachments, // Attach the documents
    };

    // Send the email using Microsoft Graph API
    await client.api(`/users/${SENDER_EMAIL}/sendMail`).post({ message });

    // Return a success response
    return NextResponse.json({ message: 'Email with instructor documents sent successfully.' });
  } catch (error) {
    console.error('Error sending instructor documents:', error);
    return NextResponse.json({ error: 'Failed to send instructor documents.' }, { status: 500 });
  }
}
