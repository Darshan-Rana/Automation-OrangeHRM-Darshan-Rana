import { faker } from '@faker-js/faker';

/**
 * Utility to generate a randomized user object in memory
 * @returns {Object} A fresh user dataset
 */
export const createFakeUser = () => {
  
  // --- 1. Lock down the License Expiry Date Components ---
  const futureDate = faker.date.future();
  const futureYear = futureDate.getFullYear();
  const futureDay = String(futureDate.getDate()).padStart(2, '0');
  const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');

  // --- 2. Lock down the Date of Birth Components ---
  const dobDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
  const dobYear = dobDate.getFullYear();
  const dobDay = String(dobDate.getDate()).padStart(2, '0');
  const dobMonth = String(dobDate.getMonth() + 1).padStart(2, '0');

  return {
    // Generates valid names and truncates them to safely fall between 3 and 10 characters
    firstName: faker.person.firstName().substring(0, 10).padEnd(3, 'a'),
    MiddleName: faker.person.middleName().substring(0, 10).padEnd(3, 'a'),
    lastName: faker.person.lastName().substring(0, 10).padEnd(3, 'a'),
    
    EmployeeId: faker.string.alphanumeric({ length: 8, capitalization: 'upper' }),
    OtherId: faker.string.alphanumeric({ length: 10, capitalization: 'upper' }),
    DriversLicenseNumber: faker.string.alphanumeric({ length: 12, capitalization: 'upper' }),  
    TestInput : faker.string.alphanumeric({ length: 15, capitalization: 'upper' }),  // For testing long input handling
    Comments : faker.string.alpha({lenght : 8, capitalization: 'upper'}),


    // License Expiry Formats 
    licenseExpiryFormat1: `${futureYear}-${futureMonth}-${futureDay}`,     // For typing: YYYY-MM-DD
    licenseExpiryFormat2: `${futureYear}-${futureDay}-${futureMonth}`,   // For verifying post-save: YYYY-DD-MM
    licenseExpiryFormat3: `${futureDate}-${futureMonth}-${futureYear}`,
    
    Nationality: faker.helpers.arrayElement(['American', 'Canadian', 'British', 'Australian', 'Indian']),
    MaritalStatus: faker.helpers.arrayElement(['Single', 'Married', 'Other']),
    BloodType : faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    
    // Date of Birth Formats 
    dobType: `${dobYear}-${dobMonth}-${dobDay}`,                        // For typing: YYYY-MM-DD
    dobVerify: `${dobYear}-${dobDay}-${dobMonth}`,                      // For verifying post-save: YYYY-DD-MM
    
    Gender: faker.helpers.arrayElement(['Male', 'Female'])
  };
};