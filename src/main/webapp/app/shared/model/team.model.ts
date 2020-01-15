import { IPerson } from 'app/shared/model/person.model';
import { ITodoList } from 'app/shared/model/todo-list.model';

export interface ITeam {
  id?: number;
  name?: string;
  people?: IPerson[];
  todoLists?: ITodoList[];
}

export const defaultValue: Readonly<ITeam> = {};
