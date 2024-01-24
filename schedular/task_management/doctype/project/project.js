// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Project", {
	refresh: function(frm){
        // Can only add task when a project is created.
        frm.add_custom_button(__('Add Task'), function(){
            if (!frm.is_new()){
                frappe.new_doc('Task',{
                    project_name_task: frm.doc.name
                })
            }
            else{
                frappe.throw('Please create a project first.')
            }
        });

        // Api call for project progress.
        if (!frm.is_new()){
            frm.call({
                doc: frm.doc,
                method: 'show_progress',
                callback: function(progress){
                    frm.add_custom_button(__('Progress '+progress['message']+'%'))
                    // frappe.show_progress('Progress', progress['message'], 100, progress['message']+'%');
                }
            })
        }
    },
});
