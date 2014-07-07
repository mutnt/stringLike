# StringLike

A string-like object to work more easily with strings in templates.
Inherits everything from [string.js](http://stringjs.com/), and sprinkles some other methods on top:

```
npm install stringlike
```

```js
var StringLike = require('stringlike');
var a = new StringLike('a string')
//or
var b = StringLike('a string') //you can skip the 'new'
```

### Methods


#### lineBreaksToHTML()

converts single line returns to <BR>s and more line returns to paragraphs

```js
	var text = 'This is an example text, and here is a line break \n'
		+ 'that should convert to a BR. Now, if I use two line breaks \n\n\n'
		+ 'this text should be wrapped in P\'s\n\n';
	var converted_text = '<p>This is an example text, and here is a line break <br>'
		+ 'that should convert to a BR. Now, if I use two line breaks </p><p>'
		+ 'this text should be wrapped in P\'s</p>';
	var str = new StringLike(text)
	console.log(str.linebreaksToHTML().s == converted_text);
```

#### safe([prefix])

converts strings to class names that are safe to use in html elements
if "prefix" is passed, it will be pre-pended to the string

### Functions

#### StringLike.convert(object,[limit],[recurse])

converts all strings inside an object to instances of StringLike.
Useful to convert a full "locals" object that you want to pass to your templates
The function does not handle cyclic references unless you pass an array to 'recurse'

* "limit" defaults to 10 nested objects, set it to -1 for infinite.
* "recurse" if an array is passed (or true), the function will handle recursion

```js
	var obj = {
		someProp:{
		someInsideProp:'a string'
		}
	,	someOtherProp:'a'
	}
	StringLike.convert(obj);
	console.log(
		(obj.someProp.someInsideProp.s === 'a string')
		&& (obj.someOtherProp.repeat(3).s === 'aaa')
	)
```