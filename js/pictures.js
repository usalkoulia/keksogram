// 1: сгенерировать данные; (done)
//   1.1 создать функцию, которая генерирует 1 элемент. Эта функция должна возвращать обьект со следующей структурой: (done)
//     {
//       url: 'stroka',
//       likes: число,
//       comments: ['stroka1', 'stroka2'],
//       description: 'stroka',
//     }
//     1.1.1 генерация значения свойства `url`: создать функцию, которая будет возвращать строку, в которой будет присутствовать случайное число от 1 до 25. Строка вида `photos/{{чиселко}}.jpg` (done)
//
//     1.1.2 генерация значения свойства `likes`: создать функцию, которая будет возвращать случайное число от 15 до 200. (done)
//
//     1.1.3 генерация значения свойства `comments`: создать функцию, которая будет возвращать массив строк. (done)
//       1.1.3.1 написать массив из указанных строк (done)
//       1.1.3.2 написать функцию, возвращающую случайны элемент из этого массива (done)
//       1.1.3.3 написать функцию, которая будет возвращать массив из пяти элементов, каждый элемнет будет создаваться с помощью функции описанной в 1.1.3.2 (done)
//
//     1.1.4 генерация значения свойства `description`: создать функцию, которая будет возвращать случайный элемент массива (done)
//       1.1.4.1 написать массив из указанных строк (done)
//       1.1.4.2 написать функцию, возвращающую случайны элемент из этого массива (done)
//
//   1.2 создать функцию, которая будет возвращать массив изззз 25 элементов, каждый элемент будет создаваться с помощью функции из 1.1

function random(min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;

  return randomNumber;
}

// 1.1.1
function generateUrl() {
  var randomNumber = random(1, 25);

  return 'photos/' + randomNumber + '.jpg';
};

// 1.1.2
function generateLikes() {
  var randomNumber = random(15, 200);

  return randomNumber;
};

// 1.1.4.1
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!',
];

function randomArrayElement(array) {
  var randomIndex = random(0, array.length - 1);
  var randomElement = array[randomIndex];

  return randomElement;
}

// 1.1.4.2
function generateDescription() {
  var randomElement = randomArrayElement(DESCRIPTIONS);

  return randomElement;
}

// 1.1.3.1
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

// 1.1.3.2
function generateComment() {
  if (Math.random() > 0.5) {
    var randomElement = randomArrayElement(COMMENTS);
  } else {
    var randomElement = randomArrayElement(COMMENTS) + " " + randomArrayElement(COMMENTS);
  }

  return randomElement;
}

// 1.1.3.3
function generateComments() {
  var comments = [];

  for (var i = 0; i < random(3, 10); i++) {
    var comment = generateComment();

    comments[i] = comment;
  }

  return comments;
};

// 1.1
function generateElement() {
  var element = {
    url: generateUrl(),
    likes: generateLikes(),
    comments: generateComments(),
    description: generateDescription(),
  };

  return element;
}

// 1.2
function generateElements() {
  var elements = [];

  for (var i = 0; i < 25; i++) {
    var element = generateElement();

    elements[i] = element;
  }

  return elements;
};

// 2: использовать сгенерированные данные для создания дом-элемнетов и вставки их в дом-дерево;
// переменная, в которой находится темплейт отдельной картинки
var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

// переменная, в которой находится массив из 25 сгенерированных элементов
var pictures = generateElements();

// ДОМ-элемент, в который нужно вставлять картинки
var picturesBlock = document.querySelector(".pictures");

// цикл, в котором вставляются картинки (0..25)
for (var i = 0; i < pictures.length; i++) {
  // склонированный темплейт
  var pictureElement = picture.cloneNode(true);
  // и-тый элемент массива со сгенерированными элементами
  var pictureObject = pictures[i];

  // вставка данных
  pictureElement.querySelector('.picture__comments').textContent = pictureObject.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = pictureObject.likes;
  pictureElement.querySelector('.picture__img').src = pictureObject.url;

  // вставка в разметку
  picturesBlock.appendChild(pictureElement);
}

// функция для генерации аватарок для комментриев
function generateBigAvatar() {
  var randomNumber = random(1, 6);

  return 'img/avatar-' + randomNumber + '.svg';
}

// функция, в которой находится код для работы с большим постом
function showBigPicture() {

  // показать боьшой пост
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  // достать из массива со сгенерированными картинками нулевой элемент
  var firstElement = pictures[0];

  // в разметку большого поста вставить актуальные данные из нулевого элемента
  bigPicture.querySelector('.comments-count').textContent = firstElement.comments.length;
  bigPicture.querySelector('.likes-count').textContent = firstElement.likes;
  bigPicture.querySelector('.big-picture__img img').src = firstElement.url;
  bigPicture.querySelector('.social__caption').textContent = firstElement.description;

  // достали для удобства массив с комментариями в переменную
  var bigPostComments = firstElement.comments;

  // темплейт комментария
  var comment = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');

  // ДОМ=элемент, в который нужно вставить комментарии
  var commentsBlock = document.querySelector(".social__comments");

  // цикл по вставке комментариев в дом-дерево
  for (var i = 0; i < bigPostComments.length; i++) {
    var commentElement = comment.cloneNode(true);
    var commentString = bigPostComments[i];

    commentElement.querySelector('.social__text').textContent = commentString;  commentElement.querySelector('.social__picture').src = generateBigAvatar();

    commentsBlock.appendChild(commentElement);
  }
}

// вызов функции, в которой происходит всякое с биг пикчером
showBigPicture();

function hideControls() {
  var socialCommentCount = document.querySelector(".social__comment-count");
  var socialLoadmore = document.querySelector(".social__comments-loader");

  socialCommentCount.classList.add("visually-hidden");
  socialLoadmore.classList.add("visually-hidden");
}

hideControls();
