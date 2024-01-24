// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Employee", {
    // Changes full name when first name changes
    first_name: function(frm){
        if (frm.doc.middle_name.trim().length > 0) {
            frm.set_value('full_name', frm.doc.first_name  + ' ' +frm.doc.middle_name.toUpperCase()[0] + ' ' + (frm.doc.last_name || ''));
        } 
        else{
            frm.set_value('full_name', frm.doc.first_name + ' ' + (frm.doc.last_name || ''));
        }
        
    },
    // Changes full name when middle name changes
    middle_name: function (frm) {
        if (frm.doc.middle_name.trim().length > 0) {
            frm.set_value('full_name', (frm.doc.first_name || '') + ' ' +frm.doc.middle_name.toUpperCase()[0] + ' ' + (frm.doc.last_name || ''));
        }
    },
    // Changes full name when last name changes
    last_name: function(frm){
        if (frm.doc.middle_name.trim().length > 0) {
            frm.set_value('full_name', (frm.doc.first_name || '') + ' ' +frm.doc.middle_name.toUpperCase()[0] + ' ' + frm.doc.last_name);
        }
        else{
            frm.set_value('full_name', (frm.doc.first_name || '') + ' ' + frm.doc.last_name);
        }
        
    },

    // Based on the dob the age field is set.
    dob: function (frm){
        var dob = frappe.datetime.str_to_obj(frm.doc.dob);
        var today = frappe.datetime.now_datetime();
        var age = frappe.datetime.get_diff(today, dob);
        var ageInYears = Math.floor(age / 365);
        frm.set_value('age', ageInYears)
        if (ageInYears<18){
            frappe.throw('Enter valid date of birth.')
        }
	},
});
