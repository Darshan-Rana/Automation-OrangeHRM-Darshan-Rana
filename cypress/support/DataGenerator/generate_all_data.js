// A master script to generate data for all files

console.log('Starting data generation...');

// Call each individual generator script
require('./generatefakeBaggingLocation.js');
require('./generatefakeIncompletelocation.js');
require('./generatefakeShelfLocation.js');
require('./generatefakeUser.js');
require('./generateproductControldata.js');

console.log('All data generation scripts have been executed.');