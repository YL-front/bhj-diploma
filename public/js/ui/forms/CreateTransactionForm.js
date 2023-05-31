/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let fragment = new DocumentFragment();

    Account.list({}, (err, response) => {
      if (response.success) {
        response.data.forEach(e => {
          let optionsItem = document.createElement('option');
          optionsItem.setAttribute('value', `${e.id}`);
          optionsItem.innerText = e.name;
          fragment.append(optionsItem);
        })
      }
      const select = this.element.querySelector('.accounts-select');
      
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
      
      select.prepend(fragment);
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const type = data.type[0].toUpperCase() + data.type.slice(1);

    Transaction.create(data, (err, response) => {
      if (response.success) {
        
        App.getModal(`new${type}`).close();
        App.getForm(`create${type}`).element.reset();
        App.update();

      } else {
        console.log(response.error);
        alert(response.error);
      }
    })
  }
}