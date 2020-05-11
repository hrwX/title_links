// Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

// for license information please see license.txt

frappe.provide("frappe.form.formatters");

frappe.form.formatters.Link = function(value, docfield, options, doc) {
	var doctype = docfield._options || docfield.options;
	var original_value = value;
	let link_title = frappe.get_link_title(doctype, value);

	if (frappe.get_route()[2] === "Report") {
		link_title = null;
	}

	if(value && value.match && value.match(/^['"].*['"]$/)) {
		value.replace(/^.(.*).$/, "$1");
	}

	if(options && (options.for_print || options.only_value)) {
		return link_title || value;
	}

	if(frappe.form.link_formatters[doctype]) {
		// don't apply formatters in case of composite (parent field of same type)
		if (doc && doctype !== doc.doctype) {
			value = frappe.form.link_formatters[doctype](value, doc);
		}
	}

	if(!value) {
		return "";
	}

	if(value[0] == "'" && value[value.length -1] == "'") {
		value = value.substring(1, value.length - 1);
		return link_title || value;
	}

	if (docfield && docfield.link_onclick) {
		value = link_title || value;
		return repl('<a onclick="%(onclick)s">%(value)s</a>',
			{onclick: docfield.link_onclick.replace(/"/g, '&quot;'), value:value});
	} else if (docfield && doctype) {
		return `<a class="grey"
			href="#Form/${encodeURIComponent(doctype)}/${encodeURIComponent(original_value)}"
			data-doctype="${doctype}"
			data-name="${original_value}"
			data-value="${original_value}">
			${__(options && options.label || link_title || value)}</a>`;
	} else {
		return link_title || value;
	}
}