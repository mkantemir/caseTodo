import "./App.css";
import Box from "@mui/material/Box";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [alertAdd, setAlertAdd] = useState(false);
  const [name, setName] = useState("");
  const endPoint = "https://6311fb42f5cba498da89bb03.mockapi.io/todos";

  useEffect(() => {
    const getTodos = async () => {
      await axios
        .get(endPoint)
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.length < 3) {
      setAlertAdd(true);
    } else {
      const post = { content: newTodo, isCompleted: false, id: Date.now() };
      await axios.post(endPoint, post);
      setTodos([...todos, post]);
      setAlertAdd(false);
      setNewTodo("");
    }
  };

  const deleteCompleted = async () => {
    const completedTodoIds = [];
    todos.map((item) => {
      if (item.isCompleted) {
        completedTodoIds.push(item.id);
      }
    });
    await completedTodoIds.map((id) => {
      axios.delete(endPoint + "/" + id);
      setTodos(todos.filter((item) => item.id !== id));
    });
    // await todos.map((el) => axios.delete(endPoint + "/" + el.id));
    // todos.filter((item) => console.log(!item.isCompleted));
    // setTodos(todos.filter((item) => !item.isCompleted));
  };

  const markAllCompleted = () => {
    setTodos(todos.map((item) => ({ ...item, isCompleted: true })));
  };
  return (
    <Box
      sx={{
        margin: "30px auto",
        width: 700,
        height: "auto",
        padding: "20px",
        backgroundColor: "#E8EEF7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Header name={name} setName={setName} />
      <Box>
        {name ? (
          <Typography
            sx={{ fontSize: "12px", color: "#1769aa", marginLeft: "10px" }}
          >
            Wellcome <strong>{name}!</strong> You have{" "}
            <strong>{todos.length}</strong> todos.
          </Typography>
        ) : (
          ""
        )}
        <Box
          sx={{
            width: 700,
            display: "flex",
            alignItems: "self-end",
            margin: "30px 0 10px 0",
          }}
        >
          <TextField
            label="Add Items"
            variant="standard"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TextFieldsIcon sx={{ color: "#1769aa" }} />
                </InputAdornment>
              ),
            }}
            sx={{ marginLeft: "20px" }}
          />
          <Button
            variant="contained"
            sx={{
              margin: " 0 20px",
              width: "140px",
              height: "40px",
              textTransform: "none",
            }}
            onClick={addTodo}
          >
            Add ToDo
          </Button>
        </Box>
      </Box>

      <Box sx={{ marginBottom: "20px" }}>
        {alertAdd ? (
          <Typography variant="body2" color="error">
            <em>*En az üç karakter girilmelidir!</em>
          </Typography>
        ) : (
          ""
        )}
      </Box>

      {todos.map((item) => (
        <Todo key={item.id} todo={item} todos={todos} setTodos={setTodos} />
      ))}

      <Box
        sx={{
          width: 700,
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginRight: "10px", textTransform: "none" }}
          onClick={markAllCompleted}
        >
          Mark All Items Completed
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: "10px", textTransform: "none" }}
          onClick={deleteCompleted}
        >
          Delete Completed Items
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
