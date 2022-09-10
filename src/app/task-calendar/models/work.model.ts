import {Task} from "./task.model";

export class Work {
  date: Date = new Date();
  tasks: Task[] = [
    new Task('Limpiar la cama', 'Limpiar y hacer la cama'),
    new Task('Fregar el suelo', 'Dejarlo como los chorros del oro')
  ];
}
