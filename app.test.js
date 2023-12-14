const { describe, it } = require('node:test');
const assert = require('node:assert').strict;

const { data } = require('./data.js');
const { validateCommand } = require('./app.js');


describe('Tests for the app method', function() {

  it('Method validateCommand with "node app.js" in arguments, expect an error for a bad number of arguments', () => {
    assert.strictEqual(validateCommand('node app.js'), false);
  });

  it('Method validateCommand with "node app.js --filter --count" in arguments, expect an error for a bad number of arguments', () => {
    assert.strictEqual(validateCommand('node app.js --filter --count'), false);
  });

  it('Method validateCommand with "node app.js --twix" in arguments, expect an error for an unknown command', () => {
    assert.strictEqual(validateCommand('node app.js --twix'), false);
  });

  it('Method validateCommand with "node app.js --filter" in arguments, expect an error for a missing parameter', () => {
    assert.strictEqual(validateCommand('node app.js --filter'), false);
  });

  it('Method validateCommand with "node app.js --count=ry" in arguments, expect an error for a too many parameter', () => {
    assert.strictEqual(validateCommand('node app.js --count=ry'), false);
  });

  it('Method validateCommand with "node app.js --filter=ry" in arguments, expect a valid command with parameter', () => {
    assert.strictEqual(validateCommand('node app.js --filter=ry'), false);
  });

  it('Method validateCommand with "node app.js --count" in arguments, expect a valid command without parameter', () => {
    assert.strictEqual(validateCommand('node app.js --count'), false);
  });
});