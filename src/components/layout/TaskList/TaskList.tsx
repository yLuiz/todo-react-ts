import React from 'react';
import ITask from '../../../interfaces/ITask';
import styles from './TaskList.module.css';

interface Props {
  taskList: ITask[]
  handleDelete(id: string): void;
  handleEdit({id, title, dificulty}: ITask): void;
}

export default function TaskList({ taskList, handleDelete, handleEdit }: Props) {
  return (
    <>
      {
        taskList.length ? (
          taskList.map(task => (
            <div className={styles.task} key={task.id}>
              <div className={styles.details} >
                <h4>{ task.title }</h4>
                <p>Dificuldade: { task.dificulty }</p>
              </div>

              <div className={styles.actions}>
                <i className='bi bi-pencil' onClick={() => { handleEdit(task) }}></i>
                <i className='bi bi-trash' onClick={() => { handleDelete(task.id) }}></i>
              </div>

            </div>
          ))
        ) : (
          <p>Não há tarefas cadastradas!</p>
        )
      }
    </>
  )
}