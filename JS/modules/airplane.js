import createElement from "./createElement.js";
import declOfNum from "./declOfNum.js";
import checkSeat from "./checkSeats.js";
import { getStorage } from "../server/storage.js";

const createCockpit = (titleText) => {
  const cockpit = createElement("div", {
    className: "cockpit",
  });
  const title = createElement("h1", {
    className: "cockpit-title",
    textContent: titleText,
  });
  const button = createElement("button", {
    className: "cockpit-confirm",
    type: "submit",
    textContent: "Подтвердить",
  });
  cockpit.append(title, button);

  return cockpit;
};

const createExit = () => {
  const fuselage = createElement("div", {
    className: "fuselage exit",
  });
  return fuselage;
};

const createBlockSeat = (n,count,bookingSeat)=>{
 const letters = ['A','B','C','D','E','F'];

 const fuselage = createElement("ol", {
  className: "fuselage ",
});
for(let i = n; i<count+n;i++){
  const wrapperRow = createElement('li');
  const seats = createElement('ol',{className:'seats'
});
const seatsRow=letters.map((letter)=>{
  const seat = createElement('li',{
    className:'seat'
  });

  const wrapperCheck = createElement('label');
 const seatValue=`${i}${letter}`;
const check= createElement('input',{
  name:'seat',
  type:'checkbox',
  value:seatValue,
  disabled:bookingSeat.includes(seatValue)

});

wrapperCheck.append(check);
seat.append(wrapperCheck);
return seat;

})
seats.append(...seatsRow);
wrapperRow.append(seats);
fuselage.append(wrapperRow);
}

return fuselage;
}


const createAirPlane = (title, tourData) => {
  const scheme = tourData.scheme
  const bookingSeat = getStorage(tourData.id).map(item=>item.seat);

  const choisesSeat = createElement("form", {
    className: "choises-seat",
  });
  const plane = createElement("fieldset", {
    className: "plane",
    name: "plane",
  });
  const cockpit = createCockpit(title);

  let n = 1;
  const elements = scheme.map((type) => {
    if (type === "exit") {
      return createExit();
    }
    if (typeof type === "number") {
      const Blockseat = createBlockSeat(n, type,bookingSeat);
      n = n + type;
      return Blockseat;
    }
  });

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);
  return choisesSeat;
};

const airplane = (main, data,tourData) => {
  const title = `Выберите ${declOfNum(data.length,['место','места','мест'])}`;
  const choiseForm =createAirPlane(title, tourData);

  checkSeat(choiseForm,data,tourData);

  main.append(choiseForm);
};

export default airplane;
