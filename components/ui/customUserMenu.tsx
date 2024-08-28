import { useUser, useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const CustomUserMenu = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      axios.get('/api/get-user-data')
        .then(response => setUserData(response.data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="user-button">
        {user.fullName}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="dropdown-menu-content">
        <DropdownMenu.Item onSelect={() => window.location.href = '/account'}>
          Manage account
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => signOut()}>
          Sign out
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onSelect={() => window.location.href = '/custom-tab-1'}>
          Custom Tab 1
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => window.location.href = '/custom-tab-2'}>
          Custom Tab 2
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          {/* Display user data fetched from API */}
          <div>
            <p><strong>Email:</strong> {userData?.email}</p>
            <p><strong>Stripe Customer ID:</strong> {userData?.stripeCustomerId}</p>
            {/* Add more custom user data here */}
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default CustomUserMenu;
