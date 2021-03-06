const postService = require('../services/post.service');
const { authenticateToken } = require('../utils/JWTToken');

const getAll = async (_req, res) => {
  const allPosts = await postService.getAll();
  res.status(200).json(allPosts);
};

const getBySearch = async (req, res) => {
  const searchedPost = await postService.getBySearch(req.query);
  res.status(200).json(searchedPost);
};

const getById = async (req, res) => {
  const postWithId = await postService.getById(req.params);
  res.status(200).json(postWithId);
};

const add = async (req, res) => {
  const { id } = await authenticateToken(req.headers.authorization);
  const { title, content, categoryIds } = req.body;
  const postAdded = await postService.add(title, content, id, categoryIds);
  res.status(201).json(postAdded);
};

const update = async (req, res) => {
  const { id: idUserLogged } = await authenticateToken(req.headers.authorization);
  const postActualized = await postService.update(req.body, idUserLogged, req.params);
  res.status(200).json(postActualized);
};

const deletePost = async (req, res) => {
  const { id: idUserLogged } = await authenticateToken(req.headers.authorization);
  await postService.deletePost(idUserLogged, req.params);
  res.status(204).end();
};

module.exports = { getAll, getById, getBySearch, add, update, deletePost };
