// Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

// for license information please see license.txt

frappe.ui.form.update_calling_link = (newdoc) => {
	if (!frappe._from_link) return;
	var doc = frappe.get_doc(frappe._from_link.doctype, frappe._from_link.docname);

	let is_valid_doctype = () => {
		if (frappe._from_link.df.fieldtype==='Link') {
			return newdoc.doctype === frappe._from_link.df.options;
		} else {
			// dynamic link, type is dynamic
			return newdoc.doctype === doc[frappe._from_link.df.options];
		}
	};

	if (is_valid_doctype()) {
		frappe.model.with_doctype(newdoc.doctype, () => {
			let meta = frappe.get_meta(newdoc.doctype);
			// set value
			if (doc && doc.parentfield) {
				//update values for child table
				$.each(frappe._from_link.frm.fields_dict[doc.parentfield].grid.grid_rows, function (index, field) {
					if (field.doc && field.doc.name === frappe._from_link.docname) {
						if (meta.title_field) {
							frappe.add_link_title(newdoc.doctype, newdoc.name, newdoc[meta.title_field])
						}
						frappe._from_link.set_value(newdoc.name);
					}
				});
			} else {
				if (meta.title_field) {
					frappe.add_link_title(newdoc.doctype, newdoc.name, newdoc[meta.title_field])
				}
				frappe._from_link.set_value(newdoc.name);
			}

			// refresh field
			frappe._from_link.refresh();

			// if from form, switch
			if (frappe._from_link.frm) {
				frappe.set_route("Form",
					frappe._from_link.frm.doctype, frappe._from_link.frm.docname)
					.then(() => {
						frappe.utils.scroll_to(frappe._from_link_scrollY);
					});
			}

			frappe._from_link = null;
		})
	}
}
