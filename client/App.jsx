import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import axios from 'axios';

import Stats from './components/Stats.jsx';
import Sort from './components/Sort.jsx';
import ReviewsFeed from './components/ReviewsFeed.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalScore: null,
      totalReviews: 0,
      sortedValue: 'highestRating',
      reviewsArray: [],
      showReviews: 3
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/api',
      method: 'GET',
      success: (res) => {
        this.setState({
          totalScore: this.state.totalScore,
          totalReviews: this.state.totalReviews,
          sortedValue: this.state.sortedValue,
          reviewsArray: res,
          showReviews: this.state.showReviews
        });
        console.log(this.state.reviewsArray);
      }
    })
  }

  loadMore() {
    this.setState({
      totalScore: this.state.totalScore,
      totalReviews: this.state.totalReviews,
      sortedValue: this.state.sortedValue,
      reviewsArray: this.state.reviewsArray,
      showReviews: this.state.showReviews += 3
    });
  }

  // Handle Sorting Change
  handleSortChange(dropDownValue) {
    if (dropDownValue === "highestRating") {
      var sortedArray = this.state.reviewsArray.sort((a,b) => {
        return b.rating - a.rating;
      })} else if (dropDownValue === "newest") {
          var sortedArray = this.state.reviewsArray.sort((a,b) => {
          return new Date(b.fecha) - new Date (a.fecha);
        })} else if (dropDownValue === "oldest") {
          var sortedArray = this.state.reviewsArray.sort((a,b) => {
          return new Date(a.fecha) - new Date (b.fecha);
        })} else if (dropDownValue === "lowestRating") {
          var sortedArray = this.state.reviewsArray.sort((a,b) => {
          return a.rating - b.rating;
        })} else if (dropDownValue === "mostHelpful") {
          var sortedArray = this.state.reviewsArray.sort((a,b) => {
          return this.state.reviewsArray.indexOf(b) - this.state.reviewsArray.indexOf(a) // Come back and add logic later
        })} else if (dropDownValue === "leastHelpful") {
          var sortedArray = this.state.reviewsArray.sort((a,b) => {
          return this.state.reviewsArray.indexOf(b) - this.state.reviewsArray.indexOf(a)  // Come back and add logic later
        })}
    this.setState({
      totalScore: this.state.totalScore,
      totalReviews: this.state.totalReviews,
      sortedValue: this.state.sortedValue,
      reviewsArray: sortedArray,
      showReviews: this.state.showReviews
    })
  }

  render() {
    return (
      <div id="container">
        <h2 id="componentTitle">Customer Reviews</h2>
        <Stats handleSortChange={this.handleSortChange.bind(this)}/>
        <ReviewsFeed reviewsArray={this.state.reviewsArray} showReviews={this.state.showReviews}/>
        <button id="loadMoreButton" onClick={this.loadMore.bind(this)}>Load More</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('customerReviews'))