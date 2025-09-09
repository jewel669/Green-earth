1. var, let, const

var - function scope, can re-declare & re-assign, hoisted.

let - block scope, can re-assign but not re-declare.

const - block scope, cannot re-declare or re-assign (fixed value).

2. map(), forEach(), filter()

forEach() - just loops, returns undefined.

map() - returns a new array (transformed values).

filter() - returns a new array (only values that match condition).

3. Arrow Functions

Short syntax (()=>{}).

No own this - takes lexical this.

Cannot be used as a constructor.

4. Destructuring

Easy way to extract values from arrays/objects.

Example:

const [a, b] = [10, 20];
const {name, age} = {name: "Jewel", age: 19};

5. Template Literals

Written with backticks (`).

Supports ${expression} inside strings.

Allows multi-line strings easily.

Cleaner and more readable than concatenation.
