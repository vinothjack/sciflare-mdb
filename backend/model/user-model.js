const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    emailId: { type: String, required: true },
    role_name: { type: String, required: true },
    org_name: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    role_id: { type: Number, required: true }, 
    org_id: { type: Number, required: true }
});

const roleSchema = new mongoose.Schema({
    role_id: { type: Number, required: true },
    role_name: { type: String, required: true },
});

const organizationSchema = new mongoose.Schema({
    org_id: { type: Number, required: true },
    org_name: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);
const RoleModel = mongoose.model('Role', roleSchema);
const OrganizationModel = mongoose.model('Organization', organizationSchema);

module.exports = {
    UserModel,
    RoleModel,
    OrganizationModel
};
