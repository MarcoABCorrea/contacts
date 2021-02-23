import axios from "axios";
import accordion from "../accordion-item.html";
import "../styles/index.scss";
import { setupAccordion } from "./accordion.js";

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}

const url = process.env.BASE_PATH;

const getContacts = () => {
  axios.get(url).then((response) => {
    const data = response?.data?.results;
    if (data && data.length > 0) {
      let container = document.getElementsByClassName("p-accordion__list")[0];
      data.map((value) => {
        container.innerHTML += setContactData(accordion, value);
      });

      let accordions = document.querySelectorAll(".p-accordion")[0];
      setupAccordion(accordions);
    }
  });
};

const setContactData = (target, data) => {
  const BUTTON_TEXT_KEY = "$BUTTON_TEXT";
  const USER_PICTURE_KEY = "$USER_PICTURE";
  const FULL_NAME_KEY = "$FULL_NAME";
  const ADDRESS_KEY = "$ADDRESS";
  const GOOGLE_MAP_LINK_KEY = "$GOOGLE_MAP_LINK";
  const EMAIL_KEY = "$EMAIL";
  const CELL_NUMBER_KEY = "$CELL_NUMBER";

  const address =
    data.location.street.number +
    " " +
    data.location.street.name +
    ", " +
    data.location.city +
    ", " +
    data.location.state +
    ", " +
    data.location.country;

  const name = data.name.first + " " + data.name.last;
  const title = data.name.title + " " + data.name.last + " - " + data.email;

  const search = "https://www.google.de/maps/search/" + address;

  return target
    .replaceAll(BUTTON_TEXT_KEY, title)
    .replaceAll(USER_PICTURE_KEY, data.picture.medium)
    .replaceAll(FULL_NAME_KEY, name)
    .replaceAll(ADDRESS_KEY, address)
    .replaceAll(GOOGLE_MAP_LINK_KEY, search)
    .replaceAll(EMAIL_KEY, data.email)
    .replaceAll(CELL_NUMBER_KEY, data.cell);
};

getContacts();
