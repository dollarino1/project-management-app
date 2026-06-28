import { Prisma } from '@prisma/client';

export type OrganizationWithMembers = Prisma.OrganizationGetPayload<{
  include: { members: true };
}>;
