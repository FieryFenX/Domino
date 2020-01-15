/*throttling, request animation frame, debounce*/
/*learn.javascript.ru – events*/

const timeouts = [];
let nOfPlayers = 3;
let selectedKnuckle;
let x1 = -1,
    y1 = -1,
    x2 = -1,
    y2 = -1;

const users = ["Nagibator228", "Valera", "ProGamer1337", "OriginalName"];
const players = ["Nagibator228", "MamaYaPokushal", "Noobarik", "ProGamer1337"];

const contextM = contextMenu();
const loginW = loginWindow();
const menuW = menuWindow();
const createW = createWindow();
const connectW = connectWindow();

let lastW;

const currentTurn = document.querySelector('.current-turn');
const hamburger = document.querySelector('.hamburger');
const bazaar = document.querySelector('.bazaar');

hamburger.addEventListener('mouseenter', () => {document.body.appendChild(contextM)});

bazaar.addEventListener('click', () => {
    insertKnuckle(Math.floor(Math.random()*6 + 1), Math.floor(Math.random()*6 + 1));
    const hand = document.querySelector('.hand');
    if (hand.children.length % 7 === 1)
      drawField();
  });

//window.addEventListener("load", () => {drawField(); startGame();});
window.addEventListener("load", () => {darkenBG(); document.body.appendChild(loginW);}, false);
window.addEventListener("resize", () => {requestAnimationFrame(drawField)}, false);

function darkenBG() {
  const darkBG = document.querySelector('.darkBG');
  darkBG.classList.remove('hidden');
  const hand = document.querySelector('.hand');
  hand.classList.add('dark');
  drawField();
}

function lightenBG() {
  const darkBG = document.querySelector('.darkBG');
  darkBG.classList.add('hidden');
  const hand = document.querySelector('.hand');
  hand.classList.remove('dark');
  drawField();
}

function endTurn() {
  const darkBG = document.querySelector('.darkBG');
  darkBG.classList.toggle('hidden');
  const hand = document.querySelector('.hand');
  hand.classList.add('dark');
  const currentTurn = document.querySelector('.current-turn');
  currentTurn.textContent = "Turn: " + players[0];
  setTimeout(startTurn, 6000);
}

function startTurn() {
  const darkBG = document.querySelector('.darkBG');
  darkBG.classList.toggle('hidden');
  const hand = document.querySelector('.hand');
  hand.classList.remove('dark');
  const currentTurn = document.querySelector('.current-turn');
  currentTurn.textContent = "Your Turn";
}

function startGame() {
  const hand = document.querySelector('.hand');
  let k = 0;
  loop: for (let i = 1; i < 7; i++)
    for (let j = 1; j < 7; j++)
      if (Math.floor(Math.random()*1.5)) {
        insertKnuckle(i,j);
        if (++k === (nOfPlayers == 2 ? 7 : 5)) break loop;
      }
  currentTurn.classList.toggle('hidden');
  hamburger.classList.toggle('hidden');
  bazaar.classList.toggle('hidden');
  drawField();
}

function contextMenu() {
  const contextM = document.createElement('ul');
  contextM.className = 'context-menu';
  
  const menuItem = document.createElement('li');
  menuItem.className = 'menu-item';
  const playersLabel = document.createElement('label');
  playersLabel.className = 'list-label';
  playersLabel.textContent = 'Players';
  playersLabel.setAttribute('for', 'list-of-players');
  const playersList = document.createElement('ul');
  playersList.className = 'list';
  playersList.id = 'list-of-players';
  let player = document.createElement('li');
  player.className = 'list-item';

  for (const elem of players) {
    player = player.cloneNode();
    player.textContent = elem;
    playersList.append(player);
  }
  menuItem.append(playersLabel, playersList);
  
  const quitMenuItem = menuItem.cloneNode(false);
  const quit = document.createElement('button');
  quit.className = 'menu-back';
  quit.name = 'quit-game';
  quit.type = 'button';
  quit.textContent = "Quit Game";
  quit.addEventListener('click', () => {
    endGame();
    darkenBG();
    document.body.appendChild(menuW);
  });
  quitMenuItem.append(quit);
  
  contextM.append(menuItem, quitMenuItem);
  contextM.addEventListener('mouseleave', () => {timeouts.push(setTimeout(() => {document.body.removeChild(contextM)}, 1200))});
  contextM.addEventListener('mouseenter', () => {for (const elem of timeouts) clearTimeout(elem);});
  
  return contextM;
}

