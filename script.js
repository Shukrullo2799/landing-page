const dropdowns = document.querySelectorAll(".dropdown");
const main_text = document.querySelector(".main_text");
const sub_text = document.querySelector(".sub_text");
const btn_text = document.querySelector(".btn_text");
const contact_link = document.querySelector(".contact_link");
let id = 1;
class Service {
  getData() {
    return fetch("/json/data.json")
      .then((response) => response.json())
      .then((d) => d.data);
  }
}
const service = new Service();

dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-cliced");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option, index) => {
    option.addEventListener("click", () => {
      selected.innerHTML = option.innerHTML;
      select.classList.remove("select-cliced");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");

      id = index + 1;
      getPhrase();
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});

const getPhrase = () => {
  service.getData().then((res) => {
    let data = res.find((item) => item.id == id);
    main_text.innerHTML = data.main_text;
    sub_text.innerHTML = data.sub_text;
    btn_text.innerHTML = data.btn_text;
    contact_link.innerHTML = data.contact;
  });
};
