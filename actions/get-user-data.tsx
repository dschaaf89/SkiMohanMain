import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  
  // Fetch custom user data based on userId
  const userData = await fetchCustomUserData(userId);

  res.status(200).json(userData);
}

async function fetchCustomUserData(userId: string) {
  // Mock function to fetch custom user data
  return {
    email: 'custom@example.com',
    stripeCustomerId: 'cus_1234567890'
  };
}
