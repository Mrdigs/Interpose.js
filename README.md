Interpose.js
============

Interpose.js is a Javascript template engine.

Benefits
--------

### It's Small

I mean its tiny. At the time of writing, it weighs in at only 647 bytes when 
minified. A template engine should not only make your code easier to write
and maintain, but make it smaller. 

If you're developing for mobile devices and using a template engine thats 3KB 
or 4KB, then unless you have dozens of templates, the extra code needed to 
be download by the client can easily outweigh the savings made by using templates 
in the first place so you might as well not bother with templates at all.

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
var template = compile('<li>{{= this.pet }}</li>');
template.apply({ pet : 'Dog'});
template.apply({ pet : 'Cat'});
```
Because the <code>init()</code> function returns a function, you can easily
create different processors for different templates with different delimiters:

```javascript
var processor1 = interpose.init('{{','}}');
var processor2 = interpose.init('**','**');

var template1 = processor1('<li>{{= this.pet }}</li>');
var template2 = processor2('<li>**= this.pet **</li>');

var model = { pet : 'Dog'};
template1.apply(model);
template2.apply(model);
```

### It's Easy

Templates for Interpose.js are JavaScript. That means you already know how
to write them. I know other templating engine projects cite *not* having to
put JavaScript in your templates as a positive. Call me lazy, but personally 
I don't want to have to learn yet another syntax to use templates. 

Interpose.js templates are easy for any JavaScript developer to instantly 
understand, write, and debug.

```javascript
var compile = interpose.init('<%','%>');
var template = compile('<%for (var i = 0; i<this.length; i++) {%><li><%=this[i].pet%> go "<%=this[i].sound%>"</li><%}%>');
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

```
&quot;&gt&lt;script&gtalert(&quot;XSS Hacked!&quot;);
&quot;&gt&lt;script&gtalert(&quot;XSS Hacked!&quot;);
"><script>alert("XSS Hacked!"); 
```

Credits
-------

My thanks to Krasimir Tsonev (and by extension John Resig), who's article 
[JavaScript template engine in just 20 lines](http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line)
inspired me to write Interpose.js.

Krasimir, if you're reading, I managed to write the guts of Interpose.js in 
just 9 lines. I don't think I could have managed it without you, thank you.


