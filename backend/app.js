//---------------- module import------------------//
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const axios = require("axios");
//----------connect app with DB----------//
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/sport");
//mongoose.connect('mongodb+srv://barouniwael:rawdha@cluster0.hqp9anh.mongodb.net/?retryWrites=true&w=majority');

// -----------------models importation----------------//

//-------------------create express app----------------//
const app = express();
//-----------app configuration ------------------------//

const Match = require("./models/match");
const Player = require("./models/player");
const Team = require("./models/team");
const User = require("./models/user");

// send json res
app.use(bodyParser.json());
// get obj from req
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// path configuration
app.use("/images", express.static(path.join("backend/images")));
//define media type
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const configStorage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});
let matches = [
  { id: 1, scoreOne: 1, scoreTwo: 2, teamOne: "tns", teamTwo: "est" },
  { id: 2, scoreOne: 2, scoreTwo: 0, teamOne: "psj", teamTwo: "roma" },
  { id: 3, scoreOne: 1, scoreTwo: 2, teamOne: "alger", teamTwo: "marroc" },
  { id: 4, scoreOne: 0, scoreTwo: 1, teamOne: "italie", teamTwo: "espagne" },
];
let users = [
  {
    firstName: "wael",
    lastName: "barouni",
    email: "waelveto@gmail.com",
    pwd: "rawdha",
  },
  {
    firstName: "safe",
    lastName: "mhamdi",
    email: "mhamdisafe@gmail.com",
    pwd: "rawdha",
  },
];

//-------------business logic--------------------------//
// BL add match
app.post("/matches", (req, res) => {
  console.log("BL add match");
  let matchobj = new Match({
    scoreOne: req.body.scoreOne,
    scoreTwo: req.body.scoreTwo,
    teamOne: req.body.teamOne,
    teamTwo: req.body.teamTwo,
  });
  matchobj.save((err, doc) => {
    if (err) {
      res.json({ msg: "errot with DB" });
    } else {
      res.json({ msg: "match added", match: doc });
    }
  });
});
// BL edit match
app.put("/matches", (req, res) => {
  console.log("BL edit match");
  let newmatch = req.body;
  //   for (let i = 0; i < matches.length; i++) {
  //     if (matches[i].id == newmatch.id) {
  //       matches[i] = newmatch;
  //       break;
  //     }
  //   }
  Match.updateOne({ _id: req.body._id }, newmatch).then((result) => {
    console.log(result);
    if (result.modifiedCount == 1) {
      res.json({ msg: "object modified" });
    } else {
      res.json({ msg: "can't update match" });
    }
  });
});
// BL delete match
app.delete("/matches/:id", (req, res) => {
  console.log("BL delete match by id");
  let id = req.params.id;
  Match.deleteOne({ _id: id }).then((result) => {
    if (result.deletedCount == 1) {
      res.json({
        msg: `match with id:${id} deleted with sucess`,
        idDeleted: true,
      });
    } else {
      res.json({ msg: "erro while deleting match", idDeleted: false });
    }
  });
  //   let index = matches.indexOf(matches.find((match) => match.id == id));
  //   if (index != -1) {
  //     matches.splice(index, 1);
  //     res.json({ msg: "elt deleted" });
  //   } else {
  //     res.json({ msg: "id does not exist" });
  //   }
});
// BL get all match
app.get("/matches", (req, res) => {
  console.log(" bl get all matches fn");
  Match.find().then((docs) => {
    res.json({ matches: docs, msg: "ok" });
  });
});

// BL get match by id
app.get("/matches/:id", (req, res) => {
  console.log(`bl get match by id`);
  let id = req.params.id;

  // let match;
  // for (let i = 0; i < matches.length; i++) {
  //    if (matches[i].id == id) {
  //     match=matches[i];

  //     break;
  //    }

  // }
  //let match = matches.find((match) => match.id == id);
  Match.findOne({ _id: id }).then((doc) => {
    if (!doc) {
      res.json({ msg: "match introuvable" });
    } else {
      res.json({ match: doc });
    }
  });
});
// BL search match by scoreone & score two
app.get("/searchmatch", (req, res) => {
  console.log("bl search match by scoreone");
  let newTab = matches.filter((match) => {
    return match.scoreOne >= 2 && match.scoreTwo >= 0;
  });
  res.json({ match: newTab });
});
// BL search by exact score valeur
app.post("/searchvaleur", (req, res) => {
  console.log("BL serach by valeur");
  let val = req.body;
  let filtre = matches.filter((match) => {
    return match.scoreOne == val.scoreOne && match.scoreTwo == val.scoreTwo;
  });
  if (filtre.length == 0) {
    res.json({
      msg: `No matches found with scoreOne ${val.scoreOne} & scoreTwo ${val.scoreTwo}`,
    });
  } else {
    res.json({ filtre: filtre });
  }
});

// bl search by valeur in path
app.get("/search/:scoreone/:scoretwo", (req, res) => {
  console.log("BL serach by valeur by get");
  let scoreOne = req.params.scoreone;
  let scoreTwo = req.params.scoretwo;
  let val = { scoreOne: scoreOne, scoreTwo: scoreTwo };
  let filtre = [];
  for (let i = 0; i < matches.length; i++) {
    if (
      matches[i].scoreOne == val.scoreOne &&
      matches[i].scoreTwo == val.scoreTwo
    ) {
      filtre.push(matches[i]);
    }
  }
  if (filtre.length == 0) {
    res.json({
      msg: `No matches found with scoreOne ${val.scoreOne} & scoreTwo ${val.scoreTwo}`,
    });
  }
  res.json({ filtre: filtre });
});

