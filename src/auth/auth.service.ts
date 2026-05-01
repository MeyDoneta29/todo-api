import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt'; // Pour générer le token
import { Repository } from 'typeorm';
import { User } from './user.entity'; 
import { RegisterDto } from '../dto/register.dto'; 
import { LoginDto } from '../dto/login.dto'; // <-- NE PAS OUBLIER CET IMPORT
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // <-- IL FAUT L'AJOUTER ICI POUR L'UTILISER
  ) {}

  async register(dto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const newUser = this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async login(dto: LoginDto) {
    // 1. Chercher l'utilisateur par email
    const user = await this.userRepository.findOne({ where: { email: dto.email } });

    // 2. Si l'utilisateur n'existe pas, erreur
    if (!user) throw new UnauthorizedException('Identifiants incorrects');

    // 3. Comparer le mot de passe saisi avec celui haché en BDD
    const isMatch = await bcrypt.compare(dto.password, user.password);

    // 4. Si ce n'est pas le bon mot de passe, erreur
    if (!isMatch) throw new UnauthorizedException('Identifiants incorrects');

    // 5. Génération du JWT (Le badge d'accès)
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}