const moment = require('moment');
const now = moment();

// now.subtract(1, 'year');
// console.log(now.format());

// console.log(now.format('MMM Do YYYY, h:mma'));
// console.log(now.format('X'));
// console.log(now.format('x'));
// console.log(now.valueOf());

const timestamp = 1517704618104;
const timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mma'));

