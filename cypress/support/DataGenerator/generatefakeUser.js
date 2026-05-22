const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");
 
// Define possible user statuses
const statuses = ["Active", "Inactive", "Deceased"];
 
// Define titles for users
const salutations = ["Mr", "Ms", "Mrs"];
 
// Object to store all generated users
const usersById = {};
 
// --- Generate 3 users for 'Add' functions ---
for (let i = 0; i < 3; i++) {
  // Cycle through statuses for variety
  const status = statuses[i % statuses.length];
 
  // Generate a past date for Date of Birth (DOB)
const pastDate = faker.date.past({ years: 30 });
 
  // Format DOB as DD-MM-YYYY
  const dob = `${String(pastDate.getDate()).padStart(2, "0")}-${String(
    pastDate.getMonth() + 1
  ).padStart(2, "0")}-${pastDate.getFullYear()}`;
 
  // Create a unique key for the 'add' user, incorporating the status
  const userKey = `Add${status}User`;
 
  // Generate fake user data
  const fakeUser = {
    // Assign a random salutation (Mr, Ms, Mrs) as the title
    title: faker.helpers.arrayElement(salutations),
    name: faker.person.firstName(8),
    status: status,
    dob: dob,
    address: faker.location.streetAddress(),
    postcode: faker.string.numeric(6),
    mobile: faker.string.numeric(10),
email: faker.internet.email(),
    // Explicitly mark this user for 'add' operations
    type: "add",
  };
  usersById[userKey] = fakeUser;
}
 
// --- Generate 3 users for 'Edit' functions ---
for (let i = 0; i < 3; i++) {
  // Cycle through statuses for variety
  const status = statuses[i % statuses.length];
 
  // Generate a past date for Date of Birth (DOB)
const pastDate = faker.date.past({ years: 30 });
 
  // Format DOB as DD-MM-YYYY
  const dob = `${String(pastDate.getDate()).padStart(2, "0")}-${String(
    pastDate.getMonth() + 1
  ).padStart(2, "0")}-${pastDate.getFullYear()}`;
 
  // Create a unique key for the 'edit' user, incorporating the status
  const userKey = `Edit${status}User`;
 
  // Generate fake user data
  const fakeUser = {
    // Assign a random salutation (Mr, Ms, Mrs) as the title
    title: faker.helpers.arrayElement(salutations),
    name: faker.person.firstName(8),
    status: status,
    dob: dob,
    address: faker.location.streetAddress(),
    postcode: faker.string.numeric(6),
    mobile: faker.string.numeric(10),
email: faker.internet.email(),
    // Explicitly mark this user for 'edit' operations
    type: "edit",
  };
  usersById[userKey] = fakeUser;
}
const limitTestUserKey = "LimitTestUser";

const currentYear = new Date().getFullYear(); // Gets the current year (e.g., 2025)
const maxBirthYear = currentYear - 300; // e.g., 1725 for currentYear 2025
const minBirthYear = currentYear - 350; // e.g., 1675 for currentYear 2025

// Create Date objects for the 'from' and 'to' parameters
const fromDate = new Date(minBirthYear, 0, 1); // January 1st of the minBirthYear
const toDate = new Date(maxBirthYear, 0, 1);   // January 1st of the maxBirthYear

// Generate a date between these two points
const pastDateLimit = faker.date.between({ from: fromDate, to: toDate });
const dobLimit = `${String(pastDateLimit.getDate()).padStart(2, "0")}-${String(
  pastDateLimit.getMonth() + 1
).padStart(2, "0")}-${pastDateLimit.getFullYear()}`; // Format DOB as DD-MM-YYYY (10 chars)

const limitTestUser = {
  title: faker.helpers.arrayElement(salutations),
  name: faker.string.alpha(100), // 100 character limit
  status: faker.helpers.arrayElement(statuses),
  dob: dobLimit, // This will now correctly reflect a DOB that makes the user 300+ years old
  address: faker.string.alpha(201), // Address more than 200 chars (set to 201)
  postcode: "A!2#4$", // Special Char in Post Code
  mobile: faker.string.numeric(1), // 1 digit for Mobile No
  email: "!@#$%%", // Invalid Email address "!@#$%%"
  type: "limit_test", // Explicitly mark this user for limit testing
};
usersById[limitTestUserKey] = limitTestUser;

// --- Path Correction ---
// Use process.cwd() to get the project root (C:\CYPRESSAUTOMATIONTESTING\CYPRESS)
// and then build the relative path to your desired fixture directory.
const fixtureDir = path.join(
  process.cwd(), // This should resolve to C:\CYPRESSAUTOMATIONTESTING\CYPRESS
  "cypress",
  "fixtures",
  "PBP Cascade V2",
  "CustomerControl"
);
 
// Ensure the directory structure exists for the fixture file
fs.mkdirSync(fixtureDir, { recursive: true });
 
// Define the full path for the output JSON file
const filePath = path.join(fixtureDir, "fakeUser.json");
 
// Write the generated user data to the JSON file, formatted for readability
fs.writeFileSync(filePath, JSON.stringify(usersById, null, 2));
 
console.log(`✅ Successfully generated and saved fake users to ${filePath}`);
console.log(usersById); // Log the generated users to the console for verification