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
		var items = (' ' + template).replace(/[\t\r\n]/g, '').split(new RegExp(start + '|' + end)), code, index;
		code = 'var o=[],echo=function(s){o.push(s)},print=function(s){echo(s.replace(/';
		code += ['&/g,"&amp', '"/g,"&quot','\'/g,"&39','</g,"&lt','>/g,"&gt'].join(';").replace(/') + '"))};';
		for(index = 0; index < items.length; index++) {
			var even = index % 2 == 0, interpolate = !even && items[index].trim().charAt(0) == '=', item = even || interpolate ? items[index].replace(/"/g, '\\"') : items[index];
			code += (even ? 'o.push("' + item + '")' : interpolate ? 'print(' + item.replace('=', '') + ')' : item) + ';';
		}
		code += 'return o.join("");';
		return new Function(code);
	};
};