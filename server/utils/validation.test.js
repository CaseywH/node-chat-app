const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it('should reject non string values', () => {
    var nonString = 123;
    var newString = isRealString(nonString);
    expect(newString).toBe(false);
  })
  it('should reject strings with only spaces', () => {
    var spaceString = '     ';
    var newString = isRealString(spaceString);
    expect(newString).toBe(false);
  })
  it('should allow strings with non space characters', () => {
    var realString = ' real string    ';
    var newString = isRealString(realString);
    expect(newString).toBe(true);
  })
})
  // should reject non strin values should get false

  //should reject strings with only spaces

  //should allow strings with non space characters any string should pass
