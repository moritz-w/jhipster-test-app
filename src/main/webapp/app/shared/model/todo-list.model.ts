import { Moment } from 'moment';
import { ITodo } from 'app/shared/model/todo.model';
import { ITeam } from 'app/shared/model/team.model';

export interface ITodoList {
  id?: number;
  name?: string;
  done?: boolean;
  expirydate?: Moment;
  todos?: ITodo[];
  teams?: ITeam[];
}

export const defaultValue: Readonly<ITodoList> = {
  done: false
};
