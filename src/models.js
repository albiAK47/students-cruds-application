/**
 * Get data from LS
 * @param {*} key
 */

const getDataLS = (key) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};

/**
 * Save data LS
 * @param {*} key
 * @param {*} data
 */
const sendDataLS = (key, studata) => {
  const data = localStorage.getItem(key);

  let ls_data;
  if (data) {
    ls_data = JSON.parse(data);
  } else {
    ls_data = [];
  }

  ls_data.push(studata);

  localStorage.setItem(key, JSON.stringify(ls_data));
};
/**
 * single data get
 * @param {*} key
 * @param {*} id
 */

const getSingleData = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (data) {
    return data.find((item) => item.id == id);
  } else {
    return false;
  }
};

/**
 * delete single data
 * @param {*} key
 * @param {*} id
 */

const deleteSingleData = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  const remainingData = data.filter((item) => item.id != id);
  localStorage.setItem(key, JSON.stringify(remainingData));
};
