import axios from 'axios'

const API = 'https://tony-auth-express.herokuapp.com/'

export const loginUser = async (email, password) => {
  const bodyData = {
    email,
    password,
  }

  return axios({
    method: 'POST',
    url: API + 'api/user/login',
    data: bodyData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const checkAuth = async (token) => {
  return axios({
    method: 'POST',
    url: API + 'api/auth',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
}

export const getListPhotos = async (token, page, limit) => {
  return axios({
    method: 'GET',
    url: API + `api/photo?page=${page}&limit=${limit}`,
    headers: {
      // 'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
}

export const addPhoto = async (token, image, title, description, category) => {
  const bodyData = {
    image,
    title,
    description,
    category,
  }

  return axios({
    method: 'POST',
    url: API + 'api/photo',
    data: bodyData,
    headers: {
      // 'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
}

export const getPhotoById = async (id, token) => {
  return axios({
    method: 'GET',
    url: API + 'api/photo/' + id,
    headers: {
      'x-auth-token': token,
    },
  })
}

export const addNewUser = async (
  avatar,
  firstName,
  lastName,
  email,
  role = 'operator',
  password
) => {
  const dataBody = {
    avatar: avatar,
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role,
    password: password,
  }

  return axios({
    method: 'POST',
    url: API + 'api/user/register',
    data: dataBody,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const updatePhoto = async (
  id,
  token,
  image,
  title,
  description,
  category
) => {
  const bodyData = {
    image,
    title,
    description,
    category,
  }

  return axios({
    method: 'PUT',
    url: API + 'api/photo/' + id,
    data: bodyData,
    headers: {
      'x-auth-token': token,
    },
  })
}
