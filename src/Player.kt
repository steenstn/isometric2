import kotlin.math.roundToInt

class Player(var x: Double, var y: Double) {

    val renderable = DefaultRenderable({x.roundToInt()},{y.roundToInt()},{10},{10})

}