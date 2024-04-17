'use strict';

// Tworzymy klasse BookList
class BooksList {
  constructor() {
    const thisBooksList = this;

    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];

    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.renderInMenu();
    thisBooksList.initActions();
    thisBooksList.filterBooks();

    console.log('new BookList:', thisBooksList);
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    const thisBooksList = this;

    // Referencja do szablonu oraz listy .books-list
    thisBooksList.booksWrapper = document.querySelector('.books-list');
  }


  //Dodajemy funkcje Render
  renderInMenu() {
    // Wewnątrz funkcji tworzymy pętlę for...of dla przejścia 
    // po każdej książce i otrzymaniu informacji  
    for (let bookElem of this.data) {
      // Generujemy kod HTML na podstawie szblonu oraz danych o konkretnej książce
      const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      // console.log(bookElem.name);
      // Na podstawie tego kodu HTML generujemy element DOM
      const bookHTML = template(bookElem);
      // Wygenerowany element DOM dołączmy jako nowe dziecko DOM do listy .book-list
      this.booksWrapper.innerHTML += bookHTML;
    }
  }
  // Dodano pustą tabele

  // [Zmieniono kod initActions w/w ćwiczenia 4]
  // Dodajemy funkcje initActions
  initActions() {

    const thisBooksList = this;
    // Tworzymy referencje do całej listy książek
    const bookList = thisBooksList.booksWrapper;

    //Przygotowano referencje do formularza w .filters.
    const filtersForm = document.querySelector('.filters');

    // Dodajemy nasłuchiwać dblclick na całą listę książek (ul)
    bookList.addEventListener('dblclick', function (event) {
      // Sprawdzamy, czy podwójne kliknięcie na obrazku czy na jego elementy podrzędne (elementy wewnętrzne)
      if (event.target.classList.contains('book__image') || event.target.offsetParent.classList.contains('book__image')) {

        const targetElem = event.target.classList.contains('book__image') ? event.target : event.target.offsetParent;

        // Zatrzymujemy domyślne zachowywania przeglądarki
        event.preventDefault();
        // Wyznaczamy data-id identyfikatora książki
        const bookId = targetElem.getAttribute('data-id');

        //Sprawdzamy czy książka obecna na liście ulubionych
        if (!targetElem.classList.contains('favorite')) {
          // Jeśli książki nie ma na liście, to ona zostanie dodana
          targetElem.classList.add('favorite');
          thisBooksList.favoriteBooks.push(bookId);
          //console.log('Książka została dodana do ulubionych:', bookId);
        } else {
          // Jeśli książka obecna na liście, to ona zostanie usunięta z listy
          targetElem.classList.remove('favorite');
          const index = thisBooksList.favoriteBooks.indexOf(bookId);
          if (index !== -1) {
            thisBooksList.favoriteBooks.splice(index, 1);
            //console.log('Książka została usunięta z listy ulubionych', bookId);
          }
        }
        console.log('Aktualna lista ulubionych książęk:', thisBooksList.favoriteBooks);
      }
    });

    //[Kod do ćwiczenia 5]
    filtersForm.addEventListener('click', function (event) {
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
        //console.log(event.target.value);

        //Wartość value do checkboxu
        const value = event.target.value;
        //Wlaściwość checked do checkboxu 
        const checked = event.target.checked;

        //Sprawdzamy czy checkbox jest zaznaczony
        if (checked) {
          //jeśli tak, to wysyłamy jeogo wartść do tabeli filters
          thisBooksList.filters.push(value);
          //console.log('Wartość dodana do tabeli filters:', value);
        } else {
          //jeśli nie zaznaczono, to usuwamy jego wartość z tabeli filters
          const index = thisBooksList.filters.indexOf(value);
          if (index !== -1) {
            thisBooksList.filters.splice(index, 1);
            //console.log('Wartość usunięta z tabeli filters:', value);
          }
        }
        thisBooksList.filterBooks();
        console.log('Aktualne filtry', thisBooksList.filters);
      }
    });
  }

  // Tworzymy funkcje filterBooks
  filterBooks() {
    const thisBooksList = this;

    //Tworzymy pętle dla przechodzenia po wszystkich elementach dataSource.books
    for (let book of thisBooksList.data) {

      // Stworzymy zmienną shouldBeHidden, która domyślnie równa false
      let shouldBeHidden = false;
      console.log('hidden', shouldBeHidden);

      // Przechodzimy po tablicy filters
      for (const detail of thisBooksList.filters) {
        // Jeśli dana właściwość powinna być true, a nie jest, to należy zmienić shoudBeHidden na true
        if (!book.details[detail]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookElem = document.querySelector('[data-id="' + book.id + '"');
      // Tworzymy pętle warunkową która sprawdzi wartość shouldBeHidden
      if (shouldBeHidden)
        bookElem.classList.add('hidden');
      else
        bookElem.classList.remove('hidden');

    }
  }

}

//Dodana instancja do klassy
new BooksList();