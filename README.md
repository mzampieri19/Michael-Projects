# Repository for personal coding projects I have created. Author: Michelangelo Zampieri 

## This repository Includes the following projects: 

---------------------------------------------------------------------------------------------------------

### Anniversary_Gift: 

- I downloaded all of my girlfriend's and I texts on iMessage over the two years we have been together, and analyzed some statistics about them, I presented her the findings in a poster I created using Canva.

- For this project I started by using a third party software to download the texts in a csv file. I then created a java class to read the csv file and a main class to hold the main functions to determine certain patterns in the texts. MainClass hols the different functions to analyze the different parts of the texts, including: most used word, phrase, emojis, the most texts in a day, who sends the most texts, and other metrics. DateTest.java was used to test the date import as I had never used it before. 

- This project helped me get a strong foundation for file reading and information extraction. If I could do it again I would work more on the paster itself as it would be a great way to practice more html and css. 

---------------------------------------------------------------------------------------------------------

### Budget 

- In this project I aimed to get a sense of my own spending habits to try and see if maybe there were ways I could save money. I began by downloading my credit card transactions from their respective banks into csv files. 

- I started this project by combining all the transactions for each credit card into a large file for each type of card. I did this by copying and pasting but I realize now that I could have used pandas method concat to make it easier. I then combined all of the different csv files into a combined transaction file; I did this through the combine.py file. I then started to filter the information that I wanted to keep, I did this with the filter.py method which has different functions for the different card types, as they hold different information. Again I think this could be done more easily with pandas methods but I am unfamiliar with the exact methods. 

- I decided to try a new approach for this project. I started over in a jupyter notebook, and tackle the problem with a machine learning lens. I decided to start over and begin a simple model traiing with the data. I began by loading all the transactions into respective data frames and then began cleaning the data. 

- I was able to combine all the information into a unifed dataframe, when doing so, however, I realized that the data collected (both columns and row wise) would not be enough to train a model. I decided to end this project here; altought I did not achieve what I had in mind I still consider this project a success. Through working on this budget I gained alot more experiance working with pandas dataframe, its methods, cleaning data, and jupyter notebooks. 

---------------------------------------------------------------------------------------------------------

### Dialysis_Tracker_App

### Work in Progress

- I just recently got this idea for an app that helps dialysis patients (including myself) keep track of important factors of their health. Some of the ideas for functions of the app include: 

1. Food Scanner: This would be similar to scanners used in dieting apps, such as weight watchers, but the difference would be that the app gives you information about the food's phosphorus and potassium contents, as those are the primary things dialsysis patients should avoid. 

2. Dialysis Center Finder: A quick map that would find centers that are available and in network for users when planning to travel. Finding a center is critical as travel is not possible otheriwse. 

3. Liquid Intake Tracker: Users would insert their target weight as instructed by physician, and their daily liquid limit. The app helps track how much liquids have been consumed in the day and how much they have alloted for the day. I was also thinking of adding "weight check ins" in which the user could enter their current weight and the app would tell them how much liquids they can expect to take off during their next session. 

4. Calander: A simple calander to track when their dialysis appointments are to better meange treatments, can also send reminders beforehand. 

5. Tratment Summary: A quick summary of each treatment, asks some questions and guages how it went based on given info, can aoso be used in liquid tracker to see what the weight should be.

6. Blood Preasure: If user connects a watch would be able to measure and record their blood pressure and heart rate, this can be useful in tracking users blood pressure, unsure of this feature for now. 

### Edit History 

- 6-18-24: Created the neccessary files using npm and created teh envoirment to begin building the app. Also began to think of how I want the app to look like with the page layout and general style. Began working on the tab navigations. Added a bit of style to the tabs and made them work.

### Took a puse for around a week to focus on my summer courses.

- 6-30-24: Rearranged some of the app files, also added icons to the tab navigator and began wokring on the background async storage with a simple log in and log out screen. Tested the async by adding the user name on another screen. Seems to be working well 


- 7-4-24: Began working on the liquid tracking page, got some good progress done today, added basic text and style and created 3 other sub components, liquid card, which displays the information and gives them some editing options (thos options are still a work in progress), a calender, which lets them pick different dates to change the data, and a circular progress, which is a circle that fills up based on how much have left to drink. So far the app has a few bugs, mainly the exchange button causes the falt list to dissapear. Second the app does not change between days yet, one day will carry over to the other which is not idea, ill try to do it in an index based form next where everything is in an arry based on the date. 

- 7-6-24: Was able to get the calendar to woek by indexing with the date into a dictionary with an array as value. Now each date has its own information. There are still a few bugs, mainly: persistant storage does not fully work, only one date gets stored for some reason. Second, the daily total and progress do not update correctly, they only update after two entires are inserted, I think this is an issue with how im classing use Effect. 

- 7-7-24: Able to get persistance working, data is saved for individual days when app is closed and reopened. Having the same issue with updates not being fully integrated, until two entries, this only happened near the end, worked throughout the seesion, might be something to do with how im calling use effect. Added some buttons as well and settings which will control some constants in the app and got the reset and exchange working. 


---------------------------------------------------------------------------------------------------------

### More projects to be added!
