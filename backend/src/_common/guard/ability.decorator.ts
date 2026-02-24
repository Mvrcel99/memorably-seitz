// AI Doku
import { SetMetadata } from '@nestjs/common';
import { Action } from '../casl/action.enum';
import { AbilitySubject } from '../casl/subjects-ability';


export interface RequiredRule {
  action: Action;
  subject: AbilitySubject;
}

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);