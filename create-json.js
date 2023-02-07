const fs = require("fs");
const validator = require("validator");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
  console.log("Success create folder");
}

if (!fs.existsSync("./data/contacts.json")) {
  fs.writeFileSync("./data/contacts.json", "[]");
  console.log("Success create file");
}

function getInput(data) {
  return new Promise(function (resolve, reject) {
    readline.question(data, (ans) => {
      // console.log(ans);
      resolve(ans);
    });
  });
}

// and await here
(async () => {
  const nama = await getInput("Nama :");
  let email = await getInput("Email :");
  let telephone = await getInput("Telephone :");

  while (!validator.isEmail(email)) {
    console.log("Format email tidak sesuai");
    email = await getInput("Email :");
  }

  while (!validator.isMobilePhone(telephone, "id - ID")) {
    console.log("Format telephone tidak sesuai");
    telephone = await getInput("Telephone :");
  }

  const myObj = { name: nama, email: email, telephone: telephone };
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const myData = JSON.parse(file);
  myData.push(myObj);
  const content = JSON.stringify(myData);
  fs.writeFileSync("./data/contacts.json", content);
  readline.close();
})();
