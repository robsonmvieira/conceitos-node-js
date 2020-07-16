const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// ok
app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

// ok
app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
  const repo = {id: uuid(), title, url, techs, likes: 0}
  repositories.push(repo)
  return response.status(201).json(repo)
});

// ok
app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const position = repositories.findIndex(r =>r.id === id)
  if(position < 0) {
    return response.status(400).json("Não encontrado")
  }
  const {title, url, techs} = request.body
  
  repositories[position] ={
    id, 
    title: title ? title: repositories[position].title,
    url: url ? url: repositories[position].url,
    techs: techs? techs: repositories[position].techs,
    likes: repositories[position].likes
}
  return response.json(repositories[position])
});


app.delete("/repositories/:id",  (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex < 0 ) {
    return response.status(400).json({message: 'not found'})
  }
  
  repositories.splice(repositoryIndex, 1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
 
  if(repositoryIndex < 0) {
    return response.status(400).json('não encontrado')
  }

  repositories[repositoryIndex].likes += 1

  return response.json(repositories[repositoryIndex])
});

module.exports = app;
