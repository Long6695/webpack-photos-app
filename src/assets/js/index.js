import '../scss/index.scss'
import { checkAuth, getListPhotos } from './api'

const token = sessionStorage.getItem('token')
const firstName = document.getElementById('firstname')
const avatar = document.getElementById('avatar')
const logoutBtn = document.getElementById('log-out')
const addBtn = document.getElementById('add-btn')
addBtn.addEventListener('click', () => {
  window.location.href = '/addphoto.html'
})

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('token')
  window.location.href = '/login.html'
})

const doubleCheck = async (page = 1) => {
  const url = window.location.search
  const params = new URLSearchParams(url)
  const pageParam = params.get('page') || page

  try {
    const res = await checkAuth(token)
    firstName.innerHTML = res.data.user.user.firstName
    avatar.src = res.data.user.user.avatar

    const resPhoto = await getListPhotos(token, pageParam, 10)
    const photos = resPhoto.data.data

    const photoGroup = document.getElementById('photos__wrapper')

    let pageNum
    if (pageNum % 2 !== 0) {
      pageNum = Math.ceil(resPhoto.data.total / resPhoto.data.limit)
    } else {
      pageNum = Math.floor(resPhoto.data.total / resPhoto.data.limit)
    }

    const htmls = photos.map((photo) => {
      return `
      <div class="photos__group" id="${photo._id}">
      <div class="photos__group__main">
      <div class="photos__group__main__img">
      <img id="avatar" class="photos__group__main--img" src="${
        photo.image
      }" alt="" />
      </div>
      </div>
      <div class="photos__group__footer">
      <div class="photos__group__main__des">
      ${photo.description}
      </div>
      <div class="photos__group__footer--btn">
      <div>
      <button class="btn photo__btn" onclick="sessionStorage.setItem('id','${
        photo._id
      }')
      window.location.href = '/detailphoto.html'
      ">
      
      View
      
      </button>
      <button id="edit-btn" class="btn photo__btn" onclick="sessionStorage.setItem('id','${
        photo._id
      }')
      window.location.href = '/editphoto.html'
      ">Edit</button>
      </div>
      <div class="photos__group__footer--time"><span>${new Date(
        photo.date
      ).getMinutes()} mins ago</span></div>
      </div>
      </div>
      </div>
      `
    })

    photoGroup.innerHTML = htmls.join('')

    paginition(pageNum)

    const nextBtn = document.querySelector('.page__next--btn')
    const previousBtn = document.querySelector('.page__previous--btn')

    let pageIndex = parseInt(pageParam)
    const plusOne = pageNum + 1
    const pageArray = Array.from(Array(plusOne).keys())

    if (pageIndex === pageArray[1]) {
      previousBtn.classList.add('disabled')
    }

    if (pageIndex === pageArray[pageArray.length - 1]) {
      nextBtn.classList.add('disabled')
    }

    nextBtn.addEventListener('click', () => {
      pageIndex++
      window.location.replace(`/index.html?page=${pageIndex}`)
      doubleCheck(pageIndex)
    })

    previousBtn.addEventListener('click', () => {
      pageIndex--
      window.location.replace(`/index.html?page=${pageIndex}`)
      doubleCheck(pageIndex)
    })

    const currentLi = document.querySelector(
      `.page__item:nth-child(${pageParam})`
    )
    currentLi.classList.add('active')
  } catch (error) {
    window.location.href = '/login.html'
  }
}
doubleCheck()

function paginition(num) {
  let numArray = Array.from(Array(num).keys())

  const ul = document.querySelector('.page__nav')
  const liArray = numArray.map((item, index) => {
    return `
      <li id="${index + 1}"class="page__item"><a class="page__link" href="#">${
      item + 1
    }</a></li>
      `
  })

  ul.innerHTML = liArray.join('')

  const getLi = document.querySelectorAll('.page__item')

  getLi.forEach((item, index) => {
    item.addEventListener('click', () => {
      window.location.replace(`/index.html?page=${index + 1}`)
      const currentIndex = index + 1

      doubleCheck(currentIndex)
    })
  })
}
