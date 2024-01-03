// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Employee", {
    // Changes full name when first name changes
    first_name: function(frm){
        frm.set_value('full_name', frm.doc.first_name + ' ' + frm.doc.last_name);
    },
    // Changes full name when last name changes
    last_name: function(frm){
        frm.set_value('full_name', frm.doc.first_name + ' ' + frm.doc.last_name);
    },
    // Based on the dob the age field is set.
    dob: function (frm) {
		if (frm.doc.dob) {
            var dob = frappe.datetime.str_to_obj(frm.doc.dob);
            var today = frappe.datetime.now_datetime();
            var age = frappe.datetime.get_diff(today, dob);
            var ageInYears = Math.floor(age / 365);
            frm.set_value('age', ageInYears);
        }
	},
    // Sets the abbrevation of middle name by calling 'get_abbrevation' method from server side script.
    before_save: function(frm){
        if (frm.doc.middle_name.trim().length>0) {
            frm.call({
                doc: frm.doc,
                method: 'get_abbrevation',
                callback: function (abbr) {
                    frm.set_value('full_name', frm.doc.first_name + ' ' + abbr['message'] + ' ' + frm.doc.last_name);
                }
            })
        }
    }
});
