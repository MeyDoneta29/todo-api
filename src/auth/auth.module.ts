import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Importe le module JWT
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // Configuration du JWT
    JwtModule.register({
      secret: 'MA_CLE_SUPER_SECRETE_123', // En prod, on met ça dans un fichier .env
      signOptions: { expiresIn: '1h' },    // Le badge expire après 1 heure
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}