import kotlin.browser.window

class Game(private val renderer: Renderer, private val mouse: Mouse) {

    var player: Player
    val test = CircleRenderable(200,40, mouse)

    init {
        player = Player(20.0,20.0)
    }

    fun gameLoop() {
        renderer.clearScreen()
        renderer.render(player.renderable)
        renderer.render2(test)
        window.setTimeout(this::gameLoop, 20)
    }
}