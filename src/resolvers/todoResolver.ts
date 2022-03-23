import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Todo, TodoInput } from '../schemas/Todo';

@Resolver(() => Todo)
export class TodoResolver {
  private todos: Todo[] = [];

  @Query(() => [Todo], { nullable: true })
  async getByTitle(@Arg('title') title: string): Promise<Todo[]> {
    return await this.todos.filter((todo) => todo.title == title);
  }

  @Query(() => [Todo], { nullable: true })
  async getTodos(): Promise<Todo[]> {
    return await this.todos;
  }

  @Mutation(() => Todo)
  async addTodo(
    @Arg('todoInput') { title, description }: TodoInput
  ): Promise<Todo> {
    const todo = {
      id: Math.random(), // not really unique
      title,
      description,
      status: false,
    };

    await this.todos.push(todo);
    return todo;
  }
}
