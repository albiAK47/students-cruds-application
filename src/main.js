const student_create_form = document.getElementById("studen-create-form");
const student_data = document.getElementById("studentDataList");
const student_update = document.getElementById("student-update");
const close_kore = document.getElementById("close_kore");
const up_close = document.getElementById("up_close");
const msg = document.querySelector(".msg");
const student_show = document.querySelector(".student-show");

// show student data

const getAllStudents = () => {
  const students = getDataLS("students");

  let dataList = "";

  if (students) {
    students.reverse().forEach((item, index) => {
      dataList += `
            <tr>
            <td>${index + 1}</td>
            <td>
              <img
                src="${item.photo}"
                alt=""
              />
            </td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.location}</td>
            <td>${timeLoop(item.createdAt)}</td>
         
            <td>
              <button
                data-bs-toggle="modal"
                data-bs-target="#single-student-show"
                class="btn btn-sm btn-info"
                onclick="showSingleStudent('${item.id}')"
              >
                <i class="fa fa-eye"></i>
              </button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#edit-student"
                class="btn btn-sm btn-warning"
                onclick="editStudent('${item.id}')"
              >
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" onclick="deleteStudent('${
                item.id
              }')">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
            
            
            `;
    });
  } else {
    dataList = `
        <tr>
            <td colspan="8" class="text-center text-danger">No data found!!</td>
        </tr>
    `;
  }

  student_data.innerHTML = dataList;
};
//edit single data

const editStudent = (id) => {
  const data = JSON.parse(localStorage.getItem("students"));

  // get edit data
  const { name, email, phone, location, photo } = data.find(
    (item) => item.id == id
  );

  student_update.querySelector('input[name="name"]').value = name;
  student_update.querySelector('input[name="email"]').value = email;
  student_update.querySelector('input[name="phone"]').value = phone;
  student_update.querySelector('input[name="location"]').value = location;
  student_update.querySelector('input[name="photo"]').value = photo;
  student_update.querySelector('input[name="id"]').value = id;
};

// data delete single

const deleteStudent = (id) => {
  const conf = confirm("Are you sure?");

  if (conf) {
    deleteSingleData("students", id);
    getAllStudents();
  }
};

// single data show

const showSingleStudent = (id) => {
  const { name, email, phone, location, photo } = getSingleData("students", id);
  student_show.innerHTML = `
  <div class="cen">
  <img
    class="img-thumbnail"
    src="${photo}"
    alt=""
  />
</div>
<table class="table">
  <thead>
    <tr>
      <th>Name :</th>
      <td>${name}</td>
    </tr>
    <tr>
      <th>Email :</th>
      <td>${email}</td>
    </tr>
    <tr>
      <th>Phone :</th>
      <td>${phone}</td>
    </tr>
    <tr>
      <th>Location :</th>
      <td>${location}</td>
    </tr>
  </thead>
</table>
  `;
};

getAllStudents();

// new student create submit form

student_create_form.onsubmit = (e) => {
  e.preventDefault();

  // get form data
  const form_data = new FormData(e.target);

  const { name, email, phone, location, photo } = Object.fromEntries(form_data);
  // form validation
  if (!name || !email || !phone || !location || !phone) {
    msg.innerHTML = createAlert("All fields are required!!");
  } else if (!isEmail(email)) {
    msg.innerHTML = createAlert("Email is invalid!!", "warning");
  } else if (!isMobile(phone)) {
  } else {
    sendDataLS("students", {
      id: createID(),
      name,
      email,
      phone,
      location,
      photo,
      createdAt: Date.now(),
    });
    msg.innerHTML = createAlert("Data is stable!!", "success");
    e.target.reset();
    getAllStudents();
    close_kore.click();
  }
};

student_update.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);

  const { name, email, phone, location, photo, id } =
    Object.fromEntries(form_data);

  const data = JSON.parse(localStorage.getItem("students"));

  const updateData = data.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        name,
        email,
        phone,
        location,
        photo,
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("students", JSON.stringify(updateData));
  getAllStudents();
  up_close.click();
};
