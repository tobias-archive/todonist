import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TodoistApi } from '@doist/todoist-api-typescript'

const apiKey = process.env.REACT_APP_APIKEY;

const api = new TodoistApi(apiKey);

const addTask = async (task) => {
  return await api.addTask({ content: task })
}

const closeTask = async (taskId) => {
  return await api.closeTask(taskId)
}

const Form = (props) => {
  let [task, setTask] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { id, content } = await addTask(task)
      const isClosed = await closeTask(id)
      props.getItem(id, content)

      if (!isClosed) throw "Task did not close"
    }
    catch (e) {
      console.error(e)
    }
    setTask('')
  }
  const handleChange = (e) => {
    setTask(e.target.value)
  }
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
        <Stack spacing={2}>
          <Input
            placeholder="Add Completed Task"
            fullWidth
            value={task}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained">I done it!</Button>
        </Stack>
      </Box>
    </Box>
  );
}


const DoneList = (props) => {
  console.log(props)
  return (
    <>
      <h3>Completed task</h3>
      <ul>
      {props.listItem.map((item) => (
        <li key={item.id}>{item.newItem}</li>
      ))}
      </ul>
    </>
  )
}

function App() {
  let [item, setItem] = useState([]);

  const getItem = (id, newItem) => {
    setItem([...item, {newItem, id}])
  }
  return (
    <div>
      <Form getItem={getItem} />
      <DoneList listItem={item} />
    </div>
  );
}

export default App;
