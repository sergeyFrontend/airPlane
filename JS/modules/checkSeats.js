import { setStorage, getStorage } from "../server/storage.js";

const checkSeat = (form, data,id) => {
  const bookingSeat = getStorage(id).map(item=>item.seat);
  form.addEventListener("change", () => {
    const formData = new FormData(form);
    const checked = [...formData].map(([, value]) => value);

    if (checked.length === data.length) {
      [...form].forEach((item) => {
        if (item.checked === false && item.name === "seat") {
          item.disabled = true;
        }
      });
    }
    else{
      [...form].forEach((item) => {
        if(!bookingSeat.includes(item.value)){
          item.disabled = false;
        }
      })
    }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const booking = [...formData].map(([, value]) => value);

    for (let i = 0; i < data.length; i++) {
      data[i].seat = booking[i];
    }
    setStorage(id,data)

    form.remove();

    document.body.innerHTML=`
     <h1 class="title">Спасибо,удачного полета</h1>
     <h2 class="title">${booking.length === 1 ?`Ваше место ${booking}`:`Ваши места ${booking}`}</h2>
     `
  });
})}

export default checkSeat;
