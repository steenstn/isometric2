class Mouse(var x: Double = 0.0, var y: Double = 0.0, var leftButton: Boolean = false) {
    val renderable = DefaultRenderable({x.toInt()}, {y.toInt()}, {4}, {4})
}