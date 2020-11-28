class Arm(x: Double, y: Double, var offsetX: Double, var offsetY: Double) {
    var startX = x+offsetX
    var startY = y+offsetY
    var grabX : Double = 0.0
    var grabY : Double = 0.0
}