const todoContainer = document.getElementById('todo-container')
const fetchButton = document.getElementById('fetch-todos') 
let currentPage = 1
const todosPerPage = 10 // Number of todos to display per page

fetchButton.addEventListener('click', () => {
  fetchTodos(currentPage)
})

function fetchTodos(page) {
  fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then((response) => response.json())
    .then((data) => {
      const totalTodos = data.length // Total number of todos from API
      const totalPages = Math.ceil(totalTodos / todosPerPage) // Calculate total pages

      // Get the todos for the current page
      const startIndex = (page - 1) * todosPerPage 
      const endIndex = startIndex + todosPerPage 
      const todosToDisplay = data.slice(startIndex, endIndex) 

      displayTodos(todosToDisplay) 
      setupPagination(totalPages) 
    })
    .catch((error) => console.error('Error fetching todos:', error))
}

function displayTodos(todos) {
  todoContainer.innerHTML = '' // Clear existing todos
  todos.forEach((todo) => {
    const todoItem = document.createElement('div')
    todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            ${todo.title}
        `
    todoContainer.appendChild(todoItem)
  })
}

function setupPagination(totalPages) {
  const paginationContainer = document.getElementById('pagination')
  paginationContainer.innerHTML = '' // Clear existing pagination

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button')
    pageButton.textContent = i
    pageButton.addEventListener('click', () => {
      currentPage = i
      fetchTodos(currentPage)
    })
    paginationContainer.appendChild(pageButton)
  }
}
