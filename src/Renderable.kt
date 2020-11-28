import org.w3c.dom.CanvasRenderingContext2D

abstract class Renderable(var x: () -> Int, var y: () -> Int, var width: () -> Int, var height: () -> Int) {
    abstract fun render(context: CanvasRenderingContext2D)
}