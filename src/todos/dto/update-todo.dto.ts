import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsOptional } from 'class-validator';

// PartialType rend le 'title' optionnel automatiquement
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  
  @IsOptional() // On n'est pas obligé d'envoyer 'done'
  @IsBoolean()  // Mais si on l'envoie, ça doit être un vrai vrai/faux
  done?: boolean;
}