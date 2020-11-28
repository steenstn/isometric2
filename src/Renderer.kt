import org.w3c.dom.CanvasRenderingContext2D

class Renderer(private val context: CanvasRenderingContext2D) {

    fun clearScreen() {
        context.fillStyle = "rgb(0,0,0)"
        context.fillRect(0.0,0.0,640.0,500.0)
    }

    fun render(renderable: Renderable) {
        renderable.render(context)
    }

    fun render2(renderable: CircleRenderable) {
        renderable.render(context)
    }
}