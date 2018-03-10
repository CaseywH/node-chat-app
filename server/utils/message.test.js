const expect = require('expect');

var {generateMessage} = require('./message');


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