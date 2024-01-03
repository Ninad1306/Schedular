# Copyright (c) 2024, @rohan and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.docstatus import DocStatus
from datetime import date, datetime
from frappe.utils import today, get_abbr


class Employee(Document):
	# This method sets the full name and employee number in the document.
	def before_save(self):
		# self.full_name = f'{self.first_name} {self.middle_name or ""} {self.last_name or ""}'
		self.emp_no = self.name

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

	# Returns the abbrevation to the client side script.
	@frappe.whitelist()
	def get_abbrevation(self):
		return get_abbr(self.middle_name, max_len=1)
		