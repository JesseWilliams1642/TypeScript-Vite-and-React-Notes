
//const year: HTMLElement | null = document.getElementById("year")!;      // My solution
const year = document.getElementById("year") as HTMLSpanElement;

const thisYear: string = new Date().getFullYear().toString();

year.setAttribute("datetime", thisYear);
year.textContent = thisYear;