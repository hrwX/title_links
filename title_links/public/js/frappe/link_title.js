// Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

// for link titles
frappe._link_titles = {};

$(document).bind('toolbar_setup', function() {
	frappe.xcall("title_links.desk.search.doctypes_with_show_link_field_title").then((r) => {
		if (r) {
			frappe.doctypes_with_show_link_field_title = r;
		}
	});
});

frappe.get_link_title = function(doctype, name) {
	if (!doctype || !name) {
		return;
	}

	return frappe._link_titles[doctype + "::" + name];
};

frappe.add_link_title = function (doctype, name, value) {
	if (!doctype || !name) {
		return;
	}

	frappe._link_titles[doctype + "::" + name] = value;
};

frappe.set_link_title =  function(f) {
	let doctype = f.get_options();
	let docname = f.get_input_value();

	if (!frappe.doctypes_with_show_link_field_title || (!in_list(frappe.doctypes_with_show_link_field_title, doctype)) ||
		(!doctype || !docname) || (frappe.get_link_title(doctype, docname))) {
		return;
	}

	frappe.xcall("title_links.desk.search.get_link_title", {"doctype": doctype, "docname": docname}).then((r) => {
		if (r && docname !== r) {
			f.set_input_label(r);
		}
	});
}