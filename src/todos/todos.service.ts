import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  // Création d'une tâche
  async create(title: string, user: User): Promise<Todo> {
    const newTodo = this.todoRepository.create({ title, user });
    return await this.todoRepository.save(newTodo);
  }

  // Récupération des tâches d'un utilisateur
  async findAll(user: User): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: { user: { id: user.id } },
    });
  }

  //  Modification du statut 
  async updateStatus(id: number, done: boolean): Promise<Todo | null> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (todo) {
      todo.done = done;
      return await this.todoRepository.save(todo);
    }
    return null;
  }

  // Supprimer une tâche
  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}