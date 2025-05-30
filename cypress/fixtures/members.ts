import { AccountType, CompleteAccount } from '@graasp/sdk';

export const MEMBERS: { [key: string]: CompleteAccount & { email: string } } = {
  ANNA: {
    id: '0f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'anna',
    type: AccountType.Individual,
    email: 'anna@graasp.org',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  BOB: {
    id: '1f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'bob',
    type: AccountType.Individual,
    email: 'bob@graasp.org',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const CURRENT_MEMBER = MEMBERS.ANNA;
