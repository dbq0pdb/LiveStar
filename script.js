document.addEventListener('DOMContentLoaded', function() {
  const movieTitleElement = document.getElementById('movieTitle');
  const ratingSlider = document.getElementById('ratingSlider');
  const submitBtn = document.getElementById('submitBtn');
  const finalSubmitBtn = document.getElementById('finalSubmitBtn');
  const notesInput = document.getElementById('notesInput');
  const ratingsTableBody = document.getElementById('ratingsTableBody');
  const ratingGraph = document.getElementById('ratingGraph');
  const chartCanvas = document.getElementById('chart');

  const movieTitle = "Movie Title";
  let ratings = [];

  // Set movie title
  movieTitleElement.textContent = movieTitle;

  // Generate rating segments
  for (let i = 1; i <= 5; i++) {
    const starDiv = document.createElement('div');
    starDiv.classList.add('star');
    starDiv.textContent = i;
    starDiv.addEventListener('click', function() {
      setRating(i);
    });
    ratingSlider.querySelector('.stars').appendChild(starDiv);

    if (i < 5) {
      const notchDiv = document.createElement('div');
      notchDiv.classList.add('notch');
      ratingSlider.querySelector('.rating-bar').appendChild(notchDiv);
    }
  }

  // Set the active rating based on user selection
  function setRating(rating) {
    const stars = ratingSlider.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
    submitBtn.disabled = false;
  }

  // Handle submit button click
  submitBtn.addEventListener('click', function() {
    const rating = getActiveRating();
    const timestamp = new Date().toLocaleTimeString();
    const notes = notesInput.value;

    // Display rating in the table
    const row = ratingsTableBody.insertRow();
    const reviewNumberCell = row.insertCell();
    const timestampCell = row.insertCell();
    const ratingCell = row.insertCell();
    const notesCell = row.insertCell();
    reviewNumberCell.textContent = ratingsTableBody.rows.length;
    timestampCell.textContent = timestamp;
    ratingCell.textContent = rating;
    notesCell.textContent = notes;

    // Clear notes and disable submit button
    notesInput.value = '';
    submitBtn.disabled = true;

    // Add rating to the ratings array
    ratings.push({
      rating: rating,
      timestamp: timestamp,
      notes: notes
    });
  });

  // Handle final submit button click
  finalSubmitBtn.addEventListener('click', function() {
    if (ratings.length > 0) {
      ratingGraph.style.display = 'block';
      displayRatingGraph();
    }
  });

  // Get the active rating from the slider
  function getActiveRating() {
    const stars = ratingSlider.querySelectorAll('.star');
    let activeRating = 0;
    stars.forEach((star, index) => {
      if (star.classList.contains('active')) {
        activeRating = index + 1;
      }
    });
    return activeRating;
  }

  // Display the rating graph
  function displayRatingGraph() {
    const ratingData = ratings.map((rating, index) => ({
      x: index + 1,
      y: rating.rating
    }));

    // Create the chart
    new Chart(chartCanvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Rating',
          data: ratingData,
          borderColor: '#007bff',
          fill: false
        }]
      },
      options: {
        scales: {
          x: { 
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Review Number'
            }
          },
          y: { 
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Rating'
            },
            suggestedMin: 1,
            suggestedMax: 5,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
});
