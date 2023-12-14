const { describe, it } = require('node:test');
const assert = require('node:assert').strict;

const { Filter } = require('./filter.js');

const filter_exec_test1_data = [{
  name: 'Dillauti',
  people:
    [{
      name: 'Winifred Graham',
      animals:
        [{name: 'Anoa'},
          {name: 'Duck'},
          {name: 'Narwhal'},
          {name: 'Badger'},
          {name: 'Cobra'},
          {name: 'Crow'}]
    },
      {
        name: 'Blanche Viciani',
        animals:
          [{name: 'Barbet'},
            {name: 'Rhea'},
            {name: 'Snakes'},
            {name: 'Antelope'},
            {name: 'Echidna'},
            {name: 'Crow'},
            {name: 'Guinea Fowl'},
            {name: 'Deer Mouse'}]
      }]
},
  {
    name: 'Tohabdal',
    people:
      [{
        name: 'Effie Houghton',
        animals:
          [{name: 'Zebra'},
            {name: 'Ring-tailed Lemur'},
            {name: 'Fly'},
            {name: 'Blue Iguana'},
            {name: 'Emu'},
            {name: 'African Wild Ass'},
            {name: 'Numbat'}]
      }]
  }
];

const filter_exec_test1_result = [
  {
    "name": "Dillauti",
    "people": [
      {
        "name": "Winifred Graham",
        "animals": [
          {
            "name": "Crow"
          }
        ]
      },
      {
        "name": "Blanche Viciani",
        "animals": [
          {
            "name": "Crow"
          },
          {
            "name": "Guinea Fowl"
          }
        ]
      }
    ]
  }
];

const filter_exec_test2_data = [{
    name: 'Dillauti',
    people:
      [{
        name: 'Winifred Graham',
        animals:
          [{name: 'Anoa'},
            {name: 'Duck'},
            {name: 'Narwhal'},
            {name: 'Badger'},
            {name: 'Cobra'},
            {name: 'Crow'}]
      },
        {
          name: 'Blanche Viciani',
          animals:
            [{name: 'Barbet'},
              {name: 'Rhea'},
              {name: 'Snakes'},
              {name: 'Antelope'},
              {name: 'Echidna'},
              {name: 'Crow'},
              {name: 'Guinea Fowl'},
              {name: 'Deer Mouse'}]
        }]
  }
];

const filter_exec_test2_result = null;

const filter_exec_test3_data = [{
    name: 'Dillauti',
    people:
      [{
        name: 'Winifred Graham',
        animals:
          [{name: 'Anoa'},
            {name: 'Duck'},
            {name: 'Narwhal'},
            {name: 'Badger'},
            {name: 'Cobra'},
            {name: 'Crow'}]
      },
        {
          name: 'Blanche Viciani',
          animals:
            [{name: 'Barbet'},
              {name: 'Rhea'},
              {name: 'Snakes'},
              {name: 'Antelope'},
              {name: 'Echidna'},
              {name: 'Henkel\'s Leaf-tailed Gecko'},
              {name: 'Guinea Fowl'},
              {name: 'Deer Mouse'}]
        }]
  }
];

const filter_exec_test3_result = [
  {
    "name": "Dillauti",
    "people": [
      {
        "name": "Blanche Viciani",
        "animals": [
          {
            "name": "Henkel's Leaf-tailed Gecko"
          }
        ]
      }
    ]
  }
];

const filter_format_test1_data = [
  {
    "name": "Dillauti",
    "people": [
      {
        "name": "Winifred Graham",
        "animals": [
          {
            "name": "Crow"
          }
        ]
      },
      {
        "name": "Blanche Viciani",
        "animals": [
          {
            "name": "Crow"
          },
          {
            "name": "Guinea Fowl"
          }
        ]
      }
    ]
  }
];

const filter_format_test1_result = `[
  {
    name: 'Dillauti',
    people: [
      {
        name: 'Winifred Graham',
        animals: [
          {
            name: 'Crow'
          }
        ]
      },
      {
        name: 'Blanche Viciani',
        animals: [
          {
            name: 'Crow'
          },
          {
            name: 'Guinea Fowl'
          }
        ]
      }
    ]
  }
]`;

const filter_format_test2_data = null;
const filter_format_test2_result = '';

const filter_format_test3_data = [
  {
    "name": "Dillauti",
    "people": [
      {
        "name": "Blanche Viciani",
        "animals": [
          {
            "name": "Cr'ow"
          }
        ]
      }
    ]
  }
];

const filter_format_test3_result = `[
  {
    name: 'Dillauti',
    people: [
      {
        name: 'Blanche Viciani',
        animals: [
          {
            name: 'Cr\\\'ow'
          }
        ]
      }
    ]
  }
]`;


const filter = new Filter();

describe('Tests for the filter class', function() {

  describe('Tests for the filter.exec method', function() {

    it('With "ow" in input, expect a result filtered with 3 animals', () => {
      const result = filter.exec(filter_exec_test1_data, 'ow');
  		assert.deepStrictEqual(result, filter_exec_test1_result);
  	});

  	it('With "twix" in input, expect a null result', () => {
      const result = filter.exec(filter_exec_test2_data, 'twix');
      assert.deepStrictEqual(result, filter_exec_test2_result);
  	});

  	it('With "l\'s" in input, expect a result with special char', () => {
      const result = filter.exec(filter_exec_test3_data, 'l\'s');
      assert.deepStrictEqual(result, filter_exec_test3_result);
  	});
  });

  describe('Tests for the filter.format method', function() {

    it('With multiple animals and people, expect a result with the good indentation, return line and format', () => {
      const formatter = filter.format(filter_format_test1_data,0);
      assert.strictEqual(formatter, filter_format_test1_result);
    });

    it('With null in input, expect an empty string', () => {
      const formatter = filter.format(filter_format_test2_data,0);
      assert.strictEqual(formatter, filter_format_test2_result);
    });

    it('With special char in input, expect a result with special char and the good indentation, return line and format', () => {
      const formatter = filter.format(filter_format_test3_data,0);
      assert.strictEqual(formatter, filter_format_test3_result);
    });
  });
});