import { useState } from 'react';
import Footer from './components/layout/Footer/Footer';
import Header from './components/layout/Header/Header';
import styles from './App.module.css';
import TaskForm from './components/layout/TaskForm/TaskForm';
import TaskList from './components/layout/TaskList/TaskList';
import ITask from './interfaces/ITask';
import Modal from './components/layout/Modal/Modal';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: string) => {
    setTaskList(taskList.filter(task => task.id !== id));
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.getElementById('modal');

    if (display) 
      modal!.classList.remove('hide');
    else
      modal!.classList.add('hide');
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  }

  const updateTask = ({ id, title, dificulty }: ITask): void => {
    const updatedTask = {
      id, 
      title, 
      dificulty
    }

    const updatedItems = taskList.map(task => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItems);

    hideOrShowModal(false);
  };

  return (
    <div className="App">
      <Modal children={ 
        <TaskForm 
          btnText="Editar" 
          taskList={taskList}
          task={taskToUpdate}
          handleUpdate={updateTask}
        /> 
      }/>
      <Header />
        <main className={styles.main}>
          <div>
            <h2>O que você irá fazer?</h2>
            <TaskForm 
              btnText='Adicionar tarefa' 
              taskList={taskList}
              setTaskList={setTaskList}
            />
          </div>

          <div>
            <h2>Suas tarefas:</h2>
            <TaskList
              handleEdit={editTask}
              handleDelete={deleteTask}
              taskList={taskList}
            />
          </div>
        </main>
      <Footer />
    </div>
  )
}

export default App;
