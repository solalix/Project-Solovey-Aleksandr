// source data

const numFilms = 4;
const favorite = document.getElementById('favorite');
const filmList = document.querySelector('.film-list');

const arrFirstName = [
    'Alex',
    'Nilson',
    'John',
    'Mikle',
    'Linda',
    'Abdul',
    'Georgi',
];

const arrLastName = [
    'Milkovich',
    'Chean',
    'Boyarsky',
    'Travolta',
    'Madison',
    'Patison',
    'Milevsky',
];

const arrMovieTitle = [
    'Форрест Гамп',
    'Леон',
    'Паразиты',
    'Дюнкерк',
    'Бойцовский клуб / Fight Club',
    'Интерстеллар / Interstellar',
    'Безумный Макс: Дорога ярости',
    'Спасти рядового Райана',
    'Тор',
    'Назад в будущее',
    'Крепкий орешек',
];

const arrMovieDescription = [
    "When a spate of eerie murders erupts across Hong Kong, two troublemaking cops are assigned to the case. Young maverick WANG teams up with grizzled vet HUANG who is fed up with his reckless younger partner always landing them in hot water. Reaching a dead end after discovering all the victims were former boyfriends of aspiring starlet LIU, the detectives must play a deadly game. One of them must go undercover as Liu's lover to lure the killer out.",
    "While searching for the daughter of a Japanese publishing magnate, private investigator Ryu Saeba (Jackie Chan) and his assistant Kaori (Joey Wang) are caught up in the middle of a cruise liner highjacking. It's up to Ryu to save the day... but can he do it on an empty stomach? -- presented by Shout! Factory TV",
    "When high school senior Tripp discovers a gas-guzzling creature named Creech, the unlikely duo team up for a fun-filled, hilarious and heartfelt adventure in a real-life super-powered Monster Truck to reunite Creech with his family.",
    "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
    "An earthquake releases a strain of mutant cockroaches with the ability to start fires, which proceed to cause destructive chaos in a small town. The studies carried out by scientist James Parmiter, however, reveal an intent with much more far-reaching consequences.",
    "The film is set in Middle-earth ? a land where such ?goodly? races as hobbits, elves, dwarfs and men live. Since the ancient times they have warred with orcs, goblins and trolls. At the beginning of the film we learn about the One Ring ? a powerful weapon created by the Dark Lord Sauron ? which was occasionally found by Bilbo Baggins, the hobbit.",
];

const arrPosters = [
    './images/posters/poster-1.jpg',
    './images/posters/poster-2.jpg',
    './images/posters/poster-3.jpg',
    './images/posters/poster-4.jpg',
    './images/posters/poster-5.jpg',
    './images/posters/poster-6.jpg',
    './images/posters/poster-7.jpg',
    './images/posters/poster-8.jpg',
];


function getRandomElem(arr) {
    const i = Math.round(Math.random() * (arr.length - 1));
    if (arr[i].length > 100) {
        let arrSliced = arr[i].slice(0, 97);
        return `${arrSliced}...`;
    }
    return arr[i];
};

function getRandomDate() {
    const min = Date.UTC(1996, 0, 0);
    const max = Date.now();
    const date = Math.round(Math.random() * (max - min) + min);
    return date;
};

function getRandomBudget() {
    const min = 100000;
    const max = 5000000;
    const budget = Math.round(Math.random() * (max - min) + min);
    return budget;
};

function FilmCard() {
    this.poster = getRandomElem(arrPosters);
    this.title = getRandomElem(arrMovieTitle);
    this.rating = (Math.round(Math.random() * (100 - 30) + 30)) / 10;
    this.releaseDate = getRandomDate();
    this.director = `${getRandomElem(arrFirstName)} ${getRandomElem(arrLastName)}`;
    this.boxOffice = getRandomBudget();
    this.plot = getRandomElem(arrMovieDescription);
    this.isFavorite = false;
};


// создание массива с фильмами
function createdFilmsArr() {
    const filmsArr = new Array();
    for (let i = 0; i < numFilms; i++) {
        const newCard = new FilmCard();
        filmsArr.push(newCard);
    }
    return filmsArr;
}

const films = createdFilmsArr();


//сортировка фильмов
function sortByRating(a, b) {
    return (a.rating > b.rating ? 1 : -1);
};

