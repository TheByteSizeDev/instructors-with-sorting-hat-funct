const team = [
  {
    id: 1,
    name: "Dr. T",
    email: "drt@drt.com",
    favoriteColor: "purple",
    likesIceCream: false,
    image:
      "https://avatars3.githubusercontent.com/u/29741570?s=460&u=16cc038bd4c459a12eb198fc313043cd37c80a64&v=4",
  },
  {
    id: 2,
    name: "Aja",
    email: "drt@drt.com",
    favoriteColor: "RED",
    likesIceCream: true,
    image:
      "https://avatars3.githubusercontent.com/u/57641436?s=400&u=1383b4d27114c6c7e3f05d55a4b4ac536971316a&v=4",
  },
  {
    id: 3,
    name: "Trinity",
    email: "drt@drt.com",
    favoriteColor: "blue",
    likesIceCream: true,
    image:
      "https://avatars1.githubusercontent.com/u/31781724?s=460&u=10531433afe0ed55948173fab061a75fc3ffa8c1&v=4",
  },
  {
    id: 4,
    name: "Jameka",
    email: "drt@drt.com",
    favoriteColor: "brown",
    likesIceCream: false,
    image: "https://avatars.githubusercontent.com/u/14102749?v=4",
  },
  {
    id: 5,
    name: "John",
    email: "drt@drt.com",
    favoriteColor: "blue",
    likesIceCream: false,
    image: "https://avatars.githubusercontent.com/u/18398407?v=4",
  },
  {
    id: 6,
    name: "April",
    email: "drt@drt.com",
    favoriteColor: "blue",
    likesIceCream: true,
    image: "https://avatars.githubusercontent.com/u/36495508?v=4",
  },
  {
    id: 7,
    name: "David",
    email: "drt@drt.com",
    favoriteColor: "blue",
    likesIceCream: true,
    image: "https://avatars.githubusercontent.com/u/46381236?v=4",
  },
];

// *** empty array for retired instructors ***
const retiredInstructors = [];

// ******************** //
// **** FUNCTIONS ***** //
// ******************** //

// Render to DOM utility function
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);

  selectedDiv.innerHTML = htmlToRender;
};

// get the instructor cards on the DOM
const cardsOnDom = (array) => {
  let domString = "";
  for (const member of array) {
    domString += `<div class="card" style="width: 18rem;">
    <img src="${member.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${member.name}</p>
    </div>
    <button id="retireButton--${member.id}" class="btn btn-primary">Retire</button>
  </div>`;
  }

  renderToDom("#app", domString);
  // add the event listener for the retire button! After you render!
  document.querySelector("#app").addEventListener("click", retireInstructor);
};

// get the RETIRED instructor cards on the DOM
// Same as above but for retired.
// Could be refactored to used the cardsOnDom function...
const retiredCardsOnDom = (array) => {
  let domString = "";
  for (const member of array) {
    domString += `<div class="card" style="width: 18rem;">
    <img src="${member.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${member.name}</p>
    </div>
  </div>`;
  }

  renderToDom("#retired", domString);
};

// Retire an instructor
const retireInstructor = (event) => {
  // if the id includes "retireButton"
  if (event.target.id.includes("retireButton")) {
    // get that object id off of our target ID
    const [, memberId] = event.target.id.split("--");
    // Use it to find the index of the object
    const memberIndex = team.findIndex(
      (member) => Number(memberId) === member.id
    );

    // splice that object out of the array
    const retiredInstructor = team.splice(memberIndex, 1);

    // push our instructor into the retiredInstructor array
    retiredInstructors.push(retiredInstructor);

    // Render both of our arrays! Retired and regular.
    retiredCardsOnDom(retiredInstructor);
    cardsOnDom(team);
  }
};

// function to filter teammates with specific favorite color
const filter = (array, colorString) => {
  const colorArray = [];

  // <---Another way of doing the color filter--->
  // array.forEach((item) => {
  //   if (item.favoriteColor === colorString) {
  //     colorArray.push(item);
  //   }
  // });

  for (const member of array) {
    if (member.favoriteColor === colorString) {
      colorArray.push(member);
    }
  }

  return colorArray;
};

// ******************** //
// ****** EVENTS ****** //
// ******************** //

// 1. Target both of the buttons on the DOM
const showAllButton = document.querySelector("#show-btn");
const showBlueButton = document.querySelector("#favorites");

// 2. Add click event to show all the instuctors on button click using the function we created above
showAllButton.addEventListener("click", () => {
  cardsOnDom(team);
});

// 3. Add click event to filter all the instructors whose favorite color is blue on button click
showBlueButton.addEventListener("click", () => {
  const blueTeamMembers = filter(team, "brown");
  cardsOnDom(blueTeamMembers);
});

// Function to show our form input
const showForm = () => {
  // create a dom string containing your form
  const domString =
    '<input id="nameForm" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"/><button id="submitButton" class="btn btn-primary" type="submit">Submit</button>';

  // Render that to the Dom
  renderToDom("#form", domString);

  // Add you event listener for your submit button
  // You HAVE to do this after you render it to DOM
  document
    .querySelector("#submitButton")
    .addEventListener("click", createRandomNewInstructor);
};

// Show that form with the function above ^^^^
document.querySelector("#addForm").addEventListener("click", showForm);

const createRandomNewInstructor = (event) => {
  event.preventDefault();

  // create a random number that is within the range of my team array
  const randNum = Math.floor(Math.random() * 6);

  // grab the random instructor using dot notation
  // Uses the random number as an index
  const randomInstructor = team[randNum];

  // Create new instructor object
  const newInstructor = {
    id: team.length + 2, // Next ID number
    name: document.querySelector("#nameForm").value,
    email: randomInstructor.email,
    favoriteColor: randomInstructor.favoriteColor,
    likesIceCream: randomInstructor.likesIceCream,
    image: randomInstructor.image,
  };

  // push it to the team and put it on the DOM
  team.push(newInstructor);
  cardsOnDom(team);
};

// <----Another way to createRandomNewInstructor---->
// const createRandomNewInstructor = (event) => {
//   event.preventDefault();
// const randNum = Math.floor(Math.random() * 6);

// // Same as the other but uses a for loop and the ID
// // Instead of using the random number as an index
// for (const instructor of team) {
//   if (randNum === instructor.id) {
//     const newInstructor = {
//       id: instructor.length + 1,
//       name: document.querySelector("#nameForm").value,
//       email: instructor.email,
//       favoriteColor: instructor.favoriteColor,
//       likesIceCream: instructor.likesIceCream,
//       image: instructor.image
//     };
//     team.push(newInstructor);
//   }
// }
//   cardsOnDom(team);
// };
