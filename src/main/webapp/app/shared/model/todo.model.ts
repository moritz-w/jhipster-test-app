import { Moment } from 'moment';
import { IPerson } from 'app/shared/model/person.model';
import { ITodoList } from 'app/shared/model/todo-list.model';

export interface ITodo {
  id?: number;
  name?: string;
  priority?: number;
  done?: boolean;
  expirydate?: Moment;
  person?: IPerson;
  todoList?: ITodoList;
}

export const defaultValue: Readonly<ITodo> = {
  done: false
};