function sortByDate(a, b) {
    return (a.releaseDate > b.releaseDate ? 1 : -1);
};

function sortByBoxOffice(a, b) {
    return (a.boxOffice > b.boxOffice ? 1 : -1);
};

const sortBtnParant = document.querySelector('.sorting');
const sortBtn = sortBtnParant.querySelectorAll('.button');

sortBtnParant.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('button')) {
        for (let i = 0; i < sortBtn.length; i++) {
            sortBtn[i].classList.remove('button_checked');
        }
        target.classList.add('button_checked');
    };

    if (target.id === 'rating') {
        render(films.sort(sortByRating).reverse());
    }

    if (target.id === 'releaseDate') {
        render(films.sort(sortByDate).reverse());
    }

    if (target.id === 'boxOffice') {
        render(films.sort(sortByBoxOffice).reverse());
    }

});


//поиск фильмов
const searchInp = document.querySelector('.search__input');
let searchStr = null;
searchInp.addEventListener('input', function (event) {
    searchStr = this.value.toLowerCase();
    search(searchStr);
});

function search(str) {
    const result = [];
    films.forEach(element => {
        for (key in element) {
            let strKey = String(element[key]).toLowerCase();
            if (strKey.indexOf(str) !== -1) {
                result.push(element);
                break;
            }
        }
    });
    render(result);
};


//работа с избранным
const ratingBtn = document.getElementById('rating');
const releaseDateBtn = document.getElementById('releaseDate');
const boxOfficeBtn = document.getElementById('boxOffice');

function renderBySaveSort() {
    if (ratingBtn.classList.contains('button_checked')) {
        render(films.sort(sortByRating).reverse());
    }

    if (releaseDateBtn.classList.contains('button_checked')) {
        render(films.sort(sortByDate).reverse());
    }

    if (boxOfficeBtn.classList.contains('button_checked')) {
        render(films.sort(sortByBoxOffice).reverse());
    }
};

favorite.addEventListener('click', (renderBySaveSort));

filmList.addEventListener('click', (event) => {
    target = event.target;
    if (target.classList.contains('button')) {
        let targetData = target.parentElement.closest('div[data-film-id]').getAttribute('data-film-id');

        films.map((elem, index) => {
            if (index === Number(targetData)) {
                elem.isFavorite = !favorite.checked;
            }
        });
        renderBySaveSort();
    }
});


// rendering
function render(filmsArr) {
    const cardTemplate = document.getElementById('card-template').content.querySelector('.card');
    const allFilms = document.createDocumentFragment();
    const favoriteFilms = document.createDocumentFragment();

    filmsArr.forEach((element, index) => {
        const cardNode = cardTemplate.cloneNode(true);
        const nodePoster = cardNode.querySelector('.card-header__image');
        const nodeTitle = cardNode.querySelector('.card-header__title');
        const nodeRating = cardNode.querySelector('.film-info__rating .film-info__text');
        const nodeReleaseDate = cardNode.querySelector('.film-info__release-date .film-info__text');
        const nodeDirector = cardNode.querySelector('.film-info__director .film-info__text');
        const nodeBoxOffice = cardNode.querySelector('.film-info__box-office .film-info__text');
        const nodePlot = cardNode.querySelector('.film-info__plot .film-info__text');
        const nodeBtn = cardNode.querySelector('.card__button');

        nodePoster.src = element.poster;
        nodeTitle.textContent = element.title;
        nodeRating.textContent = element.rating;
        nodeReleaseDate.textContent = new Intl.DateTimeFormat().format(element.releaseDate);
        nodeDirector.textContent = element.director;
        nodeBoxOffice.textContent = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(element.boxOffice);
        nodePlot.textContent = element.plot;

        cardNode.dataset.filmId = index;

        nodeBtn.classList.add(element.isFavorite === true ? 'button_remove' : 'button_add');

        if (element.isFavorite === true) {
            favoriteFilms.append(cardNode);
        }
        else if (element.isFavorite === false) {
            allFilms.append(cardNode);
        }
    });

    filmList.innerHTML = '';

    if (favorite.checked) {
        filmList.append(favoriteFilms);
    }
    else {
        filmList.append(allFilms);
    }
};
render(films.sort(sortByDate).reverse());