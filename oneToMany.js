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
    console.log(tutorial);
    return tutorial;
  });
};

const createCategory = category => {
  return db.Category.create(category).then(category => {
    console.log(category);
    return category;
  });
};

const addTutorialToCategory = (tutorialId, categoryId) => {
  return db.Tutorial.findByIdAndUpdate(
    tutorialId,
    { category: categoryId },
    { new: true, useFindAndModify: false }
  );
};

const getTutorialsInCategory = categoryId => {
  return db.Tutorial.find({ category: categoryId }).then(tutorial => {
    return tutorial;
  });
};

const run = async () => {
  var tutorial = await createTutorial({
    title: "one to many database relationship",
    author: "sidney"
  });

  var category = await createCategory({
    name: "nodejs",
    description: "node.js tutorial"
  });

  tutorial = await addTutorialToCategory(tutorial._id, category._id);
  console.log(tutorial);

  tutorial = await getTutorialsInCategory(category._id);
  console.log(tutorial);
};

run();
