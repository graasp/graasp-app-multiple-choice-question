import type { Database } from '@graasp/apps-query-client';
import {
  AccountType,
  AppItemFactory,
  CompleteMember,
  DiscriminatedItem,
  ItemType,
  LocalContext,
  MemberFactory,
  PermissionLevel,
} from '@graasp/sdk';

import { API_HOST } from '@/config/env';

export const mockMembers: CompleteMember[] = [
  MemberFactory({
    id: 'mock-member-id-1',
    name: 'I (current member)',
    email: 'i@graasp.org',
    type: AccountType.Individual,
    createdAt: new Date('1996-09-08T19:00:00').toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  MemberFactory({
    id: 'mock-member-id-2',
    name: 'You',
    email: 'you@graasp.org',
    type: AccountType.Individual,
    createdAt: new Date('1995-02-02T15:00:00').toISOString(),
    updatedAt: new Date().toISOString(),
  }),
];

export const defaultMockContext: LocalContext = {
  apiHost: API_HOST,
  permission: PermissionLevel.Admin,
  context: 'builder',
  itemId: '1234-1234-123456-8123-123456',
  memberId: mockMembers[0].id,
};

export const mockItem: DiscriminatedItem = AppItemFactory({
  id: defaultMockContext.itemId,
  name: 'app-multiple-choice-answer',
  description: null,
  path: '',
  settings: {},
  type: ItemType.APP,
  lang: 'en',
  extra: { [ItemType.APP]: { url: 'http://localhost:3002' } },
  creator: mockMembers[0],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const buildDatabase = (members?: CompleteMember[]): Database => ({
  appData: [],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
  items: [mockItem],
  uploadedFiles: [],
});

export default buildDatabase;
