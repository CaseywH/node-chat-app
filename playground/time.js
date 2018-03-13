const moment = require('moment');


//
// var date = new Date();
//
// console.log(date.getMonth());

// var date = moment();
// date.add(100, 'year').subtract(9, 'months')
// console.log(date.format('MMM Do, YYYY'));

//10:35 am upadded for hours padded for min
var createdAt = 1234
var date = moment(createdAt)
console.log(date.format('h:mm a'));

var sometTimeStamp = moment().valueOf();
console.log(sometTimeStamp);
