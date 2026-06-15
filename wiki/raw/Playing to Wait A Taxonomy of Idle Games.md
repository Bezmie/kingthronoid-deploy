# Playing to Wait: A Taxonomy of Idle Games

## Sultan A. Alharthi,^1 Olaa Alsaedi,^1 Phoebe O. Toups Dugas ,^1 Theresa Jean Tanenbaum,^2 Jessica Hammer^3

(^1) Play & Interactive Experiences for Learning Lab, New Mexico State University, Las Cruces, NM, USA 2

## Transformative Play Lab, Department of Informatics, University of California, Irvine, CA, USA 3 HCI

## Institute / Entertainment Technology Center, Carnegie Mellon University, Pittsburgh, PA, USA

## {salharth, olaa}@nmsu.edu, phoebe.toups.dugas@acm.org, ttanen@uci.edu,

## hammerj@andrew.cmu.edu

```
Figure 1. Sample of idle games featuring different styles of gameplay, interaction, and graphical or text interfaces. From left to right:Cookie Clicker
[G50],AdVenture Capitalist[G38],Kittens Game[G16],Clicker Heroes[G66], andCow Clicker[G39]. Screenshots takencbauthor Alharthi.
```
```
ABSTRACT
Idle games are a recent minimalist gaming phenomenon in
which the game is left running with little player interaction.
We deepen understanding of idle games and their characteris-
tics by developing a taxonomy and identifying game features.
This paper examines 66 idle games using a grounded theory
approach to analyze play, game mechanics, rewards, interac-
tivity, progress rate, and user interface. To establish a clearly
bounded definition of idle games, we analyzed 10 non-idle
games with the same approach. We discuss how idle games
move players from playing to planning, how they question
dominant assumptions about gameplay, and their unusual use
of resources such as player attention and computer cycles. Our
work illuminates opportunities for the design of idle games,
suggests design implications, and provides a framework for
researchers to clearly articulate questions about this genre.
```
```
ACM Classification Keywords
H.5.m. Information Interfaces and Presentation (e.g. HCI):
Miscellaneous
```
```
Author Keywords
Idle games; clicker games; incremental games; taxonomy;
playing; waiting; planning; game design; grounded theory.
INTRODUCTION
Idle gamesare a minimalist gaming phenomenon that have
gained popularity in recent years [34, 37, 60]. These games
```
```
Permission to make digital or hard copies of all or part of this work for personal or
classroom use is granted without fee provided that copies are not made or distributed
for profit or commercial advantage and that copies bear this notice and the full citation
on the first page. Copyrights for components of this work owned by others than the
author(s) must be honored. Abstracting with credit is permitted. To copy otherwise, or
republish, to post on servers or to redistribute to lists, requires prior specific permission
and/or a fee. Request permissions from Permissions@acm.org.
CHI 2018, April 21–26, 2018, Montreal, QC, Canada
©2018 Copyright is held by the owner/author(s). Publication rights licensed to ACM.
ACM 978-1-4503-5620-6/18/04... $15.
DOI:https://doi.org/10.1145/3173574.
```
```
are typically played in web browsers, on mobile devices, or
on a PC. Players progress with minimal-to-no interaction. Idle
games usually involve repeating a simple action (e.g., clicking,
rubbing, tapping) to accumulate resources as acore mechanic,
an action that is regularly performed in play [55]. Most idle
games also include mechanics that automate gameplay so the
game progresses by itself [50]. Although the interactions are
simple, players find these games rewarding [28, 37].
```
```
Comparing games or connecting them to a genre is among
the most common ways to describe games [20, 36]. However,
the choice of features on which to compare games is key. For
example, one might connectCookie Clicker[G50] andCow
Clicker[G39] because they are controlled with nothing but a
click. On the other hand,Cow Clickerallows the player to
click once every six hours, while inCookie Clicker, the player
can click at any time and is encouraged to do so frequently. If
we look at the core interaction, the games appear similar; if
we analyze them temporally, they are different.
```
```
Existing taxonomies of game genres define relationships [1, 4,
20, 43, 53, 67]. However, these taxonomies typically focus on
player interaction and choice. Unlike most other digital games,
idle games are primarily played bynot playing. Existing
taxonomies of digital games are therefore unlikely to help
discover the salient features of idle games.
```
```
We cannot rely on prior definitions from the community of
designers and players to help disambiguate the features of
idle games, as many terms are used interchangeably. Idle
games as a genre are also referred to asambient,incremental,
clicker, andbackgroundgames. These terms are used by
designers, gaming platforms, and players to signify differences
between idle games, particularly as the popularity and number
of these games has increased dramatically [34]. However,
there is no agreement in the gaming community about what
```
```
Most up-to-date version: 11 / 30 /202 3
```

```
key differences are indicated by these terms. Although a small
number of research papers address “idle games” [18, 50], a
growing corpus uses other terms [7, 9, 21, 37, 70].
```
We therefore propose the following research questions:

```
RQ1:What are the essential features of idle games?
```
```
RQ2:How do these features cluster to produce different
game types?
```
```
RQ3:What are the design implications of each type?
```
```
In answering these questions and developing design implica-
tions, we aim to support researchers and designers in creat-
ing, using, and analyzing data from idle games. The lack of
precision in describing and classifying idle games makes it
challenging for researchers to make progress understanding
them, and for designers to explore new approaches to the genre.
Taxonomic work, such as Mueller et al.’s work on exertion
games [43], facilitates both of these activities.
```
We expect the taxonomy to support designers (and researchers-
cum-designers). As idle games rise in popularity, there is value
in considering not just designing them in isolation, but also as
synergistic to other “standard” games and gamified systems,
where they could supplement play in the long term. We also
argue for responsible and sustainable approaches to the design
of these games.

```
To answer the research questions, we analyze existing idle
games through grounded theory. We choose to analyze games
as our main source of data because there is relatively little
literature that addresses idle games (e.g., [18, 37, 50]). Expert
analysis of games as artifacts is likely to be most revealing.
```
We start by reviewing the history of idle games and other
background. We describe our methodology for selecting, ob-
serving, and analyzing idle games through grounded theory.
In our results, we present a taxonomy of idle games, define
each category, and present an interactivity spectrum for idle
games. We close with discussion and design implications.

```
In the present research, we provide a ludography for the games
considered as part of our dataset. When we cite a game, it is
prefixed with a “G” (e.g., [G16]).
```
**BACKGROUND**
We open with a history of idle games. We then discuss prior
video game taxonomies and identify how they fall short for
idle games. A section on game design establishes terminology
for the remainder of the paper.

**History of Idle Games**
Idle games can progress with minimal or no player interaction
[18,34,37,50]. Many of these games involve repetitive clicking
or tapping to accumulate resources and the ability to automate
gameplay [48, 50, 60].
A precursor to idle games arebots(i.e.,AI agents): automated
computer players that act as if controlled by a human [40, 69].
Angband[G2], one of manyRogue-like games that involve
playing through a procedurally generated adventure, is de-
signed for human players, but can accommodate a bot, like

```
AngbandBorg [15]. Borg can control the game and progress
without the player [69]. Bots are not limited to single-player
games. InWorld of Warcraft[8], farming bots help the player
automate resource collection (e.g., TheNoobBot [62]).
```
```
In 2002, Progress Quest [G25] became one of the first
games specifically designed to be played non-interactively.
InProgress Quest, the player defines a fantasy avatar, then
watches as the game plays itself, describing how the avatar
advances over time. Similar games, with which the player
only interacts during a setup phase, includeConway’s Game
of Life[G47] andGodville[G31].
```
```
Ambient Quest[G58], in 2006, integrated concepts from
Progress Questwith pervasive play [21]. Pedometer data was
used to control avatars in a digital game. While the designers
had intended the game to use data generated by players’ ordi-
nary activities, with no special game-based interaction, they
found that players changed their behavior because of the game
(e.g., cheating by shaking the pedometers [21]).
```
```
In 2010, Bogost releasedCow Clicker[G39] as a satire of then-
prevalent social media games that used waiting to incentivize
players to get help from friends [9].Cow Clickergave the
player a point each time they clicked a cartoon cow, limited to
one click every six hours. The game was a hit, despite Bogost’s
intent to reveal the ridiculousness of the mechanics [9].
```
```
Cookie Clicker[G50], which integrated features ofProgress
QuestandCow Clicker, gained instant popularity in 2013 and
pushed the genre into the mainstream [70].Cookie Clicker
offers a smoothly animated, highly graphical interface: the
player starts clicking on a cookie image to “bake cookies” at
the rate of one cookie per click, which are used to buy charac-
ters and buildings that increase the automatic cookie produc-
tion rate. However, text-based games such asKittens[G16]
andCandy Box ![G5] demonstrate that polished graphics are
not necessary for the continued development of the form.
```
```
As of this writing, idle games have moved from curiosities and
parodies into a healthy and growing genre [18]. For example,
Clicker Heroesgained instant popularity, reaching Steam’s top
ten most played games in 2015. While idle games began on
PCs and were driven by mouse clicks, a number of well-known
idle games have mobile versions and use tapping as a core
interaction (e.g.,Cookie Clicker[G50],Clicker Heroes[G66]).
```
```
Video Game Taxonomies
One method for organizing knowledge about video games is
through creating taxonomies. This method presents an ordered
classification, based on common properties, in which games
are categorized according to genres and sub-genres [20, 44, 67].
```
```
One of the first digital game taxonomies was developed by
Crawford [16], which was influenced by Caillois’s taxonomy
ofplay formfor physical games [12]. He divided games into
two main categories:skill-and-actiongames, which empha-
size perceptual and motor skills, andstrategy games, which
emphasize cognitive efforts. These categories are broken down
to describe groups of games with different characteristics.
```
```
Since then, a number of taxonomies have been proposed to
categorize games based on gameplay and interaction [1, 4, 43];
```

