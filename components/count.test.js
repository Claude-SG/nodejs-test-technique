const { describe, it } = require('node:test');
const assert = require('node:assert').strict;

const { Count } = require('./count.js');

const count_exec_test1_data = [{
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


const count_exec_test1_result = [
  {
    "name": "Dillauti [2]",
    "people": [
      {
        "name": "Winifred Graham [6]",
        "animals": [
          {
            "name": "Anoa"
          },
          {
            "name": "Duck"
          },
          {
            "name": "Narwhal"
          },
          {
            "name": "Badger"
          },
          {
            "name": "Cobra"
          },
          {
            "name": "Crow"
          }
        ]
      },
      {
        "name": "Blanche Viciani [8]",
        "animals": [
          {
            "name": "Barbet"
          },
          {
            "name": "Rhea"
          },
          {
            "name": "Snakes"
          },
          {
            "name": "Antelope"
          },
          {
            "name": "Echidna"
          },
          {
            "name": "Crow"
          },
          {
            "name": "Guinea Fowl"
          },
          {
            "name": "Deer Mouse"
          }
        ]
      }
    ]
  },
  {
    "name": "Tohabdal [1]",
    "people": [
      {
        "name": "Effie Houghton [7]",
        "animals": [
          {
            "name": "Zebra"
          },
          {
            "name": "Ring-tailed Lemur"
          },
          {
            "name": "Fly"
          },
          {
            "name": "Blue Iguana"
          },
          {
            "name": "Emu"
          },
          {
            "name": "African Wild Ass"
          },
          {
            "name": "Numbat"
          }
        ]
      }
    ]
  }
]

const count_exec_test2_data = [
  {
    "name": "Uzuzozne",
    "people": [
      {
        "name": "Lillie Abbott",
        "animals": [
          {
            "name": "John Dory"
          }
        ]
      }
    ]
  },
  {
    "name": "Satanwi",
    "people": [
      {
        "name": "Anthony Bruno",
        "animals": [
          {
            "name": "Oryx"
          }
        ]
      }
    ]
  }
];

const count_exec_test2_result = [
  {
    "name": "Uzuzozne [1]",
    "people": [
      {
        "name": "Lillie Abbott [1]",
        "animals": [
          {
            "name": "John Dory"
          }
        ]
      }
    ]
  },
  {
    "name": "Satanwi [1]",
    "people": [
      {
        "name": "Anthony Bruno [1]",
        "animals": [
          {
            "name": "Oryx"
          }
        ]
      }
    ]
  }
]

const count_exec_test3_data = [];
const count_exec_test3_result = null;

const count_format_test1_data = [
  {
    "name": "Dillauti [2]",
    "people": [
      {
        "name": "Winifred Graham [6]",
        "animals": [
          {
            "name": "Anoa"
          },
          {
            "name": "Duck"
          },
          {
            "name": "Narwhal"
          },
          {
            "name": "Badger"
          },
          {
            "name": "Cobra"
          },
          {
            "name": "Crow"
          }
        ]
      },
      {
        "name": "Blanche Viciani [8]",
        "animals": [
          {
            "name": "Barbet"
          },
          {
            "name": "Rhea"
          },
          {
            "name": "Snakes"
          },
          {
            "name": "Antelope"
          },
          {
            "name": "Echidna"
          },
          {
            "name": "Crow"
          },
          {
            "name": "Guinea Fowl"
          },
          {
            "name": "Deer Mouse"
          }
        ]
      }
    ]
  },
  {
    "name": "Tohabdal [1]",
    "people": [
      {
        "name": "Effie Houghton [7]",
        "animals": [
          {
            "name": "Zebra"
          },
          {
            "name": "Ring-tailed Lemur"
          },
          {
            "name": "Fly"
          },
          {
            "name": "Blue Iguana"
          },
          {
            "name": "Emu"
          },
          {
            "name": "African Wild Ass"
          },
          {
            "name": "Numbat"
          }
        ]
      }
    ]
  }
]

const count_format_test1_result = `[ { name: 'Dillauti [2]',
    people:
     [ { name: 'Winifred Graham [6]',
         animals:
          [ { name: 'Anoa' },
            { name: 'Duck' },
            { name: 'Narwhal' },
            { name: 'Badger' },
            { name: 'Cobra' },
            { name: 'Crow' } ] },
       { name: 'Blanche Viciani [8]',
         animals:
          [ { name: 'Barbet' },
            { name: 'Rhea' },
            { name: 'Snakes' },
            { name: 'Antelope' },
            { name: 'Echidna' },
            { name: 'Crow' },
            { name: 'Guinea Fowl' },
            { name: 'Deer Mouse' } ] } ] },
  { name: 'Tohabdal [1]',
    people:
     [ { name: 'Effie Houghton [7]',
         animals:
          [ { name: 'Zebra' },
            { name: 'Ring-tailed Lemur' },
            { name: 'Fly' },
            { name: 'Blue Iguana' },
            { name: 'Emu' },
            { name: 'African Wild Ass' },
            { name: 'Numbat' } ] } ] } ]`;

const count_format_test2_data = [
  {
    "name": "Uzuzozne [1]",
    "people": [
      {
        "name": "Lillie Abbott [1]",
        "animals": [
          {
            "name": "John Dory"
          }
        ]
      }
    ]
  },
  {
    "name": "Satanwi [1]",
    "people": [
      {
        "name": "Anthony Bruno [1]",
        "animals": [
          {
            "name": "Oryx"
          }
        ]
      }
    ]
  }
];

const count_format_test2_result = `[ { name: 'Uzuzozne [1]',
    people:
     [ { name: 'Lillie Abbott [1]',
         animals:
          [ { name: 'John Dory' } ] } ] },
  { name: 'Satanwi [1]',
    people:
     [ { name: 'Anthony Bruno [1]',
         animals:
          [ { name: 'Oryx' } ] } ] } ]`;

const count_format_test3_data = null;
const count_format_test3_result = '';


const count = new Count();

describe('Tests for the count class', function() {

	describe('Tests for the count.exec method', function() {

		it('With multiple animals and peoples. Expect a result with the count of peoples and animals ', () => {
			const result = count.exec(count_exec_test1_data);
			assert.deepStrictEqual(result, count_exec_test1_result);
		});

		it('With single animals and peoples. Expect a result with the count of peoples and animals ', () => {
			const result = count.exec(count_exec_test2_data);
			assert.deepStrictEqual(result, count_exec_test2_result);
		});

		it('With an empty object. Expect a null result ', () => {
			const result = count.exec(count_exec_test3_data);
			assert.deepStrictEqual(result, count_exec_test3_result);
		});
	});

	describe('Tests for the count.format method', function() {

		it('With multiple animals and peoples. Expect a result with the good indentation, return line and format ', () => {
			const formatter = count.format(count_format_test1_data,0);
			assert.strictEqual(formatter, count_format_test1_result);
		});

		it('With single animals and peoples. Expect a result with the good indentation, return line and format', () => {
			const formatter = count.format(count_format_test2_data,0);
			assert.strictEqual(formatter, count_format_test2_result);
		});

		it('With an empty object. Expect an empty string', () => {
			const formatter = count.format(count_format_test3_data,0);
			assert.strictEqual(formatter, count_format_test3_result);
		});
	});
});