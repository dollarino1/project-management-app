import { apiClient } from '@/lib/api/client';
import type { Organization } from '@repo/types';

export async function getMyOrganizations(
  token: string,
): Promise<Organization[]> {
  return await apiClient(
    '/organizations/me',
    {
      method: 'GET',
    },
    token,
  );
}

export async function createOrganization(
  name: string,
  slug: string,
  token: string,
): Promise<Organization> {
  return await apiClient(
    '/organizations',
    {
      method: 'POST',
      body: JSON.stringify({ name, slug }),
    },
    token,
  );
}
