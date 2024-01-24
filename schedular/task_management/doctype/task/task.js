// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Task", {
    // Triggers when value of 'stage' is changed.
	stage: function(frm){
        // When the stage is changed to 'done' the completion date is set and form is saved.
        if (frm.doc.stage === 'Done'){
            frm.toggle_enable("stage", true)
            frm.set_value('completed_on_date', frappe.datetime.now_datetime())
        }
        // When stage is changed to 'todo', some fields become mandatory.
        else if (frm.doc.stage === 'Todo'){
            frm.toggle_reqd('due_date',true)
            frm.toggle_reqd('priority_level',true)
            frm.toggle_reqd('emp_assigned',true)
        }
    },
    // Throws error when due date is a date before than today's date.
    due_date: function(frm){
        if (frappe.datetime.get_diff(frappe.datetime.str_to_obj(frm.doc.due_date), frappe.datetime.now_datetime()) < 0){
            frappe.throw('Enter valid date.')
        }
    },

    // // Sends email to the assigned employees, first time when task is created.
    // before_save: function(frm){
    //     if(frm.is_new()){
    //         frm.call({
    //             doc: frm.doc,
    //             method: 'send_email',
    //             args: {
    //                 emp_no: frm.doc.emp_assigned,
    //                 subject: frm.doc.task_name,
    //                 desc: frm.doc.task_desc || '',
    //             },
    //         })
    //     }
    // },
});
