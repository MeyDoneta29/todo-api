import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      // On dit à Nest de chercher le token dans le "Header" de la requête
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MA_CLE_SUPER_SECRETE_123', // Doit être la même que dans le Module
    });
  }

  // Cette fonction s'exécute automatiquement si le token est valide
  async validate(payload: any) {
    const { sub: id } = payload;
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // Nest ajoute cet utilisateur à la requête (req.user)
  }
}