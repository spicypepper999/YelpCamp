const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.ceil(Math.random() * 5000);
        const campground = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/3293100',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam sequi, tenetur quo fugiat excepturi expedita, odio impedit ea illum nulla labore aliquid harum pariatur! Officiis facilis repellat numquam consequuntur eligendi?',
            price: price
        });
        await campground.save();
    }
}

seedDB().then(() => {
    console.log("DB seeded!");
    mongoose.connection.close();
});