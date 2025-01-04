function addPicture() {
  alert("Add picture functionality to be implemented.");
}

function removePicture() {
  document.getElementById("profile-img").src = "default-profile.png";
}

function importPicture() {
  alert("Import picture functionality to be implemented.");
}

function editProfile() {
  alert("Edit profile functionality to be implemented.");
}

function openSettings() {
  alert("Settings functionality to be implemented.");
}

function signOut() {
  alert("Do you really want to sign out?");

}

function addSkillField() {
  const skillList = document.getElementById("skill-list");
  const textarea = document.createElement("textarea");
  textarea.placeholder = "Enter your new skill...";
  textarea.style.display = "block";
  textarea.style.margin = "10px 0";
  textarea.style.width = "100%";
  textarea.style.height = "40px";
  textarea.style.padding = "10px";
  textarea.style.fontSize = "18px";
  textarea.style.border = "1px solid #ccc";
  textarea.style.borderRadius = "5px";
  textarea.style.resize = "none";
  skillList.appendChild(textarea);
}
