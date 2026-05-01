import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// On hérite du garde 'jwt' que l'on a configuré dans notre stratégie
export class JwtAuthGuard extends AuthGuard('jwt') {}