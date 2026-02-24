import { ForbiddenException } from '@nestjs/common';
import { Action } from './action.enum';
import type { AnyAbility } from '@casl/ability';
import { AbilitySubject } from './subjects-ability';


// Für service
export function checkRights(
  ability: AnyAbility, 
  action: Action, 
  subject: AbilitySubject
) {
  if (!ability.can(action as Action, subject)) {
    throw new ForbiddenException('FORBIDDEN');
  }
}

export enum UserRole {
  ADMIN = 'admin',
  HOTEL_OWNER = 'hotelbesitzer',
  KUNDE = 'kunde',
}

export interface AuthenticatedUser {
  id: number;
  role: string;
  email: string;
}
