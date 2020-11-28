import org.w3c.dom.CanvasRenderingContext2D
import kotlin.math.*
import kotlin.random.Random

class CircleRenderable(var x: Int, var y: Int, val mouse: Mouse) {

    private val window = 50
    private val grabWindow = 10
    var arms: List<Arm> = listOf(
            Arm(x.toDouble(),y.toDouble(),-8.0, -8.0),
            Arm(x.toDouble(),y.toDouble(),-8.0, +5.0),
            Arm(x.toDouble(),y.toDouble(),+5.0, -8.0),
            Arm(x.toDouble(),y.toDouble(),+5.0, +5.0))

    var speed = 2.0
    fun render(context: CanvasRenderingContext2D) {
        val dirPosition = Coordinate(mouse.x, mouse.y)
        val dirVector = Vector(dirPosition.x - x, dirPosition.y - y).normalize()
        speed = 0.0

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
        arms.forEach { arm ->
            
            arm.startX = x+arm.offsetX
            arm.startY = y+arm.offsetY
            //if((point.x - x) * (point.x - x) + (point.y - y) * (point.y - y) < 400) {
            context.strokeStyle = "rgb(255,255,255)"
            context.lineWidth = 2.0;

            context.beginPath();
            context.moveTo(arm.startX, arm.startY)
            context.lineTo(arm.grabX, arm.grabY)
            context.stroke();
            //}
            val lineLength = (arm.grabX - arm.startX) * (arm.grabX - arm.startX) + (arm.grabY - arm.startY) * (arm.grabY - arm.startY)
            val lineVector = Vector(arm.grabX - arm.startX, arm.grabY - arm.startY)

            if (lineLength < 100 || lineLength > 2000) {
                val angle = atan2(arm.startY - y, arm.startX - x)
                val armLength = Random.nextDouble(10.0, 80.0)
                val newAngle = angle + Random.nextDouble(-PI / 2, PI / 2)
                val newX = x + armLength * cos(newAngle)
                val newY = y + armLength * sin(newAngle)
                arm.grabX = newX
                arm.grabY = newY
            }
        }

        arms.forEach {
            context.fillStyle = "rgb(255,0,0)"
            context.fillRect(it.startX, it.startY, 5.0, 5.0)
        }
    }

}