/*
 * Copyright (c) 2014 Darren Scott - All Rights Reserved
 * 
 * This program is distributed under LGPL Version 2.1 in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY.
 */
var interpose = interpose || {};
interpose.init = function(start, end) {
	var reg = new RegExp('([?[(/.+*)\\]])', 'g'), rep = '\\\$1', start = (start || '<?js').replace(reg, rep), end = (end || '?>').replace(reg, rep);
	return function(template) {
		var items = (' ' + template).replace(/[\t\r\n]/g, '').split(new RegExp(start + '|' + end)), rep = '\\"', reg = /"/g, code, index;
		code = 'var o=[],echo=function(s){o.push(s)},print=function(s){echo(s.replace(/';
		code += ['&/g,"&amp', '"/g,"&quot','\'/g,"&39','</g,"&lt','>/g,"&gt'].join(';").replace(/') + '"))};';
		for(index = 0; index < items.length; index++) {
			var even = index % 2 == 0, item = items[index], interpolate = !even && item.trim().charAt(0) == '=';
			code += (even ? 'o.push("' + item.replace(reg, rep) + '")' : interpolate ? 'print(' + item.replace(reg, rep).replace('=', '') + ')' : item) + ';';
		}
		code += 'return o.join("");';
		return new Function(code);
	};
};