```
types of challenge [53]; and narrative, aesthetics, and mood
[20]. These taxonomies enable researchers and developers to
have a clear understanding and an overview of each genre, its
expectations, and interface designs that work well.
```
**Challenges in Identifying Idle Games**
Purkiss and Khaliq define idle games as games that support
“leaving the game running by itself for long periods of time”
[50, p1]. The authors propose that the termsincremental,
ambient, orclickergames refer to the same game type, while
zero-player gamesare a sub-type of idle games.

```
An examination of how these terms are used by other authors
suggests that these terms are, in fact, not identical, nor used
identically by other researchers. Deterding usesidleandin-
crementalinterchangeably [18], while industry researchers
Quantic Foundry use the termsidleandclicker, but notincre-
mental, when describing the same set of games [70]. However,
clickeris sometimes treated as independent ofidleand can
be used as a separate descriptor of genre [9, 28]. Adding to
the confusion, the term “clicker games” is also used for games
involving classroom clickers, which are small devices used
by students to interact in classrooms, especially to answer
quizzes, in real time [10].
```
```
Zero-player gamesare formally defined as games “for which
no human involvement is required” [7]. The authors define
four subtypes of zero-player games, including games where
the player intervenes only during setup (e.g.Progress Quest
[G25]) and games that fully play themselves.
```
Ambient games, whose name is derived from ambient music,
reduce player interaction by remaining in the background
while the player does other things [21]. In these games, the
player can easily switch between the game as a background
activity, which occupies the peripheral attention of the player,
and another task which is occupying most of their focus.

```
Finally,background gamesare defined as games “where the
majority of the work happens while the player is not play-
ing” [37]. Keogh and Richardson discuss how social and
background games are ambient in nature: they embed them-
selves within the player’s everyday life [37]. The authors argue
that “background” and “idle” games are used interchangeably
to account for the phenomenon ofwaiting as playing.
```
```
As an illustration of the confusion generated by these multiple
terms, consider the case ofCow Clicker. Is it the first clicker
game? An idle game and a clicker game? An idle game and
an incremental game? Does it remain in the background such
that it is played ambiently? Perhaps the only thing the state
of the field allows us to confidently state is thatCow Clicker
is not a zero-player game, as it allows the player to interact
with a click every six hours. It is this uncertainty we seek to
resolve with our present work.
```
```
Game Design
Prior game taxonomies are constructed through deep investi-
gations of game mechanics, gameplay, and interfaces. Salen
and Zimmerman [55] characterize games as interconnected
systems ofrulesandplay. Rules are the boundaries that con-
strain player action: logical and mathematical structures of the
```
```
game. Play is the freedom to make decisions within the rules.
Game mechanicsare the designed choices a player makes,
resulting in an observable outcome [2, 55]. Mechanics that are
repeatedly invoked, and that affect the underlying subsystems
of the game in important ways, are thecore mechanics. For
example, idle games are characterized by core mechanics of
clickingto generate or spend resources, andwaitingfor the
right time to act [50].
```
```
As this example suggests, game mechanics often affectre-
sources. Resources are elements that are controlled by, and
can be manipulated by, a player [57]. Resources can be ac-
quired or lost, either through player action or for reasons
outside of the player’s control. They can also typically be used
to manipulate other parts of the game directly or indirectly.
```
```
Managing resource accumulation and spending is a critical
part ofgame balance. If resources are accumulated faster
than they are spent, the player will never experience scarcity
or need to make difficult decisions about how to use limited
resources. If the player can never earn enough resources to
influence the game, they will not be able to interact with it
successfully. Balancing resource production rates and costs is
a critical element of idle games [48].
```
```
One of the most important aspects of any game experience is
player interaction [17]. As we will see in this paper, the level
of player interaction in idle games varies greatly [7, 50].
```
```
METHODOLOGY
We conducted a qualitative study on idle games to identify the
characteristics of their gameplay, mechanics, and interfaces.
We employed a grounded theory approach [23–25], starting
with an iterative process of finding and selecting idle games,
then performing open coding to identify the initial concepts
and categories of idle games and their associated features.
```
```
Salen and Zimmerman [56] suggest that one of the best ways
to understand a game is to play it, so the researchers engaged
in multiple play sessions for each game to deeply analyze
idle games. Examining games from within helped gain an
understanding of their gameplay, mechanics, and interactivity.
This approach has previously been applied to exertion games
by Bianchi-Berthouze [6] who used it to present a taxonomy
of classes of body movements observed during game play.
```
```
Grounded theoryis a set of practices that are used to explore
a new domain [23–25] by iteratively collecting data, analyz-
ing it, connecting with literature, and reporting findings [31].
Grounded theory begins with an iterative process of data gath-
ering and analysis.Open codinginvolves applying labels to the
collected data to identify what is different or unique about it to
form the initial concepts. Preliminary open coding develops
insights about the studied phenomenon and benefits the next
round of collection and analysis [24].Conceptsare created
by identifying and grouping codes that relate to a common
theme [3].Axial codingis performed by identifying relation-
ships among the open codes and initial concepts, which results
in the initial categories.Selective codingintegrates the cate-
gories to form a core category that describe the data. Through
this iterative process, a theory emerges that describes the data
and can be applied to new data.
```

```
Source (Count) Categories
Kongregate(28) Idle Clicker Incremental
[G15, G17, G19, G23, G30, G37, G51, G56, G70, G74] [G10, G11, G34, G35, G38, G65, G66, G69, G72,
G73]
```
```
[G12, G13, G26, G32, G40,
G52, G67, G75]
Almost Idle(24) Idler Clicker Civ Builder
[G20, G22, G28, G29, G33, G46, G48, G54, G55, G71] [G3,G4,G7,G14,G27,G43,G57,G60,G61,G63] [G16, G21, G36, G45]
Additional Games(14)
[G2, G5, G6, G8, G9, G25, G31, G39, G47, G49, G50, G53, G58, G59]
Non-Idle Games(10)
[G1, G18, G24, G41, G42, G44, G62, G64, G68, G76]
Table 1. The list of the selected idle games from Kongregate and Almost Idle, categorized based on how the game was identified on the source website.
Categories are not mutually exclusive, meaning one game can belong to multiple categories. Additional games are also included in this list, which are
selected based on prior research and authors’ experience. Non-idle games are included in this lest of games and not categorized.
```
Our iterative process started with selecting game portals and re-
trieving idle games (Figure 2). Two researchers, independently,
played all the retrieved games and recorded their observations,
while two other members of the research team played a subset
of the games to better understand the space and comment on
observations. Based on the researchers observations, open
coding was performed to identify the main features of each
game. Axial coding was then conducted, followed by selective
coding, which led to the final categories.
**Search Strategy**
To maximize our corpus of games, we searched two popular
web gaming portals to find and retrieve games: Kongregate
and Almost Idle. We used the websites’ existing categories to
collect a set of different types of idle games. Using existing
classifications of idle games from both websites helped us
narrow down game selections to ones that fit the targeted genre.
We focused on the most popular games on both websites. This
criteria helped us to select games that are considered relevant
and valuable by the community (Table 1).

```
Kongregate is a portal and social network site for web-based
games and includes a number of idle games in its catalog. It
provides a database of playable games with attached meta-
data that include game name, developer, description, category,
rank based on reviews, number of plays, and year of release.
Kongregate also provides social networking features for its
members and achievements for its games [32, 65]. Almost Idle
provides a community-driven catalog of incremental, idle, and
clicker games. It provides a more specific emphasis on idle
games compared to Kongregate. The search process resulted
in a total of 118 games. In the following, we describe the
search strategy for each game portal in detail.
```
```
On Kongregate, we examined all official categories in the
catalog and identified three that were relevant: idle, clicker,
and incremental games. Within each category, we sorted all
the games based on number of plays to ensure that all the
selected games were popular. We selected games starting
from the top of each list, removing all games that were not
playable (i.e., could not load or otherwise interact with) as
well as duplicate entries in the selected list. We continued this
process, eliminating 14 non-playable and 15 duplicate games.
This process resulted in selecting a total of 28 games.
Almost Idle includes a variety of idle games in its catalog and
provides a chart of the top games in the website, which we
used to select games. We sorted games based on popularity,
ensured games were playable, and removed duplicates. We
```
```
146
```
```
118
```
```
Kongregate
57 games
```
```
14
```
```
Phase 2
```
```
Phase 1
```
```
Phase 3
```
```
Almost Idle
61 games
```
```
record observations,
preliminary coding
```
```
open coding,
form concepts
```
```
analyze data, discuss
observations, find
relationships,
categories emerged
```
```
final classifications and
definitions
```
```
additional idle games
```
```
additional non-idle games
```
```
duplicates/non-playable
excluded
76
```
```
70
```
```
14
```
```
playing sessions
```
```
Figure 2. The digram showing the process of collecting, filtering, and
analyzing games. Arrows are labeled by number of games in the corpus.
```
```
eliminated 37 games that were unplayable or redundant and
selected 24 games. We then coded these 24 games based on
the site’s categories of idler, clicker, and civ builder games.
```
```
Additional Games and Prior Definitions
To ensure a comprehensive corpus, we added 14 well-known
idle games that were described as idle in the literature, in
references from other games, on social media, and the authors’
experience. These games were not covered by the web gaming
portals. Adding these 14 games ensured that we did not leave
out games that can help understand this new phenomenon.
Also, to understand and distinguish idle games from other
games, we added 10 non-idle games. These non-idle games
were selected from the top games in Kongregate after filtering
them based on number of plays, and removing 4 idle games
that was part of the top list. A total of 76 playable and unique
games were included in the final analysis (Table 1).
```
```
Prior terms and definitions of idle games that were discussed in
relevant literature and in the game community were identified
and used as codes in the analysis process. Including these
codes helped us to gain better understanding of idle games and
to form new definitions and concepts. Some of these codes
include: IDLE,ZERO-PLAYER,CLICKER,INCREMENTAL,
MINIMALIST, andAMBIENT.
```

