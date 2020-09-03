// Classes
class Budget {
  constructor(budget) {
      this.budget = Number(budget);
      this.budgetLeft = this.budget;
  }

  // Substrack fro the budget
  // Вычтем из бюджета
  substrackFromBudget(amount) {
      return this.budgetLeft -= amount;
  }
}

// Everything related to HTML
// Все, что связано с HTML
class HTML {

  // Inserts the budget when the user submits it
  // Вставляет бюджет, когда пользователь его отправляет
  insertBudget(amount) {
        // Inserts into HTML
        // Вставляет в HTML
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
  }


  // Displays a message (correct or invalid)
  // Отображает сообщение (правильное или недействительное)
  printMessage(message, className) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('text-center', 'alert', className);
    messageWrapper.appendChild(document.createTextNode(message));

    // Insert into HTML
    // Вставить в HTML
    document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

    // Clear the error
    // Сбрасываем ошибку
    setTimeout(function() {
        document.querySelector('.primary .alert').remove(); 
        addExpenseForm.reset();
    }, 3000);
  }
  // Displays the expenses from the form into the List
  // Выводим расходы из формы в Список
  addExpenseToList(name, amount) {
      const expensesList = document.querySelector('#expenses ul');

      // Create a li
      // Создаем ли
      const li = document.createElement('li');
      li.className = "list-group-item d-flex justify-content-between align-item-center"
      // Create the template
      // Создаем шаблон
      li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">$ ${amount}</span>
      `;


      // Insert into the HTML
      expensesList.appendChild(li )
  }

  // Subtract expense amount from budget
  // Вычитаем сумму расходов из бюджета
  trackBudget(amount) {
       const  budgetLeftDollars = budget.substrackFromBudget(amount);
       budgetLeft.innerHTML = `${budgetLeftDollars}`;

       // Check when 50% is spent
      // Проверяем, когда потрачено 50%

       if((budget.budget / 4) > budgetLeftDollars) {
         budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
         budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        
       } else if ((budget.budget / 2) > budgetLeftDollars) {
        budgetLeft.parentElement.parentElement.classList.remove('alert-success');
        budgetLeft.parentElement.parentElement.classList.add('alert-warning'); 
       }
  }
}



// Variables
const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');

let budget, userBudget;

// Instanciate the HTML Class
// Создание экземпляра класса HTML
html = new HTML()

// Event Listeners
eventListeners();
function eventListeners() {

  // App Init
  // Инициализация приложения
  document.addEventListener('DOMContentLoaded', function(){
      // Ask the visitor the weekly budget 
      // Спрашиваем у посетителя недельный бюджет
      userBudget = prompt('What\'s your budget for this week? ')

      // Validate the userBudget
      // Проверяем userBudget
      if(userBudget === null || userBudget === '' || userBudget === '0') {
          window.location.reload();
      } else {
            // Budget is valid then instanciate the budget class
            // Бюджет действителен, затем создаем экземпляр бюджетного класса
            budget = new Budget(userBudget);

            // Instanciate HTML Class
            // Создание экземпляра класса HTML
            html.insertBudget(budget.budget);
      }
  });

    // When a new expense is added
    // Когда добавляется новый расход
    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();
        // Read the input values
        // Считываем входные значения
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === '') {
          html.printMessage('There was error, all the fields are mandatory',
          'alert-danger');
        } else {
          // Add the Expenses into the list
          // Добавляем расходы в список
          html.addExpenseToList(expenseName, amount);
          html.trackBudget(amount);
          html.printMessage('Adedd....', 'alert-success');
        }
    });
}