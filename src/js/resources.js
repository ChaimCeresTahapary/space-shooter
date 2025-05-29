import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Spaceship: new ImageSource('images/spaceship.png'),
    Bubble: new ImageSource('images/bubble.png'),
    Fish: new ImageSource('images/fish.png'),
    Bones: new ImageSource('images/bones.png'),
    Achtergrond: new ImageSource('images/achtergrond.jpg'), // gebruik achtergrond.jpg
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }