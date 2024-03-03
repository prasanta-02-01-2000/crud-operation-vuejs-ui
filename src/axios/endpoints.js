const apiUrl = process.env.VUE_APP_API_URL;
const endPoints = {
    addUpdateUserInfo: apiUrl + "api/post-add-update-delete-user-info",
    viewUserInfo: apiUrl + "api/get-user-info",
}
  export default endPoints;