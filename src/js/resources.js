import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Spaceship: new ImageSource('public/images/spaceship.png'),
    Biker: new ImageSource('public/images/biker.png'),
    Wrench: new ImageSource('public/images/wrench.png'),
    Fish: new ImageSource('public/images/fish.png'),
    Bones: new ImageSource('public/images/bones.png'),
    Achtergrond: new ImageSource('public/images/achtergrond.jpg'), // gebruik achtergrond.jpg
    Health: new ImageSource('public/images/health.png'), // health pack image
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }