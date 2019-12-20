const mongoose = require("mongoose");
const Customer = require("./src/models/customer");
const Identifier = require("./src/models/identifier");

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

const createCustomer = (name, age, gender) => {
  const customer = new Customer({
    name,
    age,
    gender
  });
  return customer.save();
};

const createIdentifier = (cardcode, customerId) => {
  const identifier = new Identifier({
    cardcode,
    customerId
  });
  return identifier.save();
};
createCustomer("sidney", 25, "male").then(customer => {
  console.log(customer);
  const customerId = customer._id.toString();
  createIdentifier("wwnhdhdklkasl", customerId).then(identifier => {
    console.log(identifier);
  });
});

const showAllIdentifiers = async function() {
  const identifiers = await Identifier.find()
    .populate("customer", "-_id -__v")
    .select("-__v");
  console.log(identifiers);
};

showAllIdentifiers();
