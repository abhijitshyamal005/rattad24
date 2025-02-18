#Rattad24

## To get a local copy of this repository kindly follow the steps below.

- Scroll to top of this current repository
- Click on the `Code` button with background color green on the right end corner
- Click on the clipboard icon on the extreme right of the dropdown to copy the repository link
- In your local PC, open your terminal or command prompt in the folder you would like to clone this repository into
- Type `git clone (copied link)` on the currently opened terminal or command prompt
- Remember to change `(copied link)` to `git@github.com:Retink-Media/simplecx_landing_page.git` which is the name of the repository

## How to run the project

### To run in development mode

`npm run dev`

### To fix all lint and format with biome

`npm run biome:check`


## Guidelines

- Reuseable components must be created inside **/src/app/components** (a reuseable component is a component that is used in more than one route e.g Header and Footer)
- Create a sub components folder to use reusueable components within a route (e.g for /about create /about/components/Story.tsx) make sure you dont use this component outside /about else move into /src/app/components
- Endeavor to be creative with naming of files and folders
- Endeavor not to modify **src/app/global.css** file
- Endeavor not to modify **next.config.ts** file

> [!CAUTION]
>
> - Do not make changes to `biome.json` file
> - Do not make changes to `.github/workflows` directory
