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
  console.log('Received POST request');
  try {
    const formData = await req.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const files = formData.getAll('files') as File[];

    if (!firstName || !lastName || files.length === 0) {
      throw new Error('Missing required fields or file not found in form data');
    }

    files.forEach(file => {
      console.log('File received:', file.name);
    });

    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: file.name,
          contentBytes: buffer.toString('base64')
        };
      })
    );

    console.log('Files processed for email attachments:', attachments);

    if (!AZURE_CLIENT_ID || !AZURE_TENANT_ID || !AZURE_CLIENT_SECRET || !SENDER_EMAIL || !RECEIVER_EMAIL) {
      throw new Error('Azure configuration is missing');
    }

    const credential = new ClientSecretCredential(AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET);
    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token.token;
        }
      }
    });

    const message = {
      subject: `${firstName} ${lastName} Volunteer Documents Submitted`,
      body: {
        contentType: 'Text',
        content: 'A new document has been submitted.'
      },
      toRecipients: [
        {
          emailAddress: {
            address: RECEIVER_EMAIL
          }
        }
      ],
      attachments: attachments
    };

    console.log('Sending email with Graph API');
    await client.api(`/users/${SENDER_EMAIL}/sendMail`).post({ message: message });
    console.log('Email sent successfully via Graph API');

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