```
Game Feature Observations
Game name AdVenture Capitalist[G38]
Play description You startCLICKINGon a lemonade stand
and collect money. Spend money to
make upgrades, INCREASE PRODUC-
TION PER CLICK. Start hiring workers
andINCREASE PRODUCTION PER SEC-
OND. When you have enough money,
you can buy new businesses, automate
all your businesses toINCREMENTmore
money, and leave the game progress.
Game mechanics Click to gain money,AUTOMATEproduc-
tion, make upgrades toDAMAGE/SEC.
Rewards ONE CURRENCY, which is money, is
rewarded in return.
Interface GRAPHICAL
Interactivity level 7
Progress rate 9
Overview This is aSINGLE-PLAYERgame, which
requiresLONG CYCLES OF CLICKING
at the start, and making a number of up-
grades. Production rate reaches $390/sec
in less that 10 minutes and you gain 1M
in cash making the game progress faster.
Table 2. An example from our research process to illustrate phase 1
of the research, in which two authors played the games, recorded their
observations, and performed preliminary open coding. Words that are
inSMALL CAPSare identified by the author as codes.
```
```
Analysis Procedure
The analysis procedure involved three phases and is outlined
on Figure 2. Phase 1 involved initial observations of game
features; in Phase 2, we performed open coding on our initial
observations of game features; and in Phase 3, we revised our
coding scheme to develop axial codes.
```
```
Phase 1: Initial Observations of Game Features
The focus of this phase was to identify the main characteris-
tics of each game. Each selected game was played by two
researchers to record observations on gameplay, game mechan-
ics, rewards, interactivity, progress rate, and game interface.
```
After recording observations, each researcher rated games on
11-point interactivity scale (0–10). Labeling a game with an
interactivity level of 0 meant that the game would progress by
itself without any interaction from the player. A rating of 10
meant that the game would slowly progress unless the player
regularly returned to the game to ensure that play advances (Ta-
ble 3). This method of rating was used by Purkiss and Khaliq
to rank interactivity levels of idle games [50]. Additionally,
using the same scale, we labeled each game based on the rate
at which the game progresses. A rating of 10 meant that the
game progressed quickly to advanced levels. Labeling a game
with a progress rate of 0 meant that it progressed slowly (e.g
Cow Clicker[G39]).

```
At the end of each play session and observation, each re-
searcher recorded a brief overview of the game and conducted
a preliminary open coding to label interesting and/or unique
```
```
Game Name Interactivity
Progress Quest 0
Casino Clicker 3
Crusaders of the Lost Idols 5
Candy Box 1 6
AdventureQuest Dragons 8
A Dark Room 9
Table 3. An example of some of the games from the dataset and their as-
sociated interactivity rank. Games with low interactivity rank requires
less attention from the player for the game to advance, however, games
with high rank progress slower without constant interaction.
```
```
Weighted Kappa Coefficient
Interactivity Progress
Weighted Kappa 0.6968 0.
ASE 0.0774 0.
95% Lower Conf Limit 0.5450 0.
95% Upper Conf Limit 0.8486 0.
Table 4. Cohen’s weighted kappa was run to determine the agreement
between the two researchers on interactivity level and progress rate of
the examined games.
```
```
characteristics of the examined game. We provide an example
from our research process to illustrate this phase on Table 2.
```
```
The rating process for interactivity level and progress rate
helped us establish inter-rater reliability [29]. We used
weighted kappa statistics to evaluate the agreement between
the researchers on interactivity level and progress rate of the
games [14]. The results show a substantial agreement be-
tween the two researchers on both interactivity level ranking
κw=0.696 and progress rate rankingκw=0.751 (Table 4).
```
```
Phase 2: Open Coding on Observations
ATLAS.ti Mac [5] was used to manage and code the data. The
application allows any type of data to be coded and analyzed,
including textual, graphical, audio, and video data. Each
author’s spreadsheet was imported into the application for
line-by-line open coding of the observations. As we continued
coding the data, we found similar concepts and reclassified
them under common categories.
```
```
When all data have been coded, part of the data can be selected
to display which codes have been assigned to them. Through
this process, concepts can be explored and linked to create
new categories. For instance, the codeINCREASE DAMAGE
PER CLICKwas used when a game features a mechanic where
the player can perform an upgrade that causes each click to
damage an opponent more. This code is used on 25 games in
the data set.
```
```
Phase 3: Axial and Selective Coding
During this phase, the researchers engaged in multiple iterative
discussion sessions to explore the relationship between the
codes, the emergent concepts, and the initial categories. While
constructing the categories and finding relationships between
them, we re-observed some of the games, and reviewed related
literature to refine the concepts. The result of this phase is a
set of categories and subcategories of idle games (Figure 3). In
this research, we are interested in finding the interrelationship
between the categories of idle games.
```

```
technology tree
internal economy
multiple resources
```
## open codes concepts categories

```
long cycles of clicking
constantly interact
constantly return
```
### multi-player

```
resource generator
```
```
shared resource pool
```
```
increment generators
```
```
click-to-manage
```
```
click-to-progress
```
### micromanagment

### derivative

### single-resource

```
economy building
```
```
high interactivity
```
```
click together
```
```
progress
```
```
increment per second
```
```
upgrades
```
```
fight boss
```
```
multiple game levels
```
```
waiting
increment
automate
```
```
clicking
```
```
increment per click
one resource
```
Figure 3. The analysis process that developed the incremental games super-category (each category above is part of incremental games). The process
started with open coding of observations on idle games: multiple codes are created. Concepts are discovered through analyzing the open codes and
identifying common features. This is an iterative process, where new codes are added, combined, or deleted. Each code is connected to one or more
games and can be combined to form new concepts. Concepts are analyzed to find common relationships, and, thus, categories emerge. In the diagram,
coloration is only to aid in reading. The left grouping is to show that all contained codes are part of click-to-manage and click-to-progress.

**TAXONOMY OF IDLE GAMES**
Based on common features and the concepts that emerged, our
taxonomy defines the key characteristics of idle games in two
ways. First, we define idle games based on key features, as
well as several distinctsubcategoriesof idle games. Second,
we identify aninteractivity spectrumfor idle games, which
can be applied to games in any category.

**Idle Games (Id)**
Idle gamesare games that can progress without player in-
teraction for some period of time (e.g., [G16, G25, G50]).
The majority of the play in idle games takes place in the
background while waiting, thus idle games can be also iden-
tified asbackground gamesandambient games. Non-idle
games however, require players to interact with the game to
progress. These games rarely can progress without interaction
(e.g., [G42, G62, G64]).

By comparing idle games to the 10 non-idle games in our
sample, we developed a fuller set of criteria that helps classify
a game as idle. All following features need to apply to the
game for it to be classified as idle:

- the majority of the play happens in thebackground;
- in these gameswaiting is playing—the game can progress
    while the player is not present, often through mechanics
    thatautomate gameplay;
- featurestemporal flexibility—players have the flexibility to
    set aside the game until they are ready to return to it, with
    minor or no penalty for not returning [37];
- often one instance of the game isplayed consistentlyover
    one or more years; and
- featuresno game overcondition.

```
Many social games, especially those that feature micromanage-
ment play (e.g.,FarmVille[71]), share some of these features.
Given thatCow Clicker[G39] was designed as a direct cri-
tique of this game genre, that is unsurprising. However, social
games are deployed on social networks such as Facebook, and
typically use thethreatof idling to incentivize social interac-
tion with other players. Idle games are more typically web- or
app-based, and idling is treated as afeaturerather than a bug.
Further, unlike idle games, social games do carry a penalty for
players to wait too long: players must check in at specified
intervals or lose progress.
```
```
Idle games do not incorporate game over or death conditions,
which means that players can keep playing the same instance
of the game for as long as desired. However, many idle games
incorporate a New Game+ (NG+) mechanic [22] (e.g., [G16,
G21]). NG+ mechanics let the player reset progress in the
game, erasing all current resources and accomplishments in
exchange for bonuses in a future playthrough.
```
```
Incremental Games (Inc)
We defineincremental gamesas idle games in which a player
selects resources to generate, waits for resources to accu-
mulate, then spends resources to automate part or all of
the resource generation process. Resourcesaccumulatein
this type of games as long as the game is left running (e.g.,
[G5, G16, G21, G33]). They are deceptively simple at first, but
reveal impressive depths, including finely tuned reward curves,
bottlenecks, plateaus, and economic models.
```
```
Incremental games commonly feature an internal economy.
Economiesare systems in which resources are produced, con-
sumed, allocated, and/or traded. Internal game economies
```

