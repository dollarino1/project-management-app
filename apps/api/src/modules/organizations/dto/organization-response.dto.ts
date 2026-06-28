import { OrganizationWithMembers } from '../../../common/types/prisma.types';
import { Organization } from '@repo/types';

export class OrganizationResponseDto {
  static fromEntity(org: OrganizationWithMembers): Organization {
    return {
      id: org.id,
      name: org.name,
      slug: org.slug,
      createdAt: org.createdAt.toISOString(),
      updatedAt: org.updatedAt.toISOString(),
    };
  }
}
