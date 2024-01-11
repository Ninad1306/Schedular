// Copyright (c) 2024, @rohan and contributors
// For license information, please see license.txt

frappe.query_reports["Task Script Report"] = {
	"filters": [
		{
			'fieldname': 'project_name_task',
			'label': 'Project Name',
			'fieldtype': 'Link',
			'options': 'Project',
		},
		{
			'fieldname': 'due_date',
			'label': 'Due Date',
			'fieldtype': 'Date',
			'options': 'Task',
		},
		{
			'fieldname': 'priority_level',
			'label': 'Priority',
			'fieldtype': 'Select',
			'options': ['low',
				'medium',
				'high',
				'urgent'
			],
		},
		{
			'fieldname': 'stage',
			'label': 'Stage',
			'fieldtype': 'Select',
			'options': ['Backlog',
				'Todo',
				'In Progress',
				'In Review',
				'Done',
				'Cancelled',
				'Duplicate',
				'Triage'
			],
		}
	]
};
