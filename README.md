# Design Rationale
## Overview
The dataset we chose was from the Data and Story Library, which was a txt file of cleaned data scraped from Encyclopedia Titanica’s website. It included all passengers and crew aboard the Titanic, including their name, age, what class of passenger or crew they were, if they survived, and where they boarded the Titanic. The Titanic is a story that many know from the 1997 movie featuring the fictional characters Jack and Rose, but this dataset gave us an opportunity to tell the real stories of the individuals on board. 

In addition to exploring the question of “Who were the passengers on the Titanic?”, we also wanted to explore “Who was more likely to survive?” After researching the tragedy of the Titanic that took many lives, we discovered that women and children were prioritized to board the lifeboats first. Through Tableau, we also found that first class passengers were roughly 44 percent more likely to survive than other passengers. Thus, we wanted to create a visualization that would allow users to explore more in depth what demographics were more likely to survive the crash. 

Our two main goals were telling an engaging story and exploring who was most likely to survive a crash. To accomplish these goals, we decided on a two part visualization: we aimed to create a scrollytelling visualization with the martini glass design principle in mind to let users explore the dataset in a final unit visualization on their own once they have been guided through some exploration. 

## Data Pre-processing

The preprocessing and cleaning of the original Titanic .txt file was done using pandas in a jupyter notebook, resulting in the titanic.csv file in our data folder. Most of the processing was for three main categories: name, age, and link to biography. For names, we parsed the original messy full name column into three separate columns: first name, last name, and title. For ages, we learned that there were three adults without an age value, so we did some online research to estimate their approximate age. For links to a biography, we first used Beautiful Soup to scrape all the links from the Encyclopedia Titanica Website, and then compared passenger names to all the links in order to find a biography url for each passenger. 

## Scrollytelling

Scrolling is a low level interaction that has one of the lowest barriers of entry of all user interactions and also allows the user to walk through a story. Therefore, we chose to use scrollytelling using the Scrollama library to tell the story of the Titanic. We built our narrative around the crash hitting the iceberg, therefore we split our scrollytelling into three sections: before the crash, the crash itself, and the aftermath of the crash.

Before the crash, we wanted to focus on the users getting used to the scrollytelly and the unit visualizations, guiding them with a prominent example, Rose, from the movie. We chose to use a unit visualization and not aggregate data to make the visualization more personal and representative of each person. Then, we wanted the users to attach more human meaning to the squares by guiding them through the journey of the passengers getting onto the ship. This also emphasized the journey before the iceberg, highlighted by the progress of the journey to the left of the units. Finally, we added some color to show the breakdown of the ship to get the user to understand who the passengers of the Titanic were.

The crash we decided to change color schemes from light to dark, marking a difference in our narrative and underscoring the severity of how many lives were lost due to the crash. We also highlighted the crash using audio to make the user more immersed in the story.

After the crash, we decided to walk the user through some of the most prominent demographics and areas of the data that we noticed in exploratory data visualization. 

## Final Unit Visualization

We wanted a visualization that opens up the martini glass for viewers to explore the data more in depth. Here is where they can spend time looking through the passengers with respect to the demographics of gender, class, and age. 

For the overall structure of the visualization, we wanted to keep it consistent with the ending of the scrolly telly with the passengers who died vs. survived separated out into two graphics. One design feature we considered was having a toggle button so that the user can switch back and forth between the separated out graphic and the original graphic where all passengers were together. However, we thought this wouldn’t add much to our visualization or significant meaning to data exploration. Having the graphic permanently separated out into died vs. survived also adds to the realistic theme we have because it emphasizes how the effects of the crash were lasting and devastating. We wanted the user to focus the most on the exploration of the demographics of the passengers who were lost and those that were saved.

One main filter feature we included was allowing the viewer to track their favorite titanic character. The user can choose from four preset characters displayed in a slideshow. We hoped that including the person’s photograph could provide a more personal connection to the passengers of the dataset and engage viewers to play around with the filters more. If a user selects a character, that character’s square will be outlined and visually tracked as they navigate the other filters. To promote interaction, the slideshow loops through the possible characters users can choose from.

