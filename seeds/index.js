const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL

console.log(process.env);
mongoose.connect(dbUrl);


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 350; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '652f42f58e202e6b79feb115',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dook806qg/image/upload/v1697495253/YelpCamp/jv0wta7lpcxmsfsnt479.jpg',
          filename: 'YelpCamp/jv0wta7lpcxmsfsnt479'
        },
        {
          url: 'https://res.cloudinary.com/dook806qg/image/upload/v1697495253/YelpCamp/hybllj2k1lznyibfwyxe.jpg',
          filename: 'YelpCamp/hybllj2k1lznyibfwyxe'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})
