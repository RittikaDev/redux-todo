import { produce } from "immer";

const employee1 = {
	name: "John",
	age: 30,
	address: {
		city: "New York",
		country: "USA",
	},
};

const employee2 = employee1;
employee2.name = "Doe"; // ANY CHANGE HERE IS BASICALLY MUTATING THE ORIGINAL OBJECT

const employee3 = {
	// THIS CREATES A NEW OBJECT AND DOES NOT MUTATE THE ORIGINAL OBJECT
	...employee1,
	name: "Jane",
};

// BUT BELOW, WILL WORK LIKE employee2, MEANS, WILL MUTATE THE ORIGINAL OBJECT
employee3.address.city = "San Francisco"; // THIS SHOULD BE AVOIDED

console.log(employee3);
console.log(employee1);

// TO AVOID MUTATION IN NESTED OBJECTS DO BELOW
const employee4 = {
	// THIS CREATES A NEW OBJECT AND DOES NOT MUTATE THE ORIGINAL OBJECT
	...employee1,
	name: "Jane",
	address: {
		...employee1.address,
		city: "San Francisco",
	},
};

/**********************************
 *** IMMER ***
 **********************************/
// IMMER KEEPS A COPY OF THE ORIGINAL OBJECT AND DOES NOT MUTATE IT
const employee5 = produce(employee1, (draft) => {
	draft.name = "Jack";
	draft.address.city = "New York";
});

/**********************************
 *** CURRYING => FUNCTION CURRY ***
 **********************************/

const add = (a, b) => a + b; // NORMAL
const add1 = (a) => (b) => a + b; // CURRIED

console.log(add1(3)(4));
