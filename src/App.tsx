import { useState } from 'react'
import './App.css'

interface ITask {
  name: string;
  done: boolean;
} 

function App(): JSX.Element {

  const [ newTask, setNewTasks ] = useState<string>('');
  const [ task, setTask ] = useState<ITask[]>([]);
  //const [ isComplete, setIsComplete ] = useState<boolean>(false);


  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(newTask !== '') addTasks(newTask)
    console.log(task);
  }

  const doneTask = (i: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const newTask = [...task]
    newTask[i].done = !newTask[i].done
    setTask(newTask)
    const classList = e.target.classList
    classList.contains('after-btn-negative')
      ? classList.replace('after-btn-negative', 'after-btn-affirmative')
      : classList.replace('after-btn-affirmative','after-btn-negative')
    
    classList.contains('button-tasks-negative')
      ? classList.replace('button-tasks-negative', 'button-tasks-positive')
      : classList.replace('button-tasks-positive', 'button-tasks-negative')  
  }

  const addTasks = (name: string): void => {
    const newTask: ITask[] = [...task, { name, done: false }];
    setTask(newTask)
  }

  const deleteTask = (i: number): void => {
    const newTask = [...task];
    newTask.splice(i,1);
    setTask(newTask)
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit}
        className='mx-auto mt-14 mb-5 p-3 shadow-black shadow-md w-[45%] h-[120px] bg-white'>
        <h1>
          <strong className='text-2xl'>CRUD</strong>
        </h1>
        <input
          type="text"
          onChange={(e) => setNewTasks(e.target.value)}
          value={newTask}
          className='m-3 p-2 border-sky-200 border-2 rounded'
          />
        <button
          className='border-sky-200 border-2 rounded w-13 p-2 bg-sky-400 hover:scale-90 hover:bg-purple-400 hover:text-white hover:' >
          Save
        </button>
      </form>
      {
        task.map((e:ITask, i:number) => (
          <div
            key={i}
            className='bg-white shadow-black shadow-md w-[35%] h-[120px] mx-auto my-4 p-4 overflow-auto rounded-md'
            >
            <h1 className='text-xl' >{e.name}</h1>
            <div className='m-2'>
              <button
                className='button-tasks-negative after-btn-negative w-36 py-1'
                onClick={(event):void => doneTask(i, event)}
              >{e.done  ? 'Completado' : 'Completado?'}</button>
              <button
                onClick={(): void => deleteTask(i)}
                className='button-tasks-negative after-btn-negative w-16 py-1'
              >Delete</button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default App