//BL login
app.post("/login", (req, res) => {
  let user;
  //search user by email
  User.findOne({ email: req.body.email })
    .then((doc) => {
      console.log("here doc", doc);
      //if NOT OK
      if (!doc) {
        res.json({ message: "Please check your email" });
      }
      // if OK
      user = doc;
      //compare crypted pwd with req.body.pwd
      return bcrypt.compare(req.body.pwd, doc.pwd);
    })
    .then((pwdCompareReponse) => {
      console.log("here pwdCompareReponse", pwdCompareReponse);
      if (pwdCompareReponse) {
        let userToSend = {
          fName: user.firstName,
          lName: user.lastName,
          email: user.email,
        };
        res.json({
          message: "welcome",
          user: userToSend,
        });
      } else {
        res.json({ message: "Please check PWD" });
      }
    });

  //   let user = req.body;
  //   let u = users.find((u) => u.email == user.email && u.pwd == user.pwd);
  //   if (u) {
  //     res.json({ name: u.firstName, lastName: u.lastName });
  //   } else {
  //     res.json({ msg: "user does not exist" });
  //   }
});

//
// Add user (signup)
app.post( "/signup", multer({ storage: configStorage }).single("img"),(req, res) => {
    let url = req.protocol + "://" + req.get("host");

    console.log("here into BL : signup");
    console.log("file", req.file);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
      let userObj = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: cryptedPwd,
        avatar: url + "/images" + req.file.filename,
      });

      userObj.save((err, doc) => {
        if (err) {
          // console.log("here error",err.errors.properties);
          if (err.errors.email) {
            res.json({ message: "0" });
          } else {
            res.json({ message: "This field is required" });
          }
        } else {
          res.json({ message: "1" });
        }
      });
    });
  }
);
//----------------------------------------------------------------//
//get all teams
app.get("/teams", (req, res) => {
  console.log("bl get all teams");
  Team.find().then((docs) => {
    res.json({ teams: docs });
  });
});

//add team
app.post("/teams", (req, res) => {
  console.log("add team", req.body);
  let team = new Team({
    name: req.body.name,
    owner: req.body.owner,
    stadium: req.body.stadium,
    foundation: req.body.foundation,
  });
  team.save((err, doc) => {
    if (err) {
      res.json({ msg: "can not add team" });
    } else {
      res.json({ msg: "team already added ", team: doc });
    }
  });
});
//delete team
app.delete("/teams/:id", (req, res) => {
  let id = req.params.id;

  Team.deleteOne({ _id: id }).then((result) => {
    if (result.deletedCount == 1) {
      res.json({ msg: `mteam with id:${id} deleted with sucess` });
    } else {
      res.json({ msg: "erro while deleting team" });
    }
  });
});

//edit team
app.put("/teams", (req, res) => {
  console.log("edit team");
  let newteam = req.body;
  console.log(newteam);
  Team.updateOne({ _id: newteam._id }, newteam).then((result) => {
    if (result.modifiedCount == 1) {
      res.json({ msg: `mteam with updated` });
    } else {
      res.json({ msg: "can not update team" });
    }
  });
});
//get team by id
app.get("/teams/:id", (req, res) => {
  console.log(`bl get meam by id`);
  let id = req.params.id;

  Team.findOne({ _id: id }).then((doc) => {
    if (!doc) {
      res.json({ msg: "team introuvable" });
    } else {
      res.json({ match: doc });
    }
  });
});

// add player

app.post(
  "/players",
  multer({ storage: configStorage }).single("img"),
  (req, res) => {
    console.log("add player");
    console.log("file", req.file);
    let url = req.protocol + "://" + req.get("host");

    let player = new Player({
      name: req.body.name,
      age: req.body.age,
      position: req.body.position,
      nbr: req.body.nbr,
      img: url + "/images" + req.file.filename,
    });

    player.save((err, doc) => {
      if (err) {
        res.json({ msg: "can not add player" });
      } else {
        res.json({
          msg: "player added succefully",
          doc: doc,
        });
      }
    });
  }
);

//get all plyaer

app.get("/players", (req, res) => {
  console.log("bl get all players");
  Player.find().then((docs) => {
    res.json({ players: docs });
  });
});

//delete player
app.delete("/players/:id", (req, res) => {
  let id = req.params.id;
  Player.deleteOne({ _id: id }).then((result) => {
    if (result.deletedCount == 1) {
      res.json({ msg: "player deleted successfully" });
    } else {
      res.json({ msg: "player not deleted" });
    }
  });
});

//edit player

app.put("/players", (req, res) => {
  let newplayer = req.body;
  Player.updateOne({ _id: newplayer._id }, newplayer).then((result) => {
    if (result.modifiedCount == 1) {
      res.send({ msg: "player updated" });
    } else {
      res.json({ msg: "can npt update player" });
    }
  });
});

////get weather

app.post("/weather", (req, res) => {
  console.log("bl weather",req.body.city);

  let city = req.body.city;

  let apikey = "3980e3c79e0b145e3bed5fcc21ca7ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  axios.get(apiUrl).then((response) => {
    console.log("Here response", response);
    let result = {
        temp : response.data.main.temp,
        hum : response.data.main.humidity,
     icon :`http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
     wind :response.data.wind.speed,
    }
    res.json({result:result})
  });
 
});
//------------exportation du app-------------//
module.exports = app;
