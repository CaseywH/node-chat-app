const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Bill';
    var text = 'this is a message from Bill'
    var newMessage = generateMessage(from, text);
    // assert from matches value passed in
    expect(newMessage.from).toBe(from);
    // assert text matches
    expect(newMessage.text).toBe(text);
    // assert createdAt value is a number toBeA()
    expect(newMessage.createdAt).toBeA('number');
  })
})

describe('generateLocationMessage', () => {
  it('shoud generate correct location object', () => {
    var from  = 'Admin';
    var longitude = 1;
    var latitude = 2
    var url = 'https://www.google.com/maps?q=2,1'
    var newLocationMessage = generateLocationMessage(from, latitude, longitude);
    //from is correct
    expect(newLocationMessage).toInclude({from, url});
    //createdAt is a number
    expect(newLocationMessage.createdAt).toBeA('number');
    //url property is what it should be
  })
})
