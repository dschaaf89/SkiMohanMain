

// import { NextResponse, NextRequest } from 'next/server'
// const nodemailer = require('nodemailer');

// export async function POST(request: NextRequest) {
//   const username = process.env.EMAIL_USER;
//   const password = process.env.EMAIL_PASS;
//   const myEmail = "daniel.schaaf@outlook.com";

//   const formData = await request.formData()

//   const name = formData.get('name')
//   const email = formData.get('email')
//   const phone = formData.get('phone')
  
//   const transporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com",
//     port: 587,
//     tls: {
//         ciphers: "SSLv3",
//         rejectUnauthorized: false,
//     },
  
//     auth: {
  
//         user: username,
//         pass: password
//     }
//   })
//   try {

//     const mail = await transporter.sendMail({
//         from: username,
//         to: myEmail,
//         replyTo: email,
//         subject: `Website activity from ${email}`,
//         html: `
//         <p>Name: ${name} </p>
//         <p>Email: ${email} </p>
//         <p>Phone: ${phone} </p>
//         `,
//     })

//     return NextResponse.json({ message: "Success: email was sent" })

// } catch (error) {
//     console.log(error)
//     return new NextResponse(JSON.stringify({ message: "COULD NOT SEND MESSAGE" }), { status: 500 });

// }
// }


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
    const formData = await request.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');

    if (!name || !email || !phone) {
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
        subject: `Newsletter Signup${email}`,
        body: {
          contentType: "HTML",
          content: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
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