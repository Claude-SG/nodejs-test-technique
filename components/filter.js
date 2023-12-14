const RETURN_LINE = "\n";

class Filter {

	/**
	 * format the result of the command filter
	 * note : the result of JSON.stringify or util.inspect are not the output expected, so we need our own formatting function
	 * @param {param} the result of filter method, or a sub object of this result (this method is recursive)
	 * @return the result of filter command, with the good format
	 */
	format(param, indent) {
		if(param === null)
			return '';
		if(Array.isArray(param)) {
	    	// array detected, we call our function for each element
	        let results = param.map(elem => this.format(elem, indent+2)).join(","+RETURN_LINE);
	        return "["+ RETURN_LINE + results + RETURN_LINE +' '.repeat(indent)+"]";
	    }
	    else if(typeof param === "object") {
	    	// object detected, loop on all keys and call our function for each value
	        let props = Object.keys(param)
	            .map(key => ' '.repeat(indent+2)+key+": "+this.format(param[key], indent+2))
	            .join(","+RETURN_LINE);
	            return ' '.repeat(indent)+'{'+RETURN_LINE+props+RETURN_LINE+' '.repeat(indent)+'}';
	    }
	    else {
	    	// simple value detected. We return escape char if detected
	        return "'"+param.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')+"'";
	    }
	}

	/**
	 * filter command : filter a list of elements containing a pattern
	 * @param {data} the list of elements
	 * @param {filterValue} the pattern that we want to apply
	 * @return data filtered, with the good format
	 */
	exec(data, filterValue) {
		const result = data.reduce((acc, country) => {
			const filteredPeople = country.people.reduce((filtered, person) => {
				const animalFiltered = person.animals.filter(animal => animal.name.toLowerCase().includes(filterValue));
				if(animalFiltered.length > 0) {
					filtered.push({
						...person, animals : animalFiltered
					});
				}
				return filtered;
			},[]);
			if(filteredPeople.length > 0) {
				acc.push({...country, people: filteredPeople});
			}
			return acc;
		},[]);

		if(result.length > 0)
            return result;
        else
            return null;
	}
}

module.exports = { Filter };