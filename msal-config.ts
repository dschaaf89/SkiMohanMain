import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_AZURE_OFFICE_ID!, // Assert that it is not undefined
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID!}`,
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!
    }
};
