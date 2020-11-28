import org.w3c.dom.CanvasRenderingContext2D

class DefaultRenderable(x: () -> Int, y: () -> Int, width: () -> Int, height: () -> Int) : Renderable(x, y, width, height) {
    override fun render(context: CanvasRenderingContext2D) {

        context.fillStyle = "rgb(255,255,255)"
        context.fillRect(x.invoke().toDouble(), y.invoke().toDouble(), width.invoke().toDouble(), height.invoke().toDouble())
    }

}
