// AI Doku
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from './ability.decorator';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];
    
    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    // Überprüfe alle Regeln - kompakter onhe try catch wie in der AI Doku, da die fehlermeldung von Nestjs automatisch generiert wird tr
    return rules.every((rule) => ability.can(rule.action, rule.subject));
  
  }
}