# Copyright (c) 2024, @rohan and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.background_jobs import enqueue


class Task(Document):
	# Stage is reverted to the last stage before the document is saved.
	@frappe.whitelist()
	def revert_stage(self):
		old_doc = Document.get_doc_before_save(self)
		return old_doc.stage
	
	# Email is sent about the task details to the assigned employee.
	@frappe.whitelist()
	def send_email(self, emp_no, subject, desc):
		employee_doc = frappe.get_doc('Employee', emp_no)
		frappe.sendmail(recipients=employee_doc.email, subject=subject, message= desc, now=True)
		
