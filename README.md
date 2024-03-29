[![time spent](https://wakatime.com/badge/user/33addb7e-f5e6-470b-a55b-0a8babc62ebb/project/5fb9e2d8-27fe-465b-9c13-9511bff79b9a.svg?style=flat-square)](https://wakatime.com/badge/user/33addb7e-f5e6-470b-a55b-0a8babc62ebb/project/5fb9e2d8-27fe-465b-9c13-9511bff79b9a)
<!-- ![AppVeyor](https://img.shields.io/appveyor/build/psycho-baller/knock-knock-v2?style=flat-square) -->

## Table of contents

* [Video Demonstration](#video-demonstration)
* [What it does](#what-it-does)
* [Technologies used](#technologies-used)
* [connect with me](#connect-with-me)
* [Future plans](#future-plans)

# [Video Demonstration](https://www.youtube.com/watch?v=5kaU8oAHSq0)

https://user-images.githubusercontent.com/81759594/185756667-ef3c6b54-9e79-4b8e-ae5d-e12f4530e5c9.mov

[youtube video](https://www.youtube.com/watch?v=5kaU8oAHSq0)

# What it does

My initial goal for this project is to show knock-knock jokes in the most creative way given the skills I have in web dev.

Basics features of the project currently:
- Show the knock knock joke in sync with a [funny audio](https://youtu.be/bgr8z8Zm9WE?t=10) (not rickroll) with cool animations.
- being able to add in your knock knock jokes or/and riddle through it

After 2 months of working on it(APR/22-JUN/22), I made a lot of additions, subtractions, and changes of plans. My learning aim for this project was to be familiar and comfortable with NextJs/ReactJs since this is my first time I use them. In addition to that, I wanted to get used to TypeScript.

Please [connect with me](#connect-with-me) if you have any good ideas to improve this project in any way.

# Technologies used

- **[NextJs](https://nextjs.org/)** to create a full-stack **[ReactJs](https://reactjs.org/)** Application.
    - 1st time using it.
- **[TypeScript](https://www.typescriptlang.org/)** to create a type-safe code.
    - 1st time using it.
- **[MongoDB](https://www.mongodb.com/)** to store the knock-knock jokes in [JSON](https://en.wikipedia.org/wiki/JSON) format.
    - Thought that a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) DB would suit this project's DB needs best
    - 1st project using it.
- **[NotionAPI](https://developers.notion.com/)** to store the data the user sent from the [add-joke](https://knock-knock.vercel.app/add-joke) page in a [Notion database](https://www.notion.so/help/what-is-a-database) which I can turn into a [csv file](https://en.wikipedia.org/wiki/Comma-separated_values)
    - 1st project using it.
    - Since I love [Notion](https://www.notion.so/) and use it everyday, I had to use and learn it's API.
- **[SCSS](https://en.wikipedia.org/wiki/Sass_(stylesheet_language))** to write CSS much quicker
    - 2nd project using it.
- **[Framer Motion](https://www.framer.com/motion/)** to make cool animations in ReactJs 
    - 1st project using it.

# connect with me

if your interested in collaborating or learning how I did this, please feel free to contact me through:

discord: `Rami#2782`

Email: [rami.rami@ucalgary.ca](mailto:rami.rami@ucalgary.ca)

Instagram: [@psycho.baller](https://www.instagram.com/psycho.baller/)

[Linkedin](https://www.linkedin.com/in/rami--maalouf/)

# Future plans

For now I'm satisfied with what I created but I'm aware of the several possible improvements I can do on this project. But in terms of the big plans I would like to implement on this project:
- [ ] Make the project more collaboration friendly using MongoDB
- [ ] Gamify the experience by giving points for every guessed riddle or knock-knock completion
- [ ] Being able to drag each joke and put it in a good or bad joke bucket (using framer motion drag)
- [x] Faster render time
