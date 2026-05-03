import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/auth.guard'; // Importation du garde pour 
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard) // Sécuriser toutes les routes : il faut un token pour pouvoir faire une action
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  //  Création  d'une tâche
  /*
  @Post('create')
  create(@Body('title') title: string, @Request() req) {
    return this.todosService.create(title, req.user);
  }
*/

@Post('create')
create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
  return this.todosService.create(createTodoDto.title, req.user);
}

  // Récupération toutes les tâches de l'utilisateur connecté
  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req.user);
  }

  //Modifier le statut d'une tâche
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body('done') done: boolean) {
    return this.todosService.updateStatus(+id, done);
  }
*/

@Patch(':id')
update(
  @Param('id') id: string, 
  @Body() updateTodoDto: UpdateTodoDto // Utilise le DTO d'update ici
) {
  return this.todosService.updateStatus(+id, updateTodoDto.done ?? false);
}



  // supp 
  @Delete(':id')
async remove(@Param('id') id: string) {
  await this.todosService.remove(+id);
  
  return {
    message: `La tâche avec l'ID ${id} a été supprimée avec succès`,
    
  };
}
}