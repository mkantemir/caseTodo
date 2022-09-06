import "./App.css";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import TextFieldsIcon from "@mui/icons-material/TextFields";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [alertAdd, setAlertAdd] = useState(false);
  const [name, setName] = useState("");
  const endPoint = "https://6311fb42f5cba498da89bb03.mockapi.io/todos";

  //Api'den datayı almak için kullanılmaktadır.
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

  //yeni todo eklemek için yazılan fonksiyondur. yeni todo en az 3 karakter olmak zorundadır.
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

  //ilgili todo'yu silmek için yazılan fonksiyondur.
  const handleDelete = async (todo) => {
    await axios.delete(endPoint + "/" + todo.id);
    setTodos(todos.filter((item) => item.id !== todo.id));
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
        <Todo key={item.id} todo={item} todos={todos} setTodos={setTodos} handleDelete={handleDelete} />
      ))}

      <Footer />
    </Box>
  );
}

export default App;
