import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TodoistApi } from '@doist/todoist-api-typescript'


// Please supply API key
const apiKey = "API key goes here";

const api = new TodoistApi(apiKey);


const addTask = async (task) => {
  const { id } = await api.addTask({ content: task })
  return id
}

const closeTask = async (taskId) => {
  return await api.closeTask(taskId) 
}

const Form = (props) => {
  let [task, setTask] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = await addTask(task)
    const isClosed = await closeTask(id)
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
            placeholder="task"
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


function App() {
  return (
    <div>
      <Form />
    </div>
  );
}

export default App;
