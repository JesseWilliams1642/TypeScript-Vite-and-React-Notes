/*

Chapters 10 to 11 of:
"Typescript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours",
by Dave Gray
https://www.youtube.com/watch?v=gieEQFIfgYc&ab_channel=DaveGray

Made by doing the command:
npm create vite@latest,
and choosing Vanilla + Typescript

Vite is good because it has
  1. Fast server load times
  2. Uses Hot Module Replacement (HMR), which will present any changes you make in your code
     without a full reset of the application (great for web design!)
  3. Sets up the local development environment fast
  4. Uses Rollup, a module bundler, to optimise static assets for production and deployment

*/

import "./css/style.css"
import FullList from "./model/FullList"
import ListItem from "./model/ListItem"
import ListTemplate from "./templates/ListTemplate"

const initApp = (): void => {

  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
  
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {

    event.preventDefault();   // Stops it from reloading the page (done by default)

    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();    // Removes white-space

    if (!newEntryText) return;

    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length-1].id) + 1 : 1;
    const newItem = new ListItem(itemId.toString(), newEntryText);

    fullList.addItem(newItem);
    template.render(fullList);

  }); 

  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;

  clearItems.addEventListener('click', (): void => {

    fullList.clearList();
    template.clear();

  });

  fullList.load();
  template.render(fullList);

}

document.addEventListener("DOMContentLoaded", initApp); // Makes sure the DOM content is loaded before 
                                                        // you can interact with them (less confusion)











