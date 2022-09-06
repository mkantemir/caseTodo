import { Button, TextField, Typography, Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState } from "react";
import axios from "axios";

const Todo = ({ todo, todos, setTodos, handleDelete }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [alertTodo, setAlertTodo] = useState(false);
  const [editedValue, setEditedValue] = useState(todo.content);
  const endPoint = "https://6311fb42f5cba498da89bb03.mockapi.io/todos";

  //tamamlanan todoları güncellemek için yazılan fonsiyondur.
  const handleCompleted = async (todo) => {
    todo.isCompleted = !todo.isCompleted;
    const response = await axios.put(endPoint + "/" + todo.id, todo);
    setTodos(
      todos.map((item) => (item.id === todo.id ? { ...response.data } : item))
    );
  };


  //ilgili todo'yu güncellemek yazılan fonksiyondur. güncel todo en az 3 karakter olmak zorundadır.
  const handleUpdate = async (todo) => {
    if (editedValue.length < 3) {
      setAlertTodo(true);
    } else {
      todo.content = editedValue;
      const response = await axios.put(endPoint + "/" + todo.id, todo);
      setTodos(
        todos.map((item) => (item.id === todo.id ? { ...response.data } : item))
      );
      setToggleEdit(!toggleEdit);
      setAlertTodo(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: 500,
          display: "flex",
          justifyContent: "space-between",
          padding: "8px",
          border: "1px solid #1769aa",
          borderRadius: "10px",
          mt: "15px",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="text"
            startIcon={
              todo.isCompleted ? (
                <CheckCircleIcon sx={{ color: "green" }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ color: "#1769aa" }} />
              )
            }
            onClick={() => handleCompleted(todo)}
          ></Button>
          <Typography
            variant="body1"
            color={todo.isCompleted ? "green" : "#1769aa"}
          >
            {todo.content}
          </Typography>
        </Box>

        <Box>
          <Button
            variant="text"
            startIcon={
              <EditIcon
                sx={
                  todo.isCompleted ? { color: "green" } : { color: "#1769aa" }
                }
              />
            }
            onClick={() => setToggleEdit(!toggleEdit)}
          ></Button>
          <Button
            variant="text"
            startIcon={
              <DeleteForeverIcon
                sx={
                  todo.isCompleted ? { color: "green" } : { color: "#1769aa" }
                }
              />
            }
            onClick={() => handleDelete(todo)}
          ></Button>
        </Box>
      </Box>

      {toggleEdit ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "5px",
            }}
          >
            <TextField
              sx={{ marginLeft: "50px", width: "400px" }}
              label="Edit Todo"
              size="small"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              variant="outlined"
            ></TextField>
            <Button
              variant="text"
              startIcon={<DoneIcon sx={{ color: "green" }} />}
              onClick={() => handleUpdate(todo)}
            ></Button>
          </Box>
          <Box>
            {alertTodo ? (
              <Typography variant="body2" color="error">
                <em>*En az üç karakter girilmelidir!</em>
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Todo;
