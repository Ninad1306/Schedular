# Copyright (c) 2024, @rohan and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
	if not filters: 
		filters = {}

	columns, data = [], []

	columns = get_columns()
	cs_data = get_cs_data(filters)

	if not cs_data:
		frappe.msgprint('No records found.')
		return columns, cs_data

	data=[]
	for d in cs_data:
		row = frappe._dict({
			'prj_name_task': d.project_name_task,
			'task_name': d.task_name,
			'priority': d.priority_level,
			'due_date': d.due_date,
			'stage': d.stage
		})
		data.append(row)

	return columns, data

def get_columns():
	return [
		{
			'fieldname': 'prj_name_task',
			'label': 'Project Name',
			'fieldtype': 'Data',
			'width': '120',
		},
		{
			'fieldname': 'task_name',
			'label': 'Task Name',
			'fieldtype': 'Data',
			'width': '120',
		},
		{
			'fieldname': 'priority',
			'label': 'Priority',
			'fieldtype': 'Data',
			'width': '120',
		},
		{
			'fieldname': 'due_date',
			'label': 'Due Date',
			'fieldtype': 'Data',
			'width': '120',
		},
		{
			'fieldname': 'stage',
			'label': 'Stage',
			'fieldtype': 'Data',
			'width': '100',
		}
	]

def get_cs_data(filters):
	conditions = get_conditions(filters)
	data = frappe.get_all(
		doctype='Task',
		fields=['project_name_task','task_name','priority_level','due_date','stage'],
		filters=conditions,
		order_by='priority_level'
	)
	return data

def get_conditions(filters):
	conditions = {}
	for key, value in filters.items():
		if filters.get(key):
			if key=='due_date':
				conditions[key] = ['<', value]
	return conditions