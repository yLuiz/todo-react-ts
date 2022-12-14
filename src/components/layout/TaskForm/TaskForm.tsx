import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './TaskForm.module.css';
import { v4 as uuid } from 'uuid';

import ITask from '../../../interfaces/ITask';

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(task: ITask): void
}

export default function TaskForm({ btnText, taskList, setTaskList, task, handleUpdate }: Props) {

  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [dificulty, setDificulty] = useState<number>(0);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDificulty(task.dificulty);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleUpdate) {
      handleUpdate({ id, title, dificulty });
    } else {
      const id = uuid();
      const newTask: ITask = {
        id,
        title,
        dificulty
      }

      setTaskList!([...taskList, newTask]);

      setTitle("");
      setDificulty(0);

      document.getElementsByName('title')[0].focus();
      }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target;
    if(target.name === "title") {
      setTitle(target.value);
    } else {
      setDificulty(parseInt(target.value));
    }

    if(target.name === 'dificulty') {
      if(target.value.toLocaleLowerCase() === 'e') {
        target.value = "";
      }
    };
  }


  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input onChange={handleChange} value={title || ''} type="text" required name='title' id='title' placeholder='Título da tarefa...'/>
      </div>

      <div className={styles.input_container}>
        <label htmlFor="dificulty">Dificuldade:</label>
        <input onChange={handleChange} value={dificulty || ''} type="number" required pattern='[0-9]{1}' name='dificulty' id='dificulty' placeholder='Dificuldade da tarefa...'/>
      </div>

      <input type="submit" value={btnText}/>
    </form>
  )
}