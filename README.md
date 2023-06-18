# carrot-movie-search
# there is index.html file inside the root directory and when clicked it will display the movie web app
# When you open the HTML file in a web browser, you should see the movie search web app with the search input field and button at the top. 
# Enter a movie title and click the search button to fetch movie data from the OMDb API and display the search results. 
# Each movie result will include the movie title, poster image, release year, and a button to view more details. 
# Clicking the "View Details" button will show an alert with basic movie details which include Title,Year,Plot summary, Genre,
# The search result will throw error no moview found if the movie being searched cant be found
# Equally, an error will be displayed which  An error occurred. Please try again,if there is an issue with Api
# If empty field is submited, an error message Please enter a movie title will be displayed .
# I used container and row to display the movies. There are three movies in each row.
# Load More button is used to display more movies of the same result if the movie exceeds three 
# Load more button wont be available if no more movie of the same result is found.Load more button appears only when there are still more movies to load.
# We have movie.js whcih handles the functionality of consuming the api from omdapi
# Inside the forEach loop, new elements such as li, div, img, a, h6, span, and others are created and appended to the appropriate parent elements.

