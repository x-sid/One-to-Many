const db = require("./src/models");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sidney:sidney55@cluster0-of6ko.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("server running...")
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch(error => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

const createTutorial = tutorial => {
  return db.Tutorial.create(tutorial).then(tutorial => {
    return tutorial;
  });
};

const createImage = (tutorialId, image) => {
  return db.Image.create(image).then(image => {
    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          images: {
            imageId: image._id,
            url: image.url,
            caption: image.caption
          }
        }
      },
      { new: true, useFindAndModify: false }
    );
  });
};

const run = async () => {
  var tutorial = await createTutorial({
    title: "how to use one to many mongodb relationship",
    author: "sidney"
  });

  tutorial = await createImage(tutorial._id, {
    path: "./images/special/pics/pic.png",
    url: "/pics/node.png",
    caption: "node pics"
  });
  console.log(tutorial);
};

run();
