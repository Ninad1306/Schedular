// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Project", {
	refresh: function(frm){
        frm.add_custom_button(__('Add Task'), function(){
            if (!frm.is_new()){
                frappe.new_doc('Task',{
                    project_name_task: frm.doc.project_name
                })
            }
            else{
                frappe.throw('Please save the document.')
            }
        });
    },
});
