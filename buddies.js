// THIS FILES CONTAINS THE CLASSES TO CREATE THE BUDDIES AND APPEND THEM TO THE PAGE

class Buddy {
  constructor(type) {
    // create container and append to body
    this.node = document.createElement('div')
    document.body.append(this.node)
    this.node.style.cssText = 'position: fixed; bottom: 0;'
    // create img inside of div
    this.image = document.createElement('img')
    this.image.setAttribute('src', 'https://static.wikia.nocookie.net/jujutsu-kaisen/images/e/ef/Satoru_Gojo_%28Anime_2%29.png')
    this.image.style.height = '100px'
    this.node.append(this.image)
  }
}
