function hidePass(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      copy.style.display = "initial";
      setTimeout(() => {
        copy.style.display = "none";
      }, 1000);
    },
    () => {
      notCopy.style.display = "initial";
      setTimeout(() => {
        notCopy.style.display = "none";
      }, 1000);
    }
  );
}

const deletePassword = (website) => {
  let data = localStorage.getItem("passwordManager");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwordManager", JSON.stringify(arrUpdated));
  deleted.style.display = "initial";
  setTimeout(() => {
    deleted.style.display = "none";
  }, 1000);
  showPasswords();
};

const showPasswords = () => {
  let table = document.querySelector("table");
  let data = localStorage.getItem("passwordManager");
  if (data == null || JSON.parse(data).length == 0) {
    table.innerHTML = "* No Data To Show *";
    table.style =
      "border: none; width: 35%; font-size: 20px; font-weight: bold; color: red;";
  } else {
    table.innerHTML = `
                        <tr>
                        <th>WebSite</th>
                        <th>UserName</th>
                        <th>PassWord</th>
                        <th>Delete</th>
                        </tr>
                      `;
    table.style =
      "border: 2px solid black; width: auto; font-size: 16px; font-weight: normal; color: black;";
    let arr = JSON.parse(data);
    str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      str += `
            <tr>
            <td>${element.website} &nbsp; <i onclick="copyText('${
        element.website
      }')" class="dlt fa-solid fa-copy"></i></td>
            <td>${element.username} &nbsp; <i onclick="copyText('${
        element.username
      }')" class="dlt fa-solid fa-copy"></i></td>
            <td>${hidePass(element.password)} &nbsp; <i onclick="copyText('${
        element.password
      }')" class="dlt fa-solid fa-copy"></i></td>
            <td><i onclick="deletePassword('${
              element.website
            }')" class="dlt fa-solid fa-trash-can"></i></td>
            </tr>
            `;
    }
    table.innerHTML += str;
  }
  webSite.value = "";
  userName.value = "";
  passWord.value = "";
};

showPasswords();

save.addEventListener("click", (e) => {
  if (validateForm()) {
    e.preventDefault();

    let passwordManager = localStorage.getItem("passwordManager");

    if (passwordManager == null) {
      let json = [];
      json.push({
        website: webSite.value,
        username: userName.value,
        password: passWord.value,
      });
      saved.style.display = "initial";
      setTimeout(() => {
        saved.style.display = "none";
      }, 1000);
      localStorage.setItem("passwordManager", JSON.stringify(json));
    } else {
      let json = JSON.parse(passwordManager);
      json.push({
        website: webSite.value,
        username: userName.value,
        password: passWord.value,
      });
      saved.style.display = "initial";
      setTimeout(() => {
        saved.style.display = "none";
      }, 1000);
      localStorage.setItem("passwordManager", JSON.stringify(json));
    }
    showPasswords();
  }
});

function validateForm() {
  // Get all input fields in the form
  const inputs = document.querySelectorAll("input");

  // Loop through each input field to check if it's empty
  for (let input of inputs) {
    if (input.type !== "submit" && input.value === "") {
      // alert("All fields must be filled out.");
      fill.style.display = "initial";
      setTimeout(() => {
        fill.style.display = "none";
      }, 2000);
      return false; // Prevent form submission
    }
  }
  return true; // Allow form submission if all fields are filled
}
