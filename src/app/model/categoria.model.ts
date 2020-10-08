import {Tarefa} from './tarefa.model';

export interface Categoria {
    id: number;
    titulo: string;
    tarefas: Tarefa[];
}
