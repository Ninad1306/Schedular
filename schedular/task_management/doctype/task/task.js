// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Task", {
    // Triggers when value of 'stage' is changed.
	stage: function(frm){
        if (frm.doc.stage === 'Reviewed'){
            // Checks that completion date is entered or not when stage changed to Reviewed, else reverted back.
            if (!frm.doc.completed_on_date){
                frm.call({
                    doc: frm.doc,
                    method: 'revert_stage',
                    callback: function(stage){
                        frm.set_value('stage', stage['message'])
                    }
                })
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

    // Sends email to the assigned employees, first time when task is created.
    before_save: function(frm){
        if(frm.is_new()){
            frm.call({
                doc: frm.doc,
                method: 'send_email',
                args: {
                    emp_no: frm.doc.emp_assigned,
                    subject: frm.doc.name,
                    desc: frm.doc.task_desc
                },
            })
        }
    }
});
