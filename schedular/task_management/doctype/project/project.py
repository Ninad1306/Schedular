# Copyright (c) 2024, @rohan and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Project(Document):

	# Returns the project progress.
	@frappe.whitelist()
	def show_progress(self):
		comp_tasks = frappe.db.count('Task', {'project_name_task': self.name, 'stage': 'Done'})
		all_tasks = frappe.db.count('Task', {'project_name_task': self.name})
		if not all_tasks:
			return 0
		return int((comp_tasks/all_tasks)*100)

