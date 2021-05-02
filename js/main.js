// source data
const createNum = Number(prompt('Сколько отобразить фильмов?'));
const filmList = document.querySelector('.film-list');

const stringRating = 'Рейтинг';
const stringReleaseDate = 'Дата релиза';
const stringDirector = 'Режиссер';
const stringBudget = 'Бюджет';
const stringPlot = 'Сюжет';

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
}
function getRandomDate() {
    const min = Date.UTC(1996, 0, 0);
    const max = Date.now();
    const date = Math.round(Math.random() * (max - min) + min);
    return new Intl.DateTimeFormat().format(date);
}
function getRandomBudget() {
    const min = 100000;
    const max = 5000000;
    const budget = Math.round(Math.random() * (max - min) + min);
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(budget);
}

function MoveCard() {
    this.poster = getRandomElem(arrPosters);
    this.title = getRandomElem(arrMovieTitle);
    this.rating = (Math.round(Math.random() * (100 - 30) + 30)) / 10;
    this.releaseDate = getRandomDate();
    this.director = `${getRandomElem(arrFirstName)} ${getRandomElem(arrLastName)}`;
    this.boxOffice = getRandomBudget();
    this.description = getRandomElem(arrMovieDescription);
};

// rendering

function createFilmCard() {
    //создание нового объекта для новой картоки
    const filmObj = new MoveCard();

    //создание фрагмента с карточкой
    const film = document.createDocumentFragment();

    //создание блока карточки
    const card = document.createElement('div');
    card.classList.add('card');
    film.append(card);

    //card-header
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card__header', 'card-header');
    card.append(cardHeader);

    const cardHeaderImg = document.createElement('img');
    cardHeaderImg.classList.add('card-header__image');
    cardHeaderImg.setAttribute('src', filmObj.poster);
    cardHeader.append(cardHeaderImg);

    const cardHeaderTitle = document.createElement('h2');
    cardHeaderTitle.classList.add('card-header__title');
    cardHeaderTitle.innerText = filmObj.title;
    cardHeader.append(cardHeaderTitle);

    //card-body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card__body');
    card.append(cardBody);

    //элементы card-body:
    //film rating
    const filmRating = document.createElement('div');
    filmRating.classList.add('film-info', 'film-info__rating');
    cardBody.append(filmRating);

    const filmRatingTitle = document.createElement('p');
    filmRatingTitle.classList.add('film-info__title');
    filmRatingTitle.innerText = stringRating;
    filmRating.append(filmRatingTitle);

    const filmRatingCount = document.createElement('p');
    filmRatingCount.classList.add('film-info__text');
    filmRatingCount.innerText = filmObj.rating;
    filmRating.append(filmRatingCount);

    //release date
    const releaseDate = document.createElement('div');
    releaseDate.classList.add('film-info', 'film-info__release-date');
    cardBody.append(releaseDate);

    const releaseDateTitle = document.createElement('p');
    releaseDateTitle.classList.add('film-info__title');
    releaseDateTitle.innerText = stringReleaseDate;
    releaseDate.append(releaseDateTitle);

    const releaseDateCount = document.createElement('p');
    releaseDateCount.classList.add('film-info__text');
    releaseDateCount.innerText = filmObj.releaseDate;
    releaseDate.append(releaseDateCount);

    //director
    const director = document.createElement('div');
    director.classList.add('film-info', 'film-info__director');
    cardBody.append(director);

    const directorTitle = document.createElement('p');
    directorTitle.classList.add('film-info__title');
    directorTitle.innerText = 'Режисcер';
    director.append(directorTitle);
    
    const directorCount = document.createElement('p');
    directorCount.classList.add('film-info__text');
    directorCount.innerText = filmObj.director;
    director.append(directorCount);

    //box office 
    const boxOffice = document.createElement('div');
    boxOffice.classList.add('film-info', 'film-info__box-office');
    cardBody.append(boxOffice);

    const boxOfficeTitle = document.createElement('p');
    boxOfficeTitle.classList.add('film-info__title');
    boxOfficeTitle.innerText = stringBudget;
    boxOffice.append(boxOfficeTitle);

    const boxOfficeCount = document.createElement('p');
    boxOfficeCount.classList.add('film-info__text');
    boxOfficeCount.innerText = getRandomBudget();
    boxOffice.append(boxOfficeCount);

    //plot
    const plot = document.createElement('div');
    plot.classList.add('film-info', 'film-info__plot');
    cardBody.append(plot);

    const plotTitle = document.createElement('p');
    plotTitle.classList.add('film-info__title');
    plotTitle.innerText = 'Сюжет';
    plot.append(plotTitle);

    const plotCount = document.createElement('p');
    plotCount.classList.add('film-info__text');
    plotCount.innerText = getRandomElem(arrMovieDescription);
    plot.append(plotCount);

    //блок card-footer
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card__footer');
    card.append(cardFooter);

    const cardFooterBtn = document.createElement('button');
    cardFooterBtn.classList.add('card__button', 'button', 'button__icon', 'button_add');
    cardFooter.append(cardFooterBtn);

    return film;
}

function generatMoves (num) {
    let movesCatalog = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        movesCatalog.append(createFilmCard());
    }
    filmList.append(movesCatalog);
}
generatMoves(createNum);