```
Id
Inc X
Y A
B
```
```
Zero-Player
```
```
Incremental
Games
```
```
Idle Games
```
```
Interactivity Spectrum
```
```
A Micromanagement
B Single-resource
X Derivative
Y Multi-player
```
```
Minimalist
```
```
Clicker
```
(^1) Setup-only
2 AI Play
1 2
Figure 4. Idle games classification and interactivity spectrum. This
graph shows the interrelationship between the sub-categories of idle
games and levels of interactivity. Games (in general) are the superset
that includes idle games (Id) as a subset. Idle games are a superset for
Incremental games (Inc), which includes four categories (A, B, X, Y).
The interactivity spectrum ranges from clicker to zero-player.
are systems that manipulate resources through sources (to pro-
duce resources), drains (to remove resources), converters (to
change a resource type), and traders (to move resources among
players) [2]. Incremental games revolve around building an
economy in order to progress, and around accumulating the
resources needed to do so.
Incremental games have a tendency to feature positive rates
of change, which facilitates them being left idle for extended
period of time. They are different from simulation games (e.g.,
SimCity 4[41]), which are outside the scope of this work,
in that they rarely feature random negative events, and often
they can be set into a state where all resources monotonically
accumulate [16, 45]. A number of sub-genres of incremental
games emerged from the analysis:

- Micromanagement games(A): involve multiple resources
    that the player uses to build an internal economy. Micro-
    management games feature high interactivity levels, mostly
    textual interfaces, and an NG+ mechanic. The level of
    progress in this type of games is generally slow. In micro-
    management games, the player is afforded more options
    and can make more decisions to progress in the game, with
    multiple advancement vectors. (e.g., [G16, G21]).
- Single-resource games(B): provide the player with only
    one resource, which they produce and spend to complete
    upgrades in order to progress in the game. Interactivity level
    in these games is generally high, and they feature a higher
    progress rate compared to other idle games. Most of these
    games feature a stable gameplay pattern, where the player is
    afforded a small number of actions to perform in the game
    in order to progress (e.g., [G50, G66]).
- Derivative^1 games(X): involve single or multiple resources
    with which the player can build resource generators to auto-
    mate the production of the main resource of the game. This
    type of game features a unique game mechanic that allows
    the player to build generators that produce other generators,

(^1) “Of, pertaining to, or designating a control element whose output is a
linear function of the derivative (the rate of change) of its input.” [46]
but all of them contribute to the production of the main
resource (e.g., [G33, G72]) [49].

- Multi-player incremental games(Y): allow multiple players
    to accumulate a resource simultaneously by clicking and/or
    automating production, and the accumulated resources are
    shared (e.g., [G40, G63]).

```
INTERACTIVITY SPECTRUM
Interactivity in idle games range from games that require con-
stant interaction to no interaction at all. Interactivity in idle
games can be interpreted not in terms of exclusive categories,
but asdegreesof interactivity along a spectrum, from games
that require no interaction other than starting the game to those
that require periodic player involvement. While some idle
games sit at a consistent point on the spectrum, a more typical
pattern is for different phases of each game to invite different
levels of interaction. We identify three common patterns.
```
```
Clicker
At the higher-interaction end of the spectrum areclickergames.
These games that involveclicking, rubbing, or tapping as a
core mechanic; damage is caused and/or resources are gen-
erated by multiple clicking cycles on an object, which are
separated by waiting periods. Some clicker games begin with
extended clicking episodes to collect a resource or unlock an
upgrade (e.g., [G10, G14, G38, G66]). However, these clicking
episodes usually fade out after progressing further in the game.
In other games, the player must continue to click rapidly and
regularly to progress, even though the game advances while
idle (e.g., [G10, G38, G66]). Clicking may also be interspersed
with long periods of waiting (e.gCow Clicker[G39], which
allows one click every six hours), moving the game toward a
more minimalist experience.
```
```
Minimalist
Minimalistgames reduce the number of available actions to a
small subset of options, either through game mechanics that
automate gameplay or gameplay phases that reduce the player
interaction (e.g., bottlenecks, plateaus) [48]. These games
may contain zero-player passages [7], effectively sliding to
the bottom of the continuum, or the player may engage in
production on a small scale (e.g., [G9, G70]).
```
```
Zero-Player
At the other side of the spectrum arezero-playergames. These
games require no player involvement after starting or allow
limited input during setup but no influence in gameplay [7].
These games areambientin nature, due to the limited inter-
activity and the ability to leave them open in background,
ready for the player to attend to anytime. While Björk and
Juul [7] defined and categorized zero-player games, we include
zero-player as a degree in the interactivity spectrum with two
phases:
```
- Setup-only(1): allow a player to interact with the game
    only once at the start of the game, then the game play
    itself without further involvement from the player (e.g.,
    [G25, G49, G53]).
- AI Play(2): all progress in the game is controlled solely by
    the game AI (e.g., [G2]).


**DISCUSSION AND DESIGN IMPLICATIONS**
We have investigated the features of idle games to develop
a better understanding of the distinct gameplay categories in
this space. Our taxonomy shows that this new game genre
can appropriately be defined to enhance our understanding of
this new phenomenon. We showed that not all idle games are
the same, each category has a set of unique and identifiable
features. In this section, we provide design implications for
supporting design, development, and further research within
the space of idle games.

```
Interestingly, we found that our taxonomy was based more
around gamerulesthan mechanics. That is, the taxonomy
considers the underlying mathematic structures of the games,
the ways that they drive players to certain states, rather than
thinking about interactivity or interaction strategies. We expect
that this is due largely to our focus on games that are intended
to be played minimally (or not at all); unlike other types of
games, idle games are — by design — less focused on the
choices players make, but how those choices unfold over time.
```
```
Why Idle Games Are Interesting
One of the main characteristics of idle games is a strongsup-
port for playing less. Idle games, in general, feature a balance
between rules that encourage players to leave the game and
rules that reward them for returning. Being able to leave the
game in the background, without interacting with it, makes
these games easy to interleave with daily activities [35, 37, 54].
```
```
Playful Idling
In these games, rule systems are explicitly designed to force
players into an idle state, during which resources accumulate.
Typically, every activity in the game costs resources; these
resources take time to accumulate but can be spent quickly,
in just a few clicks. The costs of actions also increase with
each interaction. The more the player interacts with the game
during a given session, the fewer options remain to them (e.g.,
[G16, G21, G50]). Conversely, the longer players go without
interacting with the game, the more options they have when
they return.
```
```
Idle games challenge Weiser and Brown’s claim that “a calm
videogame would get little use” [68].Calm technologiesare
those that wait at theperiphery, the edge of attention, and can
be attended to at will [68]. Idle games do not merely wait at
the periphery of a player’s attention, but actively place them-
selves there. To attend overlong to an idle game is to play it
poorly, with few opportunities for interaction. Additionally,
idle games do not penalize the player by demanding attention.
A player who idles for too long may forgo opportunities to ac-
quire new resources, but typically does not place their existing
successes at risk.
```
```
Rewarding Players for Waiting
In idle games, waiting is considered part of play. Waiting
phases invite players to set play aside, providing time to think
about future choices.
Unlike other games that include waiting mechanics, idle games
center and value waiting. For example,Journey[61] has an
achievement for players who take a full week away from the
game and then return, but that achievement is disconnected
```
```
from the core loop of gameplay. Free-to-play games such as
FarmVille[71] limit the number of actions players can take in
a day. Although the limited actions in these games generate
opportunities to wait, the waiting itself is treated as a penalty.
Players are encouraged to avoid waiting by making in-game
purchases or asking social media networks for help.
```
```
Idle games signal their attitude toward waiting through game
design elements. Resetting the game and starting over often
grants players advantageswithin gameplayas well as marking
achievements [65]. Many incremental games incorporate NG+
mechanics, which allow players to reset progress in the game
in exchange for bonuses in a future playthrough. The more
resets, the faster and richer future games become (e.g., [G16]).
Players are also rewardedreturning bonuses[39] when they
return to the game for consecutive days (e.g.,Electric Rubber
2 [G7]). Unlike achievements, these bonuses directly affect
the player’s game performance.
```
```
Against Playbour
Idle games critique the notion ofplaybour, or work-like prac-
tices that emerge around gameplay [26]. Certainly idle games
risk player frustration and boredom, as the central mechanic
is repetitive and may induceclick fatigue[47]. However, idle
games typically give the player more rewards for doing less
as the game progresses. Additionally, because play sessions
can be short, the player can participate in the game during
microboredommoments [51], in which a person is waiting
for other essential daily events to take place (e.g., commuting
on the train, waiting for a research paper to be typeset). Idle
games enable players to fill in and leverage these moments of
boredom with game interaction, but because the game contin-
ues to accumulate resources while they are idling, they are not
compelledto play.
```
```
Never Not Playing
To engage with most digital games, players set aside time
and/or space to play; this may be as elaborate as a game room
with multiple monitors [13] or as simple as pulling out and
engaging with a smartphone [63]. At and within both extremes,
the game expressly takes attention, sometimes for extended
periods of time: players need to step into themagic circleof
the game [55]. When players switch into and out of a game
activity, such as by leaving play to check their email, they
are moving in and out of the magic circle. However, in idle
games, idlingisplaying. As long as the game is idling in the
background of their daily activity, there is no clear demarcation
for when the player is playing or not. In this way, idle games
temporally subvert [42] the magic circle.
```
```
Differentiating Incremental Games from Idle Games
Incremental games build on the base category of idle games
by introducingcomplex economies. However, because they
retain the characteristics of idle games, the player’s economic
decisions may play out across days, months, or years (e.g.,
Kittens[G16],CivClicker[G21]).
```
```
Playing at Planning
We argue that one of the central poetics ofincremental games
involves incentivizing players to play less and plan more as
they progress through each game’s growth curve. As the game
```

