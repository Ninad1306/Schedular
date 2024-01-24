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

	# Stage is reverted to the last stage before the document is saved.
	@frappe.whitelist()
	def revert_stage(self):
		old_doc = Document.get_doc_before_save(self)
		return old_doc.stage
	
	# Email is sent to reviewer when stage is changed to 'In Review'.
	def send_email(self, subject, desc):
		emp_no = frappe.db.get_value('Employee',{'emp_role': 'Reviewer'}, ['emp_no'])
		employee_doc = frappe.get_doc('Employee', emp_no)
		frappe.sendmail(recipients=employee_doc.email, subject=subject, message= desc, now=True)
	
	def validate(self):
		if self.due_date < today():
			frappe.throw('Enter valid date.')
		
		old_doc = self.get_doc_before_save()
		if self.stage == 'Done':
			if old_doc.stage!='Done':
				self.completed_on_date = today()
			else:
				self.completed_on_date = old_doc.completed_on_date
		
