Interpose.js
============

Interpose.js is a Javascript template engine.

Benefits
--------

### It's Small

I mean its tiny. At the time of writing, it weighs in at only 647 bytes when 
minified. A templating engine should not only make your code easier to write
and maintain, but make it small. If you're developing for mobile devices and
using a template engine thats 3KB or 4KB, then unless you have dozens of 
templates, you might as well not bother with templates at all.

### It's Fast

Interpose.js compiles your templates into JavaScript functions that you can
reuse without having to parse the template over and over.

```javascript
var template = interpose.init()('<li><?js= this.pet ?></li>');
template.apply({ pet : 'Dog'});
template.apply({ pet : 'Cat'});
```

### It's Flexible

If you don't like the default delimiters Interpose.js uses, then you can
override them. To use the common handlebar or moustache delimiters:

```javascript
var compile = interpose.init('{{','}}');
var template = compile('<li><{{= this.pet }}</li>');
template.apply({ pet : 'Dog'});
template.apply({ pet : 'Cat'});
```

### It's Easy

Templates for Interpose.js are JavaScript. That means you already know how
to write them, without having to learn yet another language.

```javascript
var compile = interpose.init('<%','%>');
var template = compile('<%for (var i = )%><li><%=this[i].pet%> go "<%=this[i].sound%>"</li><%}%>');
template.apply([{ pet : 'Dogs', sound : 'Woof'}, { pet : 'Cats', sound : 'Meow'}]);
```

### It's Safe

Output is HTML encoded by default. So you don't have to worry about malicous 
user input and security. You can circumvent this feature if you want to inject
HTML into a template (to place the output of one template in another template
for example):

```javascript
var compile = interpose.init();
console.log(compile('<?js= this ?>').apply('"><script>alert("XSS Hacked!");'));
console.log(compile('<?js print(this) ?>').apply('"><script>alert("XSS Hacked!");'));
console.log(compile('<?js echo(this) ?>').apply('"><script>alert("XSS Hacked!");'));

```
&quot;&gt&lt;script&gtalert(&quot;XSS Hacked!&quot;);
&quot;&gt&lt;script&gtalert(&quot;XSS Hacked!&quot;);
"><script>alert("XSS Hacked!"); 
```