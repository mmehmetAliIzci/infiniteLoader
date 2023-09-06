# Problem:



My first approach was creating a list component that does the heavylifting regarding fetching and rendering. Then i realized the component must be generic and render anything passed to it. 

This made me use generic tpyes and actually pass the parameters to the component itself.

REVISE: Then i start applying the scroll event via handleScroll. Checks window.innerheight+ amount of y scrolled is bottom or not. Then do a fetch data. Then i thought about debouncing the fetch data function so that we dont have to call fetch all the time.

Then i came across with Intersection Observer api