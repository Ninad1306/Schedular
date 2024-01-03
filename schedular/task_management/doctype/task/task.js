// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Task", {
    // Triggers when value of 'stage' is changed.
	stage: function(frm){
        if (frm.doc.stage === 'Completed'){
            // Checks that completeion date is entered or not when stage changed to Completed.
            if (!frm.doc.completed_on_date){
                frm.set_value('stage', 'In Progress')
                frm.save()
                frappe.throw('Enter the completion date.')
            }
            // If completion date is entered then task is submitted.
            else{
                frm.save('Submit')
            }
        }
    },
    // Throws error when due date is a date before than today's date.
    due_date: function(frm){
        if (frappe.datetime.get_diff(frappe.datetime.str_to_obj(frm.doc.due_date), frappe.datetime.now_datetime()) < 0){
            frappe.throw('Enter valid date.')
        }
    },
});