function endGame() {
  //const hamburger = document.querySelector('.hamburger');
  //document.body.removeChild(hamburger);
  hamburger.classList.add('hidden');
  document.body.removeChild(contextM);
  //const curturn = document.querySelector('.current-turn');
  //document.body.removeChild(curturn);
  currentTurn.classList.add('hidden');
  //const bazaar = document.querySelector('.bazaar');
  //document.body.removeChild(bazaar);
  bazaar.classList.add('hidden');
  let knuckle;
  while (knuckle = document.querySelector('.knuckle'))
    knuckle.remove();
}

function loginWindow() {
  const loginW = document.createElement('form');
  loginW.className = 'popup-form';
  loginW.name = "login-form";
  const login = document.createElement('input');
  login.type = 'text';
  login.className = 'input';
  login.name = 'login';
  login.id = 'login-input';
  const pw = document.createElement('input');
  pw.type = 'password';
  pw.className = 'input';
  pw.name = 'password';
  pw.id = 'password-input';
  const loginLabel = document.createElement('label');
  loginLabel.className = 'input-label';
  loginLabel.textContent = 'Login';
  loginLabel.setAttribute('for', 'login-input');
  const pwLabel = document.createElement('label');
  pwLabel.className = 'input-label';
  pwLabel.textContent = 'Password';
  pwLabel.setAttribute('for', 'password-input');
  loginW.append(loginLabel, login, pwLabel, pw);
  const enter = document.createElement('div');
  enter.className = 'enter';
  const nuser = document.createElement('label');
  nuser.className = 'new-user';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  nuser.append(checkbox);
  const checkmark = document.createElement('span');
  checkmark.classList.add('icon', 'checkmark');
  nuser.append(checkmark, document.createTextNode('New user'));
  enter.append(nuser);
  const button = document.createElement('button');
  button.className = 'button';
  button.textContent = 'Enter';
  button.name = 'enter';
  button.type = 'submit';
  enter.append(button);
  loginW.append(enter);
  loginW.addEventListener("submit", () => {
    document.body.removeChild(loginW);
    document.body.appendChild(menuW);
  });
  loginW.action = "";
  
  return loginW;
}

function menuWindow() {
  const menuW = document.createElement('ul');
  menuW.className = 'popup-menu';
  menuW.name = 'main-menu';
  const menuItem1 = document.createElement('li');
  menuItem1.className = 'big menu-item';
  const mi1button = document.createElement('button');
  mi1button.className = 'menu-item-inside';
  mi1button.name = 'menu-item-button';
  mi1button.type = 'button';
  mi1button.textContent = "Create game";
  menuItem1.append(mi1button);
  mi1button.addEventListener('click', () => {
    document.body.removeChild(menuW);
    document.body.appendChild(createW);
  });
  const menuItem2 = menuItem1.cloneNode(true);
  menuItem2.firstChild.textContent = "Connect to game";
  menuItem2.firstChild.addEventListener('click', () => {
    document.body.removeChild(menuW);
    document.body.appendChild(connectW);
  });
  const menuItem3 = menuItem1.cloneNode(true);
  menuItem3.firstChild.textContent = "Change user";
  menuItem3.firstChild.addEventListener('click', () => {
    document.body.removeChild(menuW);
    document.body.appendChild(loginW);
  });
  menuW.append(menuItem1, menuItem2, menuItem3);
  
  return menuW;
}

function createWindow() {
  const createW = document.createElement('form');
  createW.className = 'popup-form';
  createW.name = "create-form";
  
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.className = 'slider';
  slider.name = 'number-of-players';
  slider.id = 'number-of-players-input';
  slider.step = 1;
  slider.min = 2;
  slider.max = 4;
  slider.value = 2;
  
  slider.setAttribute('val', slider.value);
  slider.addEventListener('input', () => {slider.setAttribute('val', slider.value)});
  
  const sliderLabel = document.createElement('label');
  sliderLabel.className = 'input-label';
  sliderLabel.textContent = 'Number of players';
  sliderLabel.setAttribute('for', 'number-of-players-input');
  
  const sliderTicks = document.createElement('span');
  sliderTicks.className = 'slider-ticks';
  const tick = document.createElement('span');
  sliderTicks.append(tick, tick.cloneNode(), tick.cloneNode());
  
  const enter = document.createElement('div');
  enter.className = 'enter';
  const back = document.createElement('button');
  back.className = 'menu-back';
  back.textContent = "Back";
  back.name = 'back';
  back.type = 'button';
  back.addEventListener('click', () => {
    document.body.removeChild(createW);
    document.body.appendChild(menuW);
  });
  const search = document.createElement('button');
  search.className = 'button';
  search.textContent = 'Start search';
  search.name = 'start-search';
  search.type = 'submit';
  enter.append(back, search);
  createW.append(sliderLabel, sliderTicks, slider, sliderTicks.cloneNode(true), enter);
  
  createW.addEventListener("submit", () => {
    nOfPlayers = slider.value;
    document.body.removeChild(createW);
    lastW = createW;
    searchHost();
  });
  createW.action = "";
  
  return createW;
}

