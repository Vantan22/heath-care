import axios from "axios";

const URL = "https://truculent-kick-production.up.railway.app/api/auth/register"
export const postData = (URL, data) => {
  return axios.post(URL, data);
};

postData("https://api.example.com/users", {
  "username":"username1",
  "password":"aaaa"
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

export const Register = (data) => {
  axios.post("https://truculent-kick-production.up.railway.app/api/auth/register", data)
    .then((response) => {
      if (response.status === 200) {
        return "Data has been posted successfully!"
      } else {
        return "Error posting data!"
      }
    })
    .catch((error) => {
      return error
    });
}

