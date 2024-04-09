'use strict';
   
// Referencja do szablonu oraz listy .books-list
// ?? const template = document.getElementById('template-book');
const booksWrapper = document.querySelector('.books-list');

//Dodajemy funkcje Render
function render() {    
  // Wewnątrz funkcji tworzymy pętlę for...of dla przejścia 
  // po każdej książce i otrzymaniu informacji  
  for (let bookElem of dataSource.books){
    // Generujemy kod HTML na podstawie szblonu oraz danych o konkretnej książce
    const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    // console.log(bookElem.name);
    template(bookElem);
    // Na podstawie tego kodu HTML generujemy element DOM
    const bookHTML = template(bookElem);
    // Wygenerowany element DOM dołączmy jako nowe dziecko DOM do listy .book-list
    booksWrapper.innerHTML += bookHTML;
  }
}
// Dodano pustą tabele
const favoriteBooks = [];
//console.log(favoriteBooks);

/* [Kod do ćwiczenia 2 i 3 - dodanie do ulubionych i usunięcie z listy]
// Dodajemy funkcje initActions
function initActions(){
    // Tworzymy referencje do listy wszystkich elementów .book__image w liście .bookList

    const booksImage = document.querySelectorAll('.book .book__image');
    //console.log('Books images:', booksImage); // sprawdzamy czy elementy są prawidłowo wybrane


    // Przechodzimy po każdym elemencie z tej listy
    for (let imageElem of booksImage){
    // Dla każdego z tych elementów dodaję nasłuchiwać dblclick
        imageElem.addEventListener('dblclick', function(event){
        //console.log('Adding event listener to:', imageElem); // sprawdzamy czy nasłuchiwać zostaw dodany do każdego elementu


            //zatrzymujemy domyślne zachowywania przeglądarki
            event.preventDefault();
           
            //pobierze z jego data-id idęntyfikator książki
            const bookId = this.getAttribute('data-id');
            //console.log('Book id:', bookId); //Sprawdzimy czy prawidlowo pobierano atrybut data-id
        
            //Sprawdzamy czy ta książka już jest obecna na liście ulubionysh
            if (!this.classList.contains('favorite')) {
                // Jeśli książki nie ma na liscie ulubionych, dodajemy ją
                this.classList.add('favorite');
                favoriteBooks.push(bookId);
                //console.log('Dodana ksiązka do listy ulubionych:', bookId);
            } else {  
                // Jeśli książka już jest na liście ulubionych, usuwamy ją
                this.classList.remove('favorite');

                const index = favoriteBooks.indexOf(bookId);
                if (index !== -1) {
                    favoriteBooks.splice(index, 1);
                //console.log('Książka usunięta z listy ulubionych:', bookId);
                }
            } 
            //console.log('favorites', favoriteBooks);

        });
    }
}*/

// [Zmieniono kod initActions w/w ćwiczenia 4]
// Dodajemy funkcje initActions
function initActions() {
    // Tworzymy referencje do całej listy książek
    const bookList = booksWrapper; 
    // Dodajemy nasłuchiwać dblclick na całą listę książek (ul)
    bookList.addEventListener('dblclick', function(event) { 
        // Sprawdzamy, czy podwójne kliknięcie na obrazku czy na jego elementy podrzędne (elementy wewnętrzne)
        if (event.target.classList.contains('book__image') || event.target.offsetParent.classList.contains('book__image')) { 
            // Zatrzymujemy domyślne zachowywania przeglądarki
            event.preventDefault(); 
            // Wyznaczamy data-id identyfikatora książki
            const bookId = event.target.getAttribute('data-id') || event.target.offsetParent.getAttribute('data-id'); 

            //Sprawdzamy czy książka obecna na liście ulubionych
            if (!event.target.classList.contains('favorite')) {
                // Jeśli książki nie ma na liście, to ona zostanie dodana
                event.target.classList.add('favorite');
                favoriteBooks.push(bookId);
                //console.log('Książka została dodana do ulubionych:', bookId);
            } else {
                // Jeśli książka obecna na liście, to ona zostanie usunięta z listy
                event.target.classList.remove('favorite');
                const index = favoriteBooks.indexOf(bookId);
                if (index !== -1) {
                    favoriteBooks.splice(index, 1);
                    //console.log('Książka została usunięta z listy ulubionych', bookId);
                }
            }
            console.log('Aktualna lista ulubionych książęk:', favoriteBooks);
        }
    });


    //[Kod do ćwiczenia 5]
    // Dodajemy pustą tabele filters
    const filters = [];
    // Przygotujemy referencje do formularza w .filters.
    const filtersForm = document.querySelector('.filters');
    //console.log('Filter', filtersForm);

    filtersForm.addEventListener('click', function(event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
            //console.log(event.target.value);

            //Wartość value do checkboxu
            const value = event.target.value;
            //Wlaściwość checked do checkboxu 
            const checked = event.target.checked;

            //Sprawdzamy czy checkbox jest zaznaczony
            if(checked){
                //jeśli tak, to wysyłamy jeogo wartść do tabeli filters
                filters.push(value);
                //console.log('Wartość dodana do tabeli filters:', value);
            } else {
                //jeśli nie zaznaczono, to usuwamy jego wartość z tabeli filters
                const index = filters.indexOf(value);
                if (index !== -1) {
                    filters.splice(index, 1);
                    //console.log('Wartość usunięta z tabeli filters:', value);
                }
            }
            //console.log('Aktualne filtry', filters);
        }
    })
}

// Tworzymy funkcje filterBooks
function filterBooks(){
    


}






// Uruchomiamy funkcje Render
render();
// Uruchomiamy funkcje initAction
initActions();
// Uruchomiamy funkcje filterBooks
filterBooks();