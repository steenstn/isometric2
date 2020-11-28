import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.DedicatedWorkerGlobalScope
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document
import kotlin.browser.window


external val self: DedicatedWorkerGlobalScope
fun main() {
    val canvas = document.getElementById("c") as HTMLCanvasElement

    val context = canvas.getContext("2d") as CanvasRenderingContext2D
    val control = Control()
    self.addEventListener("keydown", {
        println("worker got message!")

    })
    val mouse = Mouse()

    canvas.addEventListener("mousedown", {
        mouse.leftButton = true
    })
    canvas.addEventListener("mouseup", {
        mouse.leftButton = false
    })
    canvas.addEventListener("mousemove", {
        val event = it as MouseEvent
        var top = 0
        var left = 0
        var obj: dynamic = canvas
        while (obj != null && obj.tagName != "body") {
            top += obj.offsetTop as Int
            left += obj.offsetLeft as Int
            obj = obj.offsetParent
        }

        mouse.x = (event.clientX - left + window.pageXOffset) / 2 + 160 // Varför 160?
        mouse.y = (event.clientY - top + window.pageYOffset) / 2
    })

    canvas.width = 640
    canvas.height = 300

    val renderer = Renderer(context)
    val game = Game(renderer, mouse)
    game.gameLoop()
}
