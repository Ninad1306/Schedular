# Copyright (c) 2024, @rohan and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today

class Task(Document):
	# Sends mail to the reviewer to review the task when stage changed to 'In Review'
	def before_save(self):
		if self.stage == 'In Review':
			self.send_email(self.task_name, self.task_desc)
	
	# Email is sent to reviewer when stage is changed to 'In Review'.
	def send_email(self, subject, desc):
		employee_email = frappe.db.get_value('Employee', {'emp_role': 'Reviewer'}, ['email'])
		frappe.sendmail(recipients=employee_email, subject=subject, message= desc, now=True)
	
	def validate(self):
		old_task_doc = self.get_doc_before_save()

		if self.due_date!=old_task_doc.due_date and self.due_date<today():
			frappe.throw('Enter valid date.')
		
		if self.stage == 'Done':
			if old_task_doc.stage!='Done':
				self.completed_on_date = today()
			else:
				self.completed_on_date = old_task_doc.completed_on_date
		
