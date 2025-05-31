import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {

    Alien: new ImageSource('images/alien.png'),
    Biker: new ImageSource('images/biker.png'),
    Wrench: new ImageSource('images/wrench.png'),
    Fish: new ImageSource('images/fish.png'),
    Achtergrond: new ImageSource('images/achtergrond.jpg'), // gebruik achtergrond.jpg
    Health: new ImageSource('images/health.png'), // health pack image
    Ghost: new ImageSource('images/ghost.png'),
    Mine: new ImageSource('images/mine.png'),

}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }