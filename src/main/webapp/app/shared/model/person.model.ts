import { ITodo } from 'app/shared/model/todo.model';
import { ITeam } from 'app/shared/model/team.model';

export interface IPerson {
  id?: number;
  firstname?: string;
  lastname?: string;
  todo?: ITodo;
  team?: ITeam;
}

export const defaultValue: Readonly<IPerson> = {};
