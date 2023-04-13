const express = require('express')
const router = express.Router()
const {
  addEmployee,
  getAllEmployees,
  getEmployee,
  editEmployee,
  deleteEmployee
} = require('../../controllers/employeesControllers')
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), addEmployee)
  .get(getAllEmployees)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), editEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)

router.route('/:id')
  .get(getEmployee)

module.exports = router