```
progresses, the player is called upon to identify priorities
which manifest as short- and long-term plans. However, the
player’s plans must also include their physical ability to check
on the game, their time and attention, and their ability to
remember the plan.
```
```
Expert players paradoxically engage in fewer direct interac-
tions with gameplay than novice players because they spend
more time waiting. However, while they are devoting less
tactical interaction to the experience, their play requires more
strategic attention. This is often characterized by a decrease in
the micromanagement behaviors that comprise the early play
experience, in which the game is active for extended periods
of time, accumulating resources, and the player has minimal
involvement. Thus, we might say that these games produce
a form of “self-obviating” play [64] in a way that challenges
us to reconsider “play” and “fun”, or at least relocate them
outside of both the formal mechanics of the game and the
dynamic player behaviors those systems entail.
```
```
Designing for Cognitive Offloading
In incremental games, waiting can be cognitively costly when
returning to the game [37]. Players must remember plans
between sessions, assess the game state upon return, then
carry out a plan. A player is thus constantly reflecting on
the game by making mental choices and reconstructing plans.
To aid players, designers can provide a queuing mechanic, in
which the players can add tasks to a queue for the game to
perform and/or record while they are not interacting with the
game (e.g., [G32]). The use of queuing mechanics represent
a method tooff-loadsome of the demands associated with
remembering plans from the player to the game [52]. This
type of game mechanic reduces the player’s interaction with
the game, hence playing less and shifting on the interactivity
spectrum, but increases the player’s power over how the game
progresses.
```
```
Another design for cognitive offloading was observed inKit-
tens[G16], which provides tooltips that describe how long it
will take to achieve something in physical-world time. These
overlays allow the player to see which resources are needed,
supporting making decisions about alternative build orders. In
the game, hovering over a resource’s production rate shows
how long it will take the resource to reach its cap. These me-
chanics enable players to assess the length of waiting periods.
```
**Implementing Games Across the Interactivity Spectrum**
We found many interface design challenges associated with
idle games. A large number of idle games are text-based or fea-
ture minimalist interfaces, but often lack a well-designed user
interface. Many of the games we encountered were unplayable
because the interface was incomprehensible and poorly docu-
mented. Some games lack helpful information for the players
to make effective decisions, while others clutter the interface
with unnecessary elements. Designers of idle games need to
make clear and effective design choices aboutwhatinforma-
tion needs to be presented,howthe information is displayed,
andwhenit should be available to the player.

```
Most idle games incorporate different amounts of interactivity
at different points in the game. Idle game interfaces must
```
```
therefore also help players understand when new interaction
is available, when interaction is welcome, and when it is more
appropriate to wait.
```
```
Ludic Efficiency
One useful lens for unpacking the design of interfaces in idle
games is Tanenbaum and Bizzocchi’s concept ofludic effi-
ciency[59]. Ludic efficiency describes the extent to which
an interface eases or hinders a player’s ability to achieve a
desired outcome in a game: more efficient interfaces require
fewer and simpler actions from the player than less efficient
interfaces. In some game genres much of the core fun comes
from grappling with inefficient interfaces, as is the case in
fighting games, where combos and special moves are only
achieved through the execution of complex button and stick
movements.
```
```
For idle games we can locate them along a continuum of
ludic efficiency. By this measure, zero-player games represent
the height of ludic efficiency in that they literally require no
actions from the player at all to be played. On the other end of
the spectrum are clicker games that reward continuous and/or
regular clicking to generate resources (as is the case in the
first phases ofKittens[G16]). Even this is quite efficient when
considered alongside games that fall outside of our taxonomy.
While there is not a clear inflection point on the continuum of
ludic efficiency that separates idle games from non-idle games,
efficient interfaces are the norm within the genre.
```
```
Shifting Interaction Levels
Balancing between idle and active gameplay is important in
idle games; idle games can also shift up and down the interac-
tivity spectrum, from periods of active and regular clicking to
long periods with essentially no interaction.
```
```
While many design features of idle games incentivize waiting,
there are corresponding features that push players back toward
clicking and other types of more active interaction. One design
strategy is to make rapid clicking a special event. For exam-
ple, inClicker Heroes[G66],Tiny Tappers[G14], andTap
Adventure[G10], the player is periodically required to fight a
boss. Winning the fight unlocks further advancements in the
game. To win the boss fight, players need to make enough
manual clicks in a certain time period. Because it is framed as
a boss fight, the designers are treating manual clicking as an
opportunity to exert personal prowess, rather than as negating
the player’s hard-won upgrades.
```
```
Another approach is for games to have random events (e.g.,
astronomical events inKittens Game[G16] or golden cookies
inCookie Clicker[G50]). Once an event takes place, the
player has a short window (a few seconds) to click and get
a special reward. These events can be useful for players to
speed progression in the game and keep them coming back
to the game. In idle games, these events provide bonuses but
do not introduce penalties. They therefore signal to the player
that clicking, and the attention that goes with it, is welcome
but not required.
```
```
Unlocking as Usability Support
One design approach to achieve this is for games to gradu-
ally present information and upgrades to the player as fea-
```

```
tures unlock. Micromanagement incremental games such
asTrimps[G32] andKittens[G16] present their game fea-
tures and upgrades in a clean and cohesive way. These two
games feature a lot of elements, upgrades, and impressive
depth, which is a typical characteristic of micromanagement
incremental games. However, the interface of these games
gradually unfolds features to the player, allowing players to
make clear decisions. Even though these features are gradually
unfolded over time, the game keeps the player informed of
what the next upgrades are and how to get them. Giving the
player options to hide/show features and future upgrades in
the game could improve usability in idle games and especially
micromanagement games.
```
```
Democratized Production
As of this writing, most idle games are created by independent
developers or small teams without the support of a large pub-
lisher. These games frequently have simple art and sound and
require little financial support to update and maintain. The
ease with which these games are produced creates a blurred
line between player and developer, with some developers ac-
tively disseminating their game creation techniques for the
player community to replicate [58].
```
We found that the lack of barriers to the creation of new idle
games is not always a good thing. Many of the games we
encountered were unplayable and broken, and could not be
included in our data collection. There are also many “clones”
within the idle game genre, where the mechanics are copied
directly from another successful game (e.g.,Clicker Heroes
[G66]) with only cosmetic changes to the interface and theme.
However, the ease of access also leads to a “long-tail” [11]
effect for idle games, where it is possible to find niche games
dedicated to a variety of player preferences ranging from deity
simulators (e.g.,Godville[G31]) to Kitten civilization simula-
tions (e.g.,Kittens Game[G16]).

```
Given this richness of game production even in the absence of
idle game development tools, one might imagine what would
be possible with toolkits aimed at this genre. Twine allowed
the flowering of new genres of interactive fiction, including
games that center queer experiences and voices [27, 30, 33].
Better tools for idle game production could allow exploration
and experimentation with gameeconomiesin the same way
that Twine allows experimentation with gametext, and could
allow new developer communities to express their economic
experiences through game design.
```
**Implications Outside Game Design**
While our aim is to support designers and the games com-
munity to make sense of the idle games phenomenon, the
study contributes insights into the unique characteristics of
idle games and their interface design. We illuminate promising
directions for future work and possible benefits of how the
design of idle games could influence other applications. In
the long term, we expect that idle games may serve a larger
purpose in the research community, forming the basis of exper-
iments, interventions, and game studies. Also, we expect there
is value in considering not only designing them in isolation,
but also as synergistic to other applications.

