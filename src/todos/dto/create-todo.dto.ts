import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Le titre est obligatoire' })
  @MinLength(3, { message: 'Le titre doit faire au moins 3 caractères' })
  title: string;
}