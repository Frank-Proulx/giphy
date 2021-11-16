import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { Giphy } from './giphy.js';

$("#search").submit((event) => {
  const searchTerm = $("#searchTerm").val();
  const search = `http://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=${process.env.API_KEY}`;
  event.preventDefault();
  $("#searchTerm").val("");
  let promise = Giphy.getGiphy(search);
  promise.then(function(result) {
    const response = JSON.parse(result);
    outputGifs(response);
  }, function(error) {
    $('#showErrors').text(`There was an error processing your request: ${error}`);
  });
});

function outputGifs(response) {
  let htmlString = "";
  if (Array.isArray(response.data)) {
    for (let i = 0; i < response.data.length; i++) {
      const imgUrl = response.data[i].images.original.url;
      htmlString = htmlString.concat(`<img src="${imgUrl}">`);
    }
  } else {
    const imgUrl = response.data.images.original.url;
    htmlString = `<img src=${imgUrl}">`;
  }
  $("#outputs").html(htmlString);
}

$("#trendSearch").click(() => {
  const trending = `http://api.giphy.com/v1/gifs/trending?&api_key=${process.env.API_KEY}`;
  let promise2 = Giphy.getGiphy(trending);
  promise2.then(function(result) {
    const response = JSON.parse(result);
    outputGifs(response);
  }, function(error) {
    $('#showErrors').text(`There was an error processing your request: ${error}`);
  });
});

$("#randomSearch").click(() => {
  const random = `http://api.giphy.com/v1/gifs/random?&api_key=${process.env.API_KEY}`;
  let promise3 = Giphy.getGiphy(random);
  promise3.then(function(result) {
    const response = JSON.parse(result);
    outputGifs(response);
  }, function(error) {
    $('#showErrors').text(`There was an error processing your request: ${error}`);
  });
});
