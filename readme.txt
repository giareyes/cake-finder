-------Base code from Introduction to Computer Graphics: a Practical Learning Approach-------
-------------------F. Ganovelli, M. Corsini, S. Pattanaik, M. Di Benedetto-------------------

CAKE FINDER
by Gia Reyes

HOW TO PLAY: open cake_finder.html in your browser.
Controls:
W - move forward
A - turn left
S - move backward
D - turn right


OBJECTIVE: You're a very hungry girl and you don't have any food to snack on at home. Find the piece of cake
that's somewhere in your neighborhood.

But be careful!! There is a monster coming for you!!! Make sure you get the cake before it catches you!!!


MAP: If you would like to see an aerial view of the map, open map.html !! (The cake does NOT appear on the
map, so you can't cheat!)

MACHINE USED TO WRITE/RUN THIS CODE:
Operating System: MacOS 10.13.5, Browser: Google Chrome

REPORT:
This project is my final project for CPSC 478: Computer Graphics. Cake Finder is built off of Ganovelli's
"Introduction to Computer Graphics: a Practical Learning Approach" envymycar code. In this game, you control
a girl who is navigating through her neighborhood at night. Your objective is to find a slice of cake that is
somewhere on the map. The piece of cake spawns in one of 6 predefined spots as you start the game, so the game
isn't exactly the same every time you play it. The challenging features I coded into this game were collision
detection and animation hierarchy. For collision detection, I assigned masses to the girl, trees, buildings,
and the edge of the map. When the girl bumps into any obstacle, since they are very large and heavy, they do
not move, but the collision changes her velocity and bumps her backwards. For animation hierarchy, the girl
moves as the user controls her with the W A S D keys, but as she walks, her legs and arms move relative to her
body. In particular, while motion is only coded for the upper parts of each of her arms, since they are drawn in
a hierarchy, her whole arm moves as she walks.

When you find the cake and walk close to it, the game ends and you win. you will then be asked if you want to play
again. If you select "Ok", the game restarts and the cake is spawned somewhere on the map. If you click "cancel,"
the window will close.

Screenshots of the game can be found in the folder titled "screenshots". A brief description of each screenshot:
0_start.png: what the game looks like when you begin
1_forest.png: a screenshot of what it looks like when the girl is in the forest
2_cake.png: a screenshot of what the cake looks like
3_winning.png: the popup that comes up when you win the game!
4_restart.png: the prompt after you win that lets you either restart or close the window
5_shadow.png: the monster that's coming for you