function connectWindow() {
  const listG = document.createElement('ul');
  listG.className = 'popup-menu';
  listG.name = 'list-games';
  let menuItem = document.createElement('li');
  menuItem.className = 'menu-item';
  let miButton = document.createElement('button');
  miButton.className = 'menu-item-inside-alt';
  menuItem.append(miButton);
  for (let i = 0; i < users.length; i++)
  {
    miButton.textContent = users[i];
    miButton.addEventListener('click', () => {
      document.body.removeChild(listG);
      lastW = listG;
      searchGuest();
    });
    listG.append(menuItem);
    menuItem = menuItem.cloneNode(true);
    miButton = menuItem.firstChild;
  }
  const backButton = document.createElement('button');
  backButton.className = 'menu-back';
  backButton.textContent = "Back";
  backButton.addEventListener('click', () => {
    document.body.removeChild(listG);
    document.body.appendChild(menuW);
  });
  menuItem.replaceChild(backButton, miButton);
  listG.append(menuItem);
  
  return listG;
}

function searchWindow() {
  const searchW = document.createElement('ul');
  searchW.className = 'popup-menu';
  searchW.name = 'search-players';
  const header = document.createElement('li');
  header.className = 'menu-item';
  const headerText = document.createElement('div');
  headerText.className = 'menu-item-text';
  headerText.textContent = "Searching for players";
  const dot = document.createElement('span');
  dot.textContent = '.';
  headerText.append(dot, dot.cloneNode(true), dot.cloneNode(true));
  header.append(headerText);
  const search = header.cloneNode(true);
  search.firstChild.textContent = "2/4 Connected";
  search.classList.add('centered');
  const pause = header.cloneNode(false);
  const backButton = document.createElement('button');
  backButton.className = 'menu-back';
  backButton.addEventListener('click', () => {
    document.body.removeChild(document.querySelector('.popup-menu'));
    for (const elem of timeouts) {
      clearTimeout(elem);
    }
    document.body.appendChild(lastW);
  });
  pause.append(backButton);
  searchW.append(header, search, pause);
  
  timeouts.push(setTimeout(() => {search.firstChild.textContent = "3/4 Connected";}, 2000));
  timeouts.push(setTimeout(() => {search.firstChild.textContent = "4/4 Connected";}, 5000));
  timeouts.push(setTimeout(() => {
    document.body.removeChild(searchW);
    lightenBG();
    startGame();
  }, 6000));
  
  document.body.appendChild(searchW);
  return searchW;
}

function searchHost() {
  const backButton = searchWindow().querySelector('.menu-back');
  backButton.textContent = "Pause";
}

function searchGuest() {
  const backButton = searchWindow().querySelector('.menu-back');
  backButton.textContent = "Leave";
}

function drawField() {
  const field = document.querySelector('.field');
  let cell;
  while ((cell = document.querySelector('.cell')) !== null) {
    field.removeChild(cell);
  }
  const baseCell = document.createElement('button');
  baseCell.className = 'cell';
  cell = baseCell.cloneNode();
  cell.addEventListener('click', selectCell);
  cell.dataset.x = 0;
  cell.dataset.y = 0;
  field.appendChild(cell);
  const height = Math.floor(field.clientHeight / (cell.clientHeight*1.027));
  const frg = document.createDocumentFragment();
  for (let i = 0; i < height; i++)
    for (let j = 0; j < 16; j++) {
      if (i === 0 && j === 0) continue;
      cell = baseCell.cloneNode();
      cell.addEventListener('click', selectCell);
      cell.dataset.x = j;
      cell.dataset.y = i;
      frg.appendChild(cell);
    }
  field.appendChild(frg);
  const buff = selectedKnuckle;
  const knuckles = document.querySelectorAll('.placed.knuckle');
  for (const elem of knuckles) {
    selectedKnuckle = elem;
    drawKnuckle();
    x1 = -1;
    y1 = -1;
  }
  selectedKnuckle = buff;
  //document.querySelector(".cell[x = '2'][y = '3']");
}

function selectFirstCell(cell, x, y) {
  const field = document.querySelectorAll('.field > .cell');
  for (const elem of field) {
    if (elem !== cell)
    elem.classList.remove('selected');
  }
  if (cell.classList.toggle('selected')) {
    x1 = x;
    y1 = y;
  } else {
    x1 = y1 = -1;
  }
  x2 = y2 = -1;
}

