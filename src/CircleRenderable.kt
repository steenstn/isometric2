import org.w3c.dom.CanvasRenderingContext2D
import kotlin.math.*
import kotlin.random.Random

class CircleRenderable(var x: Int, var y: Int, val mouse: Mouse) {

    private val window = 50
    var arms: List<Arm> = listOf(
            Arm(x.toDouble(),y.toDouble(),-8.0, -8.0),
            Arm(x.toDouble(),y.toDouble(),-8.0, +5.0),
            Arm(x.toDouble(),y.toDouble(),+5.0, -8.0),
            Arm(x.toDouble(),y.toDouble(),+5.0, +5.0))

    var speed = 2.0
    fun render(context: CanvasRenderingContext2D) {
        val dirPosition = Coordinate(mouse.x, mouse.y)
        val dirVector = Vector(dirPosition.x - x, dirPosition.y - y).normalize()
        speed = 0.5

        arms.forEach {
            val length = Vector(it.grabX - x, it.grabY - y).length() / if (mouse.leftButton) 30 else 50
            speed += length
        }
        x += (speed * dirVector.x).roundToInt()
        y += (speed * dirVector.y).roundToInt()

        context.fillStyle = "rgb(255,255,255)"
        for (drawingX in x - window..x + window) {
            for (drawingY in y - window..y + window) {
                if ((drawingX - x) * (drawingX - x) + (drawingY - y) * (drawingY - y) < 200) {
                    context.fillRect(drawingX.toDouble(), drawingY.toDouble(), 1.0, 1.0)

                }

            }
        }

        val lookingAngle = atan2(dirPosition.y - y, dirPosition.x - x)
        var angleOffset = PI/3
        for(i in arms.indices) {
            val arm = arms[i]
            arm.offsetX = 9*cos(lookingAngle-angleOffset+i)
            arm.offsetY = 9*sin(lookingAngle-angleOffset+i)

            arm.startX = x+arm.offsetX
            arm.startY = y+arm.offsetY
            val lineLength = (arm.grabX - arm.startX) * (arm.grabX - arm.startX) + (arm.grabY - arm.startY) * (arm.grabY - arm.startY)
            val lineVector = Vector(arm.grabX - arm.startX, arm.grabY - arm.startY)

            if (lineLength < 100 || lineLength > 2000) {
                val angle = atan2(arm.startY - y, arm.startX - x)
                val minLength = if(i ==1 || i == 2) 40.0 else 20.0
                val armLength = Random.nextDouble(minLength, 90.0)

                val newAngle = when(i) {
                    0 -> angle + Random.nextDouble(0.0, PI / 2)
                    1 -> angle + Random.nextDouble(-PI / 8, PI / 3)
                    2 -> angle + Random.nextDouble(-PI / 3, PI / 8)
                    3 -> angle + Random.nextDouble(-PI / 2, 0.0)
                    else -> angle + Random.nextDouble(-PI / 6, PI / 6)
                }


                val newX = x + armLength * cos(newAngle)
                val newY = y + armLength * sin(newAngle)
                arm.grabX = newX
                arm.grabY = newY
            } else {
                context.strokeStyle = "rgb(255,255,255)"
                context.lineWidth = 2.0;

                context.beginPath();
                context.moveTo(arm.startX, arm.startY)
                context.lineTo(arm.grabX, arm.grabY)
                context.stroke();
            }

        }

        arms.forEach {
            context.fillStyle = "rgb(255,0,0)"
            context.beginPath()
            context.arc(it.startX, it.startY, 2.0, 0.0,2*PI)
            context.fill()
        }
    }

}