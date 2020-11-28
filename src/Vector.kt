import kotlin.math.sqrt

class Vector(val x: Double, val y: Double) {

    fun dot(vector: Vector) : Double = x*vector.x + y*vector.y

    fun normalize(): Vector {
        val abs = sqrt(x*x+y*y)
        return Vector(x/abs, y/abs)
    }

    fun length(): Double = sqrt(x*x+y*y)
}