function getCell(x, y) {
  return `.cell[data-x = \'${x}\'][data-y = \'${y}\']`;
}

function selectCell(e) {
  const x = e.target.dataset.x;
  const y = e.target.dataset.y;
  if (x1 < 0 && y1 < 0 || x === x1 && y === y1 ||
      Math.abs(x - x1) + Math.abs(y - y1) > 1)
    selectFirstCell(e.target, x, y);
  else if (x1 > 0 && y1 > 0 && x2 < 0 && y2 < 0) { //select second cell
    x2 = x;
    y2 = y;
    e.target.classList.toggle('selected');
    if (selectedKnuckle) placeKnuckle();
  }
  else selectFirstCell(e.target, x, y);
}

function placeKnuckle() {
  document.querySelector('.field').appendChild(selectedKnuckle);
  const hand = document.querySelector('.hand');
  if (hand.children.length % 7 === 0)
    drawField();
  selectedKnuckle.classList.remove('selected');
  selectedKnuckle.disabled = true;
  selectedKnuckle.dataset.x = x1;
  selectedKnuckle.dataset.y = y1;
  selectedKnuckle.classList.add('placed');
  if (y1 !== y2) selectedKnuckle.classList.add('vertical');
  if (y2 < y1 || x2 < x1) selectedKnuckle.classList.add('inverted');
  drawKnuckle();
  const firstCell = document.querySelector(getCell(x1, y1));
  const secondCell = document.querySelector(getCell(x2, y2));
  firstCell.classList.remove('selected'); secondCell.classList.remove('selected');
  selectedKnuckle = null;
  x1 = y1 = x2 = y2 = -1;
  endTurn();
}

function drawKnuckle() {
  if (x1 < 0) x1 = selectedKnuckle.dataset.x;
  if (y1 < 0) y1 = selectedKnuckle.dataset.y;
  const firstCell = document.querySelector(getCell(x1, y1));
  selectedKnuckle.style.left = firstCell.getBoundingClientRect().left*100/window.innerWidth + "vw";
  selectedKnuckle.style.top = firstCell.getBoundingClientRect().top*100/window.innerWidth + "vw";
}

const numerals = [ , 'one', 'two', 'three', 'four', 'five', 'six'];

function organizeDots(dots, value) {
  switch (value) {
    case 6:
      dots.children[6].classList.add('horc', 'top');
      dots.children[5].classList.add('horc', 'bottom');
      //falls through
    case 5:
    case 4:
      dots.children[4].classList.add('left', 'top');
      dots.children[3].classList.add('right', 'bottom');
      //falls through
    case 3:
    case 2:
      dots.children[2].classList.add('right', 'top');
      dots.children[1].classList.add('left', 'bottom');
  }
  if (value % 2 === 1)
    dots.children[value].classList.add('verc', 'horc');
}

function generateDots(value) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const dots = document.createElementNS(svgNS, 'svg');
  dots.classList.add('knuckle-dots');
  const num = document.createElementNS(svgNS, 'text');
  num.classList.add('value');
  num.appendChild(document.createTextNode(value));
  dots.appendChild(num);
  for (let i = 0; i < value; i++) {
    const dot = document.createElementNS(svgNS, 'circle');
    dot.classList.add('knuckle-dot');
    dots.appendChild(dot);
  }
  organizeDots(dots, value);
  return dots;
}

function generateKnuckle(v1, v2) {
  const knuckle = document.createElement('button');
  knuckle.classList.add('knuckle', numerals[v1], numerals[v2]);
  knuckle.appendChild(generateDots(v1));
  const delimiter = document.createElement('span');
  delimiter.className = 'knuckle-delimiter';
  knuckle.appendChild(delimiter);
  knuckle.appendChild(generateDots(v2));
  knuckle.addEventListener('click', () => {
    const hand = document.querySelectorAll('.hand > .knuckle');
    for (const elem of hand) {
      if (elem !== knuckle)
        elem.classList.remove('selected');
    }
    if (knuckle.classList.toggle('selected')) {
      selectedKnuckle = knuckle;
      if (x1 > 0 && y1 > 0 && x2 > 0 && y2 > 0)
        placeKnuckle();
    };
  });
  
  return knuckle;
}

function insertKnuckle(v1, v2) {
  const hand = document.querySelector('.hand');
  const knuckle = generateKnuckle(v1, v2);
  hand.appendChild(knuckle);
  const dots = knuckle.querySelectorAll('.knuckle-dots');
  for (const elem of dots)
    elem.setAttributeNS(null, 'viewBox', "0 0 " + String(elem.clientWidth) + " " + String(elem.clientHeight));
}