<template>
    <div class="p-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header"><h5><b>User Registration</b></h5></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <label><b>First Name<span style="color:red">*</span></b></label>
                                <input type="text" class="form-control" placeholder="Enter First Name" v-model="firstName">
                            </div>
                            <div class="col-md-4">
                                <label><b>Last Name<span style="color:red">*</span></b></label>
                                <input type="text" class="form-control" placeholder="Enter Last Name" v-model="lastName">
                            </div>
                            <div class="col-md-4">
                                <label><b>Gender<span style="color:red">*</span></b></label>
                                <select class="form-control" v-model="gender">
                                    <option :value="null">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-4">
                                <label><b>Mobile Number<span style="color:red">*</span></b></label>
                                <input type="number" class="form-control" placeholder="Enter Mobile Number" v-model="mobileNumber">
                            </div>
                            <div class="col-md-4">
                                <label><b>Email Id<span style="color:red">*</span></b></label>
                                <input type="email" class="form-control" placeholder="Enter Email Id" v-model="emailId">
                            </div>
                            <div class="col-md-4">
                                <label><b>Date Of Birth<span style="color:red">*</span></b></label>
                                <input type="date" class="form-control" v-model="dateOfBirth">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-4">
                                <label><b>Address<span style="color:red">*</span></b></label>
                                <textarea rows="2" class="form-control" placeholder="Enter Address" v-model="address"></textarea>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <button @click="onHandleRegisterUpdateButton" type="button" class="btn btn-success">{{ isEdit ? 'Update User' : 'Register User'}}</button>&nbsp;
                                <button @click="onHandleCancelButton" type="button" class="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header"><h5><b>User List Details</b></h5></div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>Mobile No.</th>
                                    <th>Email Id</th>
                                    <th>DOB</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(userDetails,index) in userListDetails" :key="index">
                                    <td>{{ index + 1}}</td>
                                    <td>{{ userDetails.FIRST_NAME }}</td>
                                    <td>{{ userDetails.LAST_NAME }}</td>
                                    <td>{{ userDetails.GENDER }}</td>
                                    <td>{{ userDetails.MOBILE_NUMBER }}</td>
                                    <td>{{ userDetails.EMAIL_ID }}</td>
                                    <td>{{ userDetails.DATE_OF_BIRTH }}</td>
                                    <td>{{ userDetails.ADDRESS }}</td>
                                    <td>
                                        <button @click="onHandleEditButton(userDetails)" type="button" class="btn btn-primary">Edit</button>&nbsp;
                                        <button @click="deleteUserDetails(userDetails)" type="button" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            isEdit: false,
            firstName: null,
            lastName: null,
            gender: null,
            mobileNumber: null,
            emailId: null,
            dateOfBirth: null,
            address: null,
            userListDetails: [],
            editedUserDetails: null,
        }
    },

    mounted(){
        this.getUserListDetails();
    },

    methods:{
        getUserListDetails(){
            let apiParams = { ITEM: 'VIEW_ALL' };
            this.$apiCall.get(this.$apiBus.viewUserInfo, { params: apiParams }).then(res => {
                if(res.status == 'true') this.userListDetails = res.response;
                else this.userListDetails = [];
            });
        },

        addUserDetails(){
            let apiParams = {
                ITEM: 'ADD_USER',
                RECORD_SYS_ID: 0,
                FIRST_NAME: this.firstName,
                LAST_NAME: this.lastName,
                GENDER: this.gender,
                MOBILE_NUMBER: this.mobileNumber,
                EMAIL_ID: this.emailId,
                DATE_OF_BIRTH: this.dateOfBirth,
                ADDRESS: this.address,
            }
            this.$apiCall.post(this.$apiBus.addUpdateUserInfo, apiParams).then(res => {
                if(res.status == 'true') {
                    alert(res.response);
                    this.onHandleCancelButton();
                    this.getUserListDetails();
                }
                else alert("Opp's something went wrong on server!")
            });
        },

        updateUserDetails(){
            let apiParams = {
                ITEM: 'UPDATE_USER',
                RECORD_SYS_ID: this.editedUserDetails?.RECORD_SYS_ID,
                FIRST_NAME: this.firstName,
                LAST_NAME: this.lastName,
                GENDER: this.gender,
                MOBILE_NUMBER: this.mobileNumber,
                EMAIL_ID: this.emailId,
                DATE_OF_BIRTH: this.dateOfBirth,
                ADDRESS: this.address,
            }
            this.$apiCall.post(this.$apiBus.addUpdateUserInfo, apiParams).then(res => {
                if(res.status == 'true') {
                    alert(res.response);
                    this.onHandleCancelButton();
                    this.getUserListDetails();
                }
                else alert("Opp's something went wrong on server!")
            });

        },

        deleteUserDetails(userDetails){
            let text = "Are you sure? \nYou want to delete this user.";
            if (confirm(text) == true) {
                let apiParams = { ITEM: 'DELETE_USER', RECORD_SYS_ID: userDetails?.RECORD_SYS_ID };
                this.$apiCall.post(this.$apiBus.addUpdateUserInfo, apiParams).then(res => {
                    if(res.status == 'true') {
                        alert(res.response);
                        this.getUserListDetails();
                    }
                    else alert("Opp's something went wrong on server!")
                });
            }
        },

        onHandleRegisterUpdateButton(){
            let isValidateForm = this.onValidateRegisterForm();
            if(isValidateForm == true){
                if(this.isEdit) this.updateUserDetails();
                else this.addUserDetails();
            }
        },

        onValidateRegisterForm(){
            if(this.firstName == null){
                alert("First Name is required!")
                return false;
            }
            else if(this.lastName == null){
                alert("Last Name is required!")
                return false;
            }
            else if(this.gender == null){
                alert("Gender is required!")
                return false;
            }
            else if(this.mobileNumber == null){
                alert("Mobile Number is required!")
                return false;
            }
            else if(this.emailId == null){
                alert("Email Id is required!")
                return false;
            }
            else if(this.dateOfBirth == null){
                alert("Date Of Birth is required!")
                return false;
            }
            else if(this.address == null){
                alert("Address is required!")
                return false;
            }
            else return true;
        },

        onHandleCancelButton(){
            this.firstName = null,
            this.lastName = null,
            this.gender = null,
            this.mobileNumber = null,
            this.emailId = null,
            this.dateOfBirth = null,
            this.address = null;
            this.isEdit = false;
        },

        onHandleEditButton(userDetails){
            this.isEdit = true;
            this.editedUserDetails = userDetails;
            this.firstName = this.editedUserDetails?.FIRST_NAME,
            this.lastName = this.editedUserDetails?.LAST_NAME,
            this.gender = this.editedUserDetails?.GENDER,
            this.mobileNumber = this.editedUserDetails?.MOBILE_NUMBER,
            this.emailId = this.editedUserDetails?.EMAIL_ID,
            this.dateOfBirth = this.editedUserDetails?.DATE_OF_BIRTH,
            this.address = this.editedUserDetails?.ADDRESS;
        }
    }
    
}
</script>