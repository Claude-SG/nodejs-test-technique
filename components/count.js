const RETURN_LINE = "\n";

class Count {


    /**
     * format the output of the count command
     * note : the result of JSON.stringify or util.inspect are not the output expected, so we need our own formatting function
     * @param {param} the result of count method, or a sub object of this result (this method is recursive)
     * @param {indent} the actuel indentation. Generally, the first call will be 0
     * @return the result of count command, with the good format
     */
    format(param, indent) {
        if(param === null)
            return '';
        if(Array.isArray(param)) {
            // array detected, we call our function for each element
            if(indent > 0)
                indent++;
            let results = param.map(elem => this.format(elem, indent+4)).join(","+RETURN_LINE+' '.repeat(indent+1));
            return (indent > 0 ? RETURN_LINE : '')+' '.repeat(indent)+"[" + results +" ]";
        }
        else if(typeof param === "object") {
            // object detected, loop on all keys and call our function for each value
            let props = Object.keys(param)
                .map(key => key+":"+this.format(param[key], indent))
                .join(","+RETURN_LINE+' '.repeat(indent));
                return ' { '+props+' }';
        }
        else {
            // simple value detected. We return escape char if detected
            return " '"+param.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')+"'";
        }
    }

    /**
     * count command : counts of People and Animals by counting the number of children and appending it in the name
     * @param {data} the list of elements
     * @return data with counts, in the good format
     */
    exec(data) {
        let result = JSON.parse(JSON.stringify(data));
        result.forEach(country => {
            const peopleCount = country.people.length;
            country.name += ' ['+peopleCount+']';

            country.people.forEach(person => {
                const animalCount = person.animals.length;
                person.name += ' ['+animalCount+']';
            });
        });

        if(result.length > 0)
            return result;
        else
            return null;
    }
}


module.exports = { Count };