```
Gamification and Idle Games
Using elements of idle games, including mechanics and inter-
faces in non-game context can influence the design of gamified
applications [19, 38]. The unique characteristics of idle games
have the potential to be used to incentivize long-term motiva-
tion and promote desired behaviors. These idle interfaces can
be designed specifically in other applications (e.g., dieting) to
engage players in long-term habit change. Further research is
needed to understand why players keep playing idle games,
which can help designers of gamified applications to build
experiences that motivate users to come back for months and
years.
```
```
Long-term Planning
Owing to their often extended play times, idle games can
serve as probes to understand players’ planning behaviors
and motivations to play games in long time scales. Further,
designed games can serve as interventions to improve planning
behavior [66]. By facilitating not-playing, idle games raise a
number of questions about what player agency is and function
as a tool to explore the edges of this space. The present
taxonomy will support researchers in identifying the right
game for the right study, and/or support designing new games
for this purpose.
```
```
CONCLUSION
In this paper, we undertook a grounded theory study of idle
games. We developed a taxonomy to point out several of the
defining characteristics of these games. Further, we discuss
design implications for idle games, how they affect gameplay,
game mechanics and interfaces that support playing to wait,
and opportunities and challenges presented by this genre.
```
```
Our taxonomy contribution aims to support designers and
the games community to make sense of the idle games phe-
nomenon and helps to understand how it may be leveraged.
Designers can use the taxonomy as a guide to understand the
game mechanics, types of gameplay, and design implications
of each category of idle games, whether they are creating idle
games or incorporating idle modes into games from other gen-
res. Researchers can use our framework to construct studies
around game design and planning mechanics; our taxonomy
also provides a common language for researchers and game
designers to collaborate. Finally, idle games may inspire new
ways of thinking about what activities are valuable during
play, how play should be organized, and what resources play
demands, including both human resources, such as sustained
attention, and environmental resources, such as power con-
sumption.
```
```
ACKNOWLEDGMENTS
This material is based upon work supported by the National
Science Foundation under Grant No. IIS-1651532.
```
```
REFERENCES
```
1. Espen Aarseth, Solveig Marie Smedstad, and Lise
    Sunnanå. 2003. A multidimensional typology of games. In
    DiGRA - Proceedings of the 2003 DiGRA International
    Conference: Level Up. 48–53.


2.Ernest Adams and Joris Dormans. 2012.Game Mechanics:
Advanced Game Design(1st ed.). New Riders Publishing,
Thousand Oaks, CA, USA.

3.George Allan. 2003. A Critique of using Grounded Theory
as a Research Method.Electronic Journal of Business
Research Methods2, 1 (2003), 1–10.

