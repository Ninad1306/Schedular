// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Task", {
    stage: function (frm) {
        // When the stage is changed to 'done' the completion date is set.
        if (frm.doc.stage === 'Done') {
            frm.set_value('completed_on_date', frappe.datetime.now_datetime())
        }
        // When stage is changed to 'todo', some fields become mandatory.
        else if (frm.doc.stage === 'Todo') {
            frm.toggle_reqd('due_date', true)
            frm.toggle_reqd('priority_level', true)
            frm.toggle_reqd('emp_assigned', true)
        }
    }
})