Beyond tracking characters, the main interactive filters we added were gender, class, and age. While we thought about including other filter categories, it seemed like a simple and clean design would be less distracting and more direct in communicating the story of the passengers on the titanic. In fact, one thing that surprised us while we were playing around with our visualization was that there were a lot more men on board than women. For the gender and class filter, we kept it as it appeared within the dataset. For the age filter, we binned the ages to match four age ranges: children, young adult, middle age, and elderly. We chose to do this (as opposed to a slider for all age ranges) to maintain ease of use and interpretation while still offering sufficient interactivity. Another way we kept the visualization simple while informative was using one color for highlighting for filtered passengers in those who died and another for filtered passengers in those who survived instead of having a unique color for each filter. This is because the filter itself doesn’t matter as much as the comparison between who survived and who died. We thought that having too many colors would actually take away from the encoding rather than help the viewer better understand the data. We do highlight the active filters in a title at the top to help make it more clear what the viewer is filtering for. Users can interact by checking as many or as little filters as they wish and watching how the visualization updates. Comparisons can be made between the different filters themselves as well as between the two graphics. In order to make it more clear to the user how they can interact with the visualization, we have on-hover color/style changes and visual cues (i.e. darkening of inactive filters and square not filtered). 

Finally, for the animations of the final unit visualization, we went with a transition that appeared to flow down the graphic like water. We hoped that this added to the titanic theme and made the visualization more appealing and fun for the user. As for other styling, we chose to stay consistent with the old fashioned font, colors, and overall theme. 

## Other Interactions

Throughout our visualization we also decided to have two main forms of interaction: tooltips and modals. Anywhere in our visualization users can hover over each square and a tooltip with the person’s name and age pops up so users can learn basic information about individuals at a glance. This creates continuity from our scrollytelling to our final visualization and also stresses the personal aspect of the data- each square correlates to a real person. Having the tooltip allows for the user to quickly and easily explore how each square correlates to a person.

Additionally, at the beginning of our scrolly telly, we incorporated a timeline of the locations for titanic stops as passengers are being picked up. Users can click on each location in order to automatically scroll to the place in the story and unit visualization that reflects the number of passengers at that location. This interaction gives the user ownership over exploring this part of the titanic journey. Although the scrolly telly story is mostly driven by the visualization creators, this clickable timeline gives the users a taste of driving their own data exploration, which is something they will have the opportunity to do a lot more in the final unit visualization.


For the modal, anywhere in our visualization users can click on each square to open a pop up with the name, whether they survived or not, their gender, age, class passenger or crew, job, boarding location, and a link to read their bio on Encyclopedia Titanica. This allows users who are very interested in the stories of certain individuals to continue their reading and discovery on a different website, letting the exploration continue even beyond this visualization.

## Additional Features

We chose to add a sound element to our visualization to create a more immersive experience. One of our two main design goals was to tell a story- we used the crash sound at the crash in the scrollytelling to emphasize the magnitude of the crash and we used music playing on the ship to add to the emotional aspect of the tragedy. 

# Development Process

## Overview

We started off by independently exploring various datasets before coming together and sharing our findings. After a few iterations of this, we chose a dataset we were the most passionate about-- titanic dataset! Next, we brainstormed what features we wanted to include and how we wanted to tell the story. We designed and styled the scrollytelling and final visualization together to have a cohesive idea of the overall visualization. 

## Work Split

Jessica worked on the scrollytelling aspect of the visualization, primarily focusing on using D3 to render the grid and filter for different demographics. She also worked on styling.

Shirley worked mainly on the final unit visualization, focusing on the two graphic displays, transitions, and implementation and styling of filters. I also helped out with styling and transitions of the first part of the scrolly telly. 

Annie worked on preprocessing the data, the timeline interaction at the beginning of the scrolly telly, overall styling and themes, adding the music and the crash audio, and filtering for different demographics of the final visualization.


## Time

Jessica: I spent about 3 hours finding datasets, 2 hours discussing datasets and inspiration with Annie and Shirley, 1 hour designing the overall visualization with Annie and Shirley and around 25 hours coding. 

Shirley: I spent about 2 hours looking at datasets, 2 hours brainstorming with Jessica and Annie to choose a dataset, 1 hour planning the overall visualization with Jessica and Annie, and around 30 hours coding.

Annie: I spent about 3 hours looking for datasets, 2 hours cleaning and preprocessing the data, 2 hours designing, sketching, and discussing ideas for the visualization with Jessica and Shirley, and ~28 hours coding.

# Sources

Data from: https://dasl.datadescription.com/datafile/titanic/?_sfm_cases=500+59943&sf_paged=6 and http://www.encyclopedia-titanica.org 

Final Visualization Inspiration: https://fivethirtyeight.com/features/gun-deaths/ 

Scrollytelling Inspiration: https://www.nytimes.com/newsgraphics/2013/10/13/russia/index.html 