4. Thomas H. Apperley. 2006. Genre and game studies:
    Toward a critical approach to video game genres.
    Simulation & Gaming37, 1 (2006), 6–23.DOI:
    [http://dx.doi.org/10.1177/](http://dx.doi.org/10.1177/)
5. ATLAS.ti Scientific Software Development GmbH. 2017.
    ATLAS.ti Mac. (2017).
    [http://atlasti.com/product/mac-os-edition/.](http://atlasti.com/product/mac-os-edition/.)
6. Nadia Bianchi-Berthouze. 2013. Understanding the Role
    of Body Movement in Player Engagement.
    Human–Computer Interaction28, 1 (2013), 40–75.DOI:
    [http://dx.doi.org/10.1080/07370024.2012.](http://dx.doi.org/10.1080/07370024.2012.)
7. Staffan Björk and Jesper Juul. 2012. Zero-Player Games
    Or: What We Talk about When We Talk about Players.
    (2012).http://www.jesperjuul.net/text/zeroplayergames/.
8. Blizzard Entertainment. 2004.World of Warcraft. Game
    [OSX]. (November 2004). Blizzard Entertainment, Irvine,
    California, USA.
9. Ian Bogost. 2016.Play Anything: The Pleasure of Limits,
    the Uses of Boredom, & the Secret of Games. Basic Books.
10. A. J. Allen Bostian and Charles A. Holt. 2013. Veconlab
    Classroom Clicker Games: The Wisdom of Crowds and
    the Winner’s Curse.The Journal of Economic Education
    44, 3 (2013), 217–229.DOI:
    [http://dx.doi.org/10.1080/00220485.2013.](http://dx.doi.org/10.1080/00220485.2013.)
11. Erik Brynjolfsson, Yu Jeffrey Hu, and Michael D. Smith.
    2006. From niches to riches: Anatomy of the long tail.
    Sloan Management Review47, 4 (Summer 2006), 67–71.
12. Roger Caillois. 1961.Man, Play, and Games. Thames &
    Hudson.

13.Marcus Carter, Bjorn Nansen, and Martin R. Gibbs. 2014.
Screen Ecologies, Multi-gaming and Designing for
Different Registers of Engagement. InProceedings of the
First ACM SIGCHI Annual Symposium on
Computer-human Interaction in Play (CHI PLAY ’14).
ACM, New York, NY, USA, 37–46.DOI:
[http://dx.doi.org/10.1145/2658537.](http://dx.doi.org/10.1145/2658537.)

14. Jacob Cohen. 1968. Weighted kappa: Nominal scale
    agreement provision for scaled disagreement or partial
    credit.Psychological bulletin70, 4 (1968), 213.
15. David L. Craddock. 2015.Dungeon Hacks: How
    NetHack, Angband, and Other Roguelikes Changed the
    Course of Video Games. Press Start Press, Canton, Ohio,
    USA.
16. Chris Crawford. 1984.The Art of Computer Game
    Design. Osborne/McGraw-Hill, Berkeley, CA, USA.
17. Mihaly Csikszentmihalyi. 1997.Finding flow: The
    psychology of engagement with everyday life. Basic Books.
       18. Sebastian Deterding. 2016. Progress Wars: Idle Games
          and the Demarcation of “Real” Games. InDiGRA/FDG
          #3916 - Abstract Proceedings of the First International
          Joint Conference of DiGRA and FDG. Digital Games
          Research Association and Society for the Advancement of
          the Science of Digital Games, Dundee, Scotland.
       19. Sebastian Deterding, Dan Dixon, Rilla Khaled, and
          Lennart Nacke. 2011. From Game Design Elements to
          Gamefulness: Defining "Gamification". InProceedings of
          the 15th International Academic MindTrek Conference:
          Envisioning Future Media Environments (MindTrek ’11).
          ACM, New York, NY, USA, 9–15.DOI:
          [http://dx.doi.org/10.1145/2181037.](http://dx.doi.org/10.1145/2181037.)
       20. Christian Elverdam and Espen Aarseth. 2007. Game
          Classification and Game Design: Construction Through
          Critical Analysis.Games and Culture2, 1 (2007), 3–22.
          DOI:http://dx.doi.org/10.1177/
       21. Mark Eyles and Roger Eglin. 2008. Ambient Games,
          Revealing a Route to a World Where Work is Play?Int. J.
          Comput. Games Technol.2008 (Jan. 2008), 7:1–7:7.DOI:
          [http://dx.doi.org/10.1155/2008/](http://dx.doi.org/10.1155/2008/)
       22. Giant Bomb Wiki. 2015. New Game Plus. (September
          2015).
          https://www.giantbomb.com/new-game-plus/3015-150/.
       23. Barney G. Glaser. 1978.Theoretical sensitivity:
          Advances in the methodology of grounded theory.
             Sociology Pr.
       24. Barney G. Glaser. 1998.Doing grounded theory: Issues
          and discussions. Sociology Press.
       25. Barney G. Glaser and Anselm L. Strauss. 2009.The
          discovery of grounded theory: Strategies for qualitative
          research. Transaction publishers.
       26. Joyce Goggin. 2011. Playbour, farming and labour.
          Ephemera: Theory and Politics in Organization11, 4
          (2011), 357–368.
       27. Daniel Goldberg and Linus Larsson (Eds.). 2015.The
          State of Play: Creators and Critics on Video Game Culture.
          Seven Stories Press.
       28. Carl Gutwin, Christianne Rooke, Andy Cockburn,
          Regan L. Mandryk, and Benjamin Lafreniere. 2016.
          Peak-End Effects on Player Experience in Casual Games.
          InProceedings of the 2016 CHI Conference on Human
          Factors in Computing Systems (CHI ’16). ACM, New
          York, NY, USA, 5608–5619.DOI:
             [http://dx.doi.org/10.1145/2858036.](http://dx.doi.org/10.1145/2858036.)

```
29.Kilem Li Gwet. 2014.Handbook of inter-rater reliability:
The definitive guide to measuring the extent of agreement
among rater. Advanced Analytics, LLC, Gaithersburg,
MD, USA.
```
30. Alison Harvey. 2014. Twine’s revolution:
    Democratization, depoliticization, and the queering of
    game design.G| A| M| E Games as Art, Media,
    Entertainment1, 3 (2014).


31. Rashina Hoda, James Noble, and Stuart Marshall. 2011.
    Grounded Theory for Geeks. InProceedings of the 18th
    Conference on Pattern Languages of Programs (PLoP ’11).
    ACM, New York, NY, USA, 24:1–24:17.DOI:
    [http://dx.doi.org/10.1145/2578903.](http://dx.doi.org/10.1145/2578903.)
32. Mikael Jakobsson. 2011. The achievement machine:
    Understanding Xbox 360 achievements in gaming
    practices.Game Studies11, 1 (2011), 1–22.
33. Friedhoff Jane. 2014. Untangling Twine: A Platform
    Study. InDiGRA #3913 - Proceedings of the 2013 DiGRA
    International Conference: DeFragging Game Studies.
34. Eric Jordan. 2016. Why idle/clicker games will have
    more impact than virtual reality. (February 2016).
    [http://www.develop-online.net/opinions/why-idle-](http://www.develop-online.net/opinions/why-idle-)
    clicker-games-will-have-more-impact-than-virtual-
    reality/0216911.

35.Jesper Juul. 2010.A casual revolution: Reinventing video
games and their players. MIT Press.

36. Jesper Juul and Rasmus Keldorff. 2010.Well Played 2.0.
    Springer-Verlag, Berlin, Heidelberg, Chapter Depth in One
    Minute: A Conversation About Bejeweled Blitz, 196–211.
37. Brendan Keogh and Ingrid Richardson. 2017. Waiting to
    play: The labour of background games.European Journal
    of Cultural Studies(2017).DOI:
    [http://dx.doi.org/10.1177/](http://dx.doi.org/10.1177/)
38. Joey J. Lee and Jessica Hammer. 2011. Gamification in
    education: What, how, why bother?Academic Exchange
    Quarterly15, 2 (2011), 146.
39. Chris Lewis, Noah Wardrip-Fruin, and Jim Whitehead.
    2012. Motivational Game Design Patterns of ’Ville Games.
    InProceedings of the International Conference on the
Foundations of Digital Games (FDG ’12). ACM, New
York, NY, USA, 172–179.DOI:
[http://dx.doi.org/10.1145/2282338.](http://dx.doi.org/10.1145/2282338.)

40.Thorey Mariusdottir, Vadim Bulitko, and Matthew Brown.

2015. Maximizing Flow as a Metacontrol in Angband. In
The Eleventh AAAI Conference on Artificial Intelligence
and Interactive Digital Entertainment (AIIDE-15).
41. Maxis. 2003.SimCity 4. Game [Windows]. (January
2003). EA Games, Redwood City, California.
42. Markus Montola, Jaakko Stenros, and Annika Waern.
2009.Pervasive Games: Theory and Design. Morgan
Kaufmann Publishers Inc., San Francisco, CA, USA.
43. Florian ’Floyd’ Mueller, Martin R. Gibbs, and Frank
Vetere. 2008. Taxonomy of Exertion Games. In
Proceedings of the 20th Australasian Conference on
Computer-Human Interaction: Designing for Habitus and
Habitat (OZCHI ’08). ACM, New York, NY, USA,
263–266.DOI:
[http://dx.doi.org/10.1145/1517744.](http://dx.doi.org/10.1145/1517744.)
44. David Myers. 1990. Computer games genres.Play &
Culture3, 4 (1990), 286–301.

```
45.Viknashvaran Narayanasamy, Kok Wai Wong, Chun Che
Fung, and Shri Rai. 2006. Distinguishing Games and
Simulation Games from Simulators. Comput. Entertain. 4,
2 (April 2006). DOI: http://
dx.doi.org/10.1145/1129006.
46.Oxford English Dictionary. 2017. “derivative, adj. and n.”.
Dictionary Definition. (June 2017). Retrieved September
12, 2017 from http://www.oed.com/view/Entry/50609.
47.Janne Paavilainen, Juho Hamari, Jaakko Stenros, and Jani
Kinnunen. 2013. Social Network Games: Players’
Perspectives. Simulation & Gaming 44, 6 (2013), 794–820.
DOI:http://dx.doi.org/10.1177/
48.Anthony Pecorella. 2016a. The Math of Idle Games, Part
I.(October 2016). http://blog.kongregate.com/the-math-
of-idle-games-part-i/.
49.Anthony Pecorella. 2016b. The Math of Idle Games, Part
II.(October 2016). http://blog.kongregate.com/the-math-
of-idle-games-part-ii/.
50.Blair Purkiss and Imran Khaliq. 2015. A study of
interaction in idle games & perceptions on the definition of
a game. In 2015 IEEE Games Entertainment Media
Conference (GEM). 1–6. DOI: http://dx.doi.org/10.1109/
GEM.2015.
51.Scott C. Richmond. 2015. Vulgar Boredom, or What
Andy Warhol Can Teach Us about Candy Crush. Journal
of Visual Culture 14, 1 (2015), 21–39. DOI: http://
dx.doi.org/10.1177/
52.Evan F. Risko and Sam J. Gilbert. 2016. Cognitive
Offloading. Trends in Cognitive Sciences 20, 9 (2016), 676
```
- 688. DOI:http://dx.doi.org/10.1016/j.tics.2016.07.
53.Andrew Rollings and Ernest Adams. 2003. Andrew
Rollings and Ernest Adams on Game Design. New Riders
Games.
54.Paolo Ruffino. 2016. Games to Live With. Digital
Culture & Society 2, 1 (2016), 153–160.
55.Katie Salen and Eric Zimmerman. 2004. Rules of Play:
Game Design Fundamentals. MIT Press, Cambridge, MA,
USA.
56.Katie Salen and Eric Zimmerman. 2005. The Game
Design Reader: A Rules of Play Anthology. The MIT
Press.
57.Ian Schreiber. 2009. Level 3: Formal Elements of Games.
(July 2009). https://gamedesignconcepts.wordpress.com/
2009/07/06/level-3-formal-elements-of-games/.
58.David Stark. 2014. So you want to make an incremental
game? (January 2014). [http://dhmholley.co.uk/](http://dhmholley.co.uk/)
incrementals.html.

### 59.Theresa Jean Tanenbaum and Jim Bizzocchi. 2009. Rock

```
Band: A Case Study in the Design of Embodied Interface
Experience. In Proceedings of the 2009 ACM SIGGRAPH
Symposium on Video Games (Sandbox ’09). ACM, New
York, NY, USA, 127–134. DOI: http://
dx.doi.org/10.1145/1581073.
```

60.Jason Tanz. 2011. The curse of Cow Clicker: how a
cheeky satire became a videogame hit. (December 2011).
https://www.wired.com/2011/12/ff_cowclicker/.

61.thatgamecompany. 2012. Journey. Game [PS3]. (March
2012). Sony Computer Entertainment, San Mateo,
California.

62.The Noob Company. 2010. TheNoobBot. (2010).
[http://thenoobbot.com.](http://thenoobbot.com.)

63.Peter Tolmie, Andy Crabtree, Tom Rodden, and Steve
Benford. 2008. "Are You Watching This Film or What?":
Interruption and the Juggling of Cohorts. In Proceedings of
the 2008 ACM Conference on Computer Supported
Cooperative Work (CSCW ’08). ACM, New York, NY,
USA, 257–266. DOI: [http://](http://)
dx.doi.org/10.1145/1460563.

64.Bill Tomlinson, Juliet Norton, Eric P. S. Baumer, Marcel
Pufal, and Barath Raghavan. 2015. Self-obviating systems
and their application to sustainability. iConference 2015
Proceedings (2015).

65.Phoebe O. Toups Dugas, Nicole K. Crenshaw, Rina R.
Wehbe, Gustavo F. Tondello, and Lennart E. Nacke.
2016a. "The Collecting Itself Feels Good": Towards
Collection Interfaces for Digital Game Objects. In
Proceedings of the 2016 Annual Symposium on Computer-
Human Interaction

```
in Play (CHI PLAY ’16). ACM, New York, NY, USA,
276–290.DOI:
http://dx.doi.org/10.1145/2967934.
```
```
66.Phoebe O. Toups Dugas, William A. Hamilton, and
Sultan A. Alharthi. 2016b. Playing at Planning: Game
Design Patterns from Disaster Response Practice. In
Proceedings of the 2016 Annual Symposium on Computer-
Human Interaction in Play (CHI PLAY ’16). ACM, New
York, NY, USA, 362–375. DOI: http://
dx.doi.org/10.1145/2967934.
```
```
67.Deborah P. Vossen. 2004. The Nature and Classification
of Games. Avante 10, 1 (2004), 53–68.
68.Mark Weiser and John Seely Brown. 1995. Designing
Calm Technology. (1995). http://www.ubiq.com/weiser/
calmtech/calmtech.htm.
69.A. P. White. 1995. Angband Borg. (January 1995).
http://www.innovapain.com/borg/.
70.Nick Yee. 2016. The Surprising Profile of Idle Clicker
Gamers. (July 2016). http://
quanticfoundry.com/2016/07/06/idle-clickers/.
71.Zynga. 2009. Farmville. Game [Flash]. (June 2009).
Zynga, San Francisco, California, USA.
```

**LUDOGRAPHY**
G1. 5th Planet Games. 2012.Dawn of the Dragons. Game
[Browser]. (01 January 2012). 5th Planet Games,
Rocklin, CA, USA.

G2. Alex Cutler and Andy Astrand. 1990.Angband. Game
[Windows]. (01 January 1990). Angband Development
Team, Coventry, UK.

G3. Almost Idle. 2016.Idle Painters. Game [Browser]. (
June 2016). Almost Idle, Sydney, Australia.

G4. Almost Idle. 2017.Idle Bouncer. Game [Browser]. (
January 2017). Almost Idle, Sydney, Australia.

G5. aniwey. 2013a.Candy Box !Game [Flash]. (01 January
2013). aniwey, France.

G6. aniwey. 2013b.Candy Box 2. Game [Flash]. (01 March
2013). aniwey, France.

G7. Appless. 2015.Electric Rubber 2. Game [Browser]. (
August 2015). Appless.

G8. Artix Entertainment LLC. 2014.AdventureQuest
Dragons. Game [Flash]. (08 March 2014). Artix
Entertainment LLC, Tampa, FL, USA.

G9. Asymmetric Publications LLC. 2003.Kingdom of
Loathing. Game [Browser]. (01 January 2003).
Asymmetric Publications LLC, Arizona, USA.

G10. Avaloid. 2015.Tap Adventure. Game [Browser]. (
October 2015). Avaloid, Ukraine.

G11. Avaloid. 2016.Tap Adventure: Time Travel. Game
[Browser]. (31 May 2016). Avaloid, Ukraine.

G12. Baldurans. 2015.Reactor idle. Game [Browser]. (
November 2015). Baldurans, Tartu, Estonia.

G13. Berzerk Studio. 2016.Zombidle. Game [Browser]. (
March 2016). Berzerk Studio, Quebec City, Quebec,
Canada.

G14. Big Viking Games. 2016.Tiny Tappers. Game
[Browser]. (17 February 2016). Big Viking Games,
London, ON, Canada.

G15. Blade Fire Studios. 2016.Goldcraft. Game [Browser].
(17 February 2016). Blade Fire Studios, Sacramento, CA,
USA.

G16. Bloodrizer. 2014.Kittens Game. Game [Browser]. (
January 2014). Bloodrizer, Redwood City, CA, USA.

G17. Codename Entertainment. 2015.Crusaders of the Lost
Idols. Game [Browser]. (01 January 2015). Codename
Entertainment, Victoria, BC, Canada.

G18. Con Artist Games. 2012.The Last Stand: Dead Zone.
Game [Browser]. (01 January 2012). Con Artist Games,
Melbourne, Australia.

G19.CritGame, Inc. 2013.Battle Without End. Game [Flash].
(16 February 2013). CritGame, Hangzhou, China.

G20. Crovie. 2013.Idle Mine. Game [Browser]. (
November 2013). Crovie.

G21. David Stark. 2014.CivClicker. Game [Browser]. (
January 2014). David Stark, Oxford, UK.
G22. Deathray Games. 2014.Conspiracy Clicker. Game
[Browser]. (01 January 2014). Deathray Games.

```
G23.Divine Games. 2015.Realm Grinder. Game [Browser].
(01 January 2015). Divine Games, Italy.
G24.Edgebee Studios Inc. 2013.Swords & Potions 2. Game
[Browser]. (01 January 2013). Edgebee Studios Inc,
Montreal , QC, Canada.
G25. Eric Fredricksen. 2002.Progress Quest. Game
[Browser]. (01 January 2002). Eric Fredricksen, Spring,
Texas, USA.
G26. Exception_e. 2015.Woodclicker. Game [Browser]. (
April 2015). Exception_e, UK.
G27. Finnian10. 2016.Casino Clicker. Game [Flash]. (
March 2016). Finnian10.
G28. Fire Sword Studios. 2016.The Perfect Tower. Game
[Browser]. (17 March 2016). Fire Sword Studios, Vienna,
Austria.
G29. GaiaByte. 2017.Cosmos Quest. Game [Browser]. (
February 2017). GaiaByte, Barcelona, Spain.
G30.Gaz Thomas. 2015.Tangerine Tycoon. Game [Browser].
(21 January 2015). Gaz Thomas, North Wales, UK.
G31. Godville Games Ltd. 2010.Godville. Game [Browser].
(01 January 2010). Godville Games Ltd, Sheung Wan,
Hong Kong.
G32. Green Satellite. 2015.Trimps. Game [Browser]. (
July 2015). Green Satellite.
G33.gzgreg. 2014.Derivative Clicker. Game [Browser]. (
January 2014). gzgreg.
G34.Holyday Studios. 2015.Holyday City. Game [Browser].
(01 April 2015). Holyday Studios.
G35. Holyday Studios. 2016.Midas’ Gold Plus. Game
[Browser]. (17 Feb 2016). Holyday Studios.
G36. Hotdog Vendor. 2013.Sandcastle Builder. Game
[Browser]. (01 January 2013). Hotdog Vendor, Australia.
G37. Hyper Hippo Games. 2016.Guild Quest. Game
[Browser]. (26 August 2016). Hyper Hippo Productions,
Kelowna, BC, Canada.
G38. Hyper Hippo Productions. 2014.AdVenture Capitalist.
Game [Flash]. (01 January 2014). Hyper Hippo
Productions, Kelowna, BC, Canada.
G39. Ian Bogost. 2010.Cow Clicker. Game [Facebook]. (
January 2010). Ian Bogost, Atlanta, GA, USA.
G40. IOU RPG. 2015.Idle Online Universe. Game [Flash].
(14 July 2015). IOU RPG.
G41. Ironhide Game Studio. 2011.Kingdom Rush. Game
[Browser]. (01 January 2011). Armor Games, Irvine, CA,
USA.
G42. Jacob Grahn. 2008.Platform Racing 2. Game
[Browser]. (01 January 2008). Jacob Grahn, Finland.
G43. jamboska. 2016.Gifts Clicker. Game [Browser]. (
March 2016). jamboska.
G44.Javelin Ltd. 2010.TDP4 Team Battle. Game [Browser].
(01 January 2010). Javelin Ltd, Tallinn, Estonia.
```

G45. Joe Pendon. 2014.The Monolith. Game [Browser]. (
January 2014). Crucial App Concepts Inc, Katy, TX,
USA.

G46.Joe Zeng. 2014.Goomy Clicker 2. Game [Browser]. (
January 2014). Joe Zeng, Toronto, Ontario, Canada.

G47. John Conway. 1970.Conway’s Game of Life. Game
[Browser]. (01 January 1970). John Conway, Princeton,
NJ, USA.

G48. John Cooney. 2014.Idleplex. Game [Browser]. (
February 2014). Kongergate, Stockholm, Sweden.

G49. John S. Berry. 2015.A Trainer’s Progress. Game
[Browser]. (19 April 2015). John S. Berry.

G50.Julien Thiennot. 2013.Cookie Clicker. Game [Browser].
(01 January 2013). John Conway, Princeton, NJ, USA.

G51. Kappsule Studios. 2016.Mad CEO. Game [Browser].
(26 September 2016). Kappsule Studios, Bucharest,
Romania.

G52. Kemojo Studios. 2016.Tap Cats - Idle Warfare. Game
[Browser]. (19 January 2016). Kemojo Studios,
Vancouver, BC, Canada.

G53. Kevin Ryan. 1993.The incredible Machine. Game
[Windows]. (01 January 1993). Dynamix Inc, Eugene,
Oregon, USA.

G54. Lampogolovii. 2016.Blacksmith Lab. Game [Flash].
(17 February 2016). GamesButler, Tampa, FL, USA.

G55. Light Bringer Games. 2014.Learn to Fly Idle. Game
[Browser]. (21 January 2014). Light Bringer Games,
Saint-Jean-sur-Richelieu, Quebec, Canada.

G56. Lukk3. 2010.The Idle RPG. Game [Browser]. (
February 2010). Lukk3, USA.

G57. Mad Labyrinth Studios. 2017.God Awefull Clicker.
Game [Browser]. (20 January 2017). Mad Labyrinth
Studios.

G58. Mark Eyles. 2006.Ambient Quest. Game [Windows].
(01 January 2006). Mark Eyles, Portsmouth, Hampshire,
England.

G59. Michael Townsend and Amir Rajan. 2013.A Dark
Room. Game [Flash]. (10 June 2013). Doublespeak
Games, Ottawa, ON, Canada.

```
G60.MINMAXIA. 2014.Clickpocalypse 2. Game [Browser].
(01 January 2014). MINMAXIA.
G61.Moldy Games. 2014.Idle Oil Tycoon. Game [Browser].
(17 November 2014). Moldy Games.
G62. Ninjakiwi. 2012.Bloons TD 5. Game [Browser]. (
January 2012). Ninjakiwi, Auckland, New Zealand.
G63. Original Games. 2006.ClickClickClick. Game
[Browser]. (01 January 2006). DLC Websites,
Petersfield, Hampshire, UK.
G64. Player_03. 2008.Run. Game [Browser]. (01 January
2008). Player_03.
G65.PlayFlock. 2016.Insanity Clicker. Game [Browser]. (
November 2016). PlayFlock, Moscow, Russia.
G66.Playsaurus. 2014.Clicker Heroes. Game [Browser]. (
January 2014). Playsaurus, Los Angeles, CA, USA.
G67. Proton Studio. 2015.Time Clickers. Game [Browser].
(23 July 2015). Proton Studio, Calgary, Alberta, Canada.
G68. R2Games. 2012.Wartune. Game [Browser]. (
January 2012). R2Games, Shenzhen, China.
G69. Sad Panda Studios. 2016.Crush Crush. Game
[Browser]. (09 February 2016). Sad Panda Studios,
Kelowna, BC, Canada.
G70. Shugasu UG. 2014.Idling to Rule the Gods. Game
[Browser]. (01 October 2014). Shugasu UG, Nuremberg,
Germany.
G71. Spil Games. 2015.Hero Simulator. Game [Browser].
(15 July 2015). Spil Games, Hilversum, Netherlands.
G72. Swarmsim. 2015.Swarm Simulator. Game [Browser].
(01 January 2015). Swarmsim.
G73.Tukkun. 2009.Anti-Idle: The Game. Game [Flash]. (
January 2009). Tukkun.
G74. Ultrabit. 2016.Pocket Politics. Game [Browser]. (
January 2016). Ultrabit, San Diego, CA, USA.
G75. VSI Studio. 2015.Idle Civilization. Game [Browser].
(20 February 2015). VSI Studio, Romania.
G76. Wild Shadow Studios. 2011.Realm of the Mad God.
Game [Browser]. (20 January 2011). Wild Shadow
Studios, Los Altos, CA, USA.
```
