Fancy Queries
=============

Fancy queries is a jQuery plugin that provides a fancy search widget. To turn your widget into a fancyquery widget, just call the .fancyQueries() method on it.

 The actual html markup should look like this:
 
 <div class="search fancyqueries" data-url="/get/stored/list">
  <input type="text"><button>Search</button>
 </div>
  

The reason I avoided using type="search" is various styling issues on webkit I wasn't able to work around. 
