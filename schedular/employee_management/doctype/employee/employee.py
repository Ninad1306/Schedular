# Copyright (c) 2024, @rohan and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.docstatus import DocStatus
from frappe.utils import get_abbr, days_diff


class Employee(Document):
	# This method sets the full name and employee number in the document.
	def before_save(self):
		self.emp_no = self.name
		abbr_name = get_abbr(self.middle_name, max_len=1)
		self.full_name = self.first_name+ ' ' + abbr_name + ' ' + self.last_name

	# This method checks if there exists employee with the same name.
	def before_submit(self):
		exists = frappe.db.exists(
            "Employee",
            {
                "first_name": self.first_name,
				"middle_name": self.middle_name,
				"last_name": self.last_name,
                "docstatus": DocStatus.submitted(),
            },
        )
		if exists:
			frappe.throw("There is an active employee for this name.")
		
	def validate(self):
		age = days_diff(None,self.dob) // 365
		if age<18:
			frappe.throw('Employee age should be 18 or greater.')
		else:
			self.age = age