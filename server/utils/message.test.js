const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');


describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Bill';
    const text = 'this is a message from Bill';
    const newMessage = generateMessage(from, text);
    // assert from matches value passed in
    expect(newMessage.from).toBe(from);
    // assert text matches
    expect(newMessage.text).toBe(text);
    // assert createdAt value is a number toBeA()
    expect(newMessage.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('shoud generate correct location object', () => {
    const from = 'Admin';
    const longitude = 1;
    const latitude = 2;
    const url = 'https://www.google.com/maps?q=2,1';
    const newLocationMessage = generateLocationMessage(from, latitude, longitude);
    // from is correct
    expect(newLocationMessage).toInclude({ from, url });
    // createdAt is a number
    expect(newLocationMessage.createdAt).toBeA('number');
    // url property is what it should be
  });
});
