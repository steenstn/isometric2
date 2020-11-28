if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'isometric2'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'isometric2'.");
}
var isometric2 = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var roundToInt = Kotlin.kotlin.math.roundToInt_yrwdxr$;
  var math = Kotlin.kotlin.math;
  var Random = Kotlin.kotlin.random.Random;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var Math_0 = Math;
  var Unit = Kotlin.kotlin.Unit;
  var getCallableRef = Kotlin.getCallableRef;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwUPAE = Kotlin.throwUPAE;
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var numberToInt = Kotlin.numberToInt;
  DefaultRenderable.prototype = Object.create(Renderable.prototype);
  DefaultRenderable.prototype.constructor = DefaultRenderable;
  function Arm(x, y, offsetX, offsetY) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.startX = x + this.offsetX;
    this.startY = y + this.offsetY;
    this.grabX = 0.0;
    this.grabY = 0.0;
  }
  Arm.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Arm',
    interfaces: []
  };
  function CircleRenderable(x, y, mouse) {
    this.x = x;
    this.y = y;
    this.mouse = mouse;
    this.window_0 = 50;
    this.arms = listOf([new Arm(this.x, this.y, -8.0, -8.0), new Arm(this.x, this.y, -8.0, +5.0), new Arm(this.x, this.y, +5.0, -8.0), new Arm(this.x, this.y, +5.0, +5.0)]);
    this.speed = 2.0;
  }
  CircleRenderable.prototype.render_f69bme$ = function (context) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    var dirPosition = new Coordinate(this.mouse.x, this.mouse.y);
    var dirVector = (new Vector(dirPosition.x - this.x, dirPosition.y - this.y)).normalize();
    this.speed = 0.5;
    var tmp$_4;
    tmp$_4 = this.arms.iterator();
    while (tmp$_4.hasNext()) {
      var element = tmp$_4.next();
      var length = (new Vector(element.grabX - this.x, element.grabY - this.y)).length() / (this.mouse.leftButton ? 30 : 50);
      this.speed += length;
    }
    this.x = this.x + roundToInt(this.speed * dirVector.x) | 0;
    this.y = this.y + roundToInt(this.speed * dirVector.y) | 0;
    context.fillStyle = 'rgb(255,255,255)';
    tmp$ = this.x - this.window_0 | 0;
    tmp$_0 = this.x + this.window_0 | 0;
    for (var drawingX = tmp$; drawingX <= tmp$_0; drawingX++) {
      tmp$_1 = this.y - this.window_0 | 0;
      tmp$_2 = this.y + this.window_0 | 0;
      for (var drawingY = tmp$_1; drawingY <= tmp$_2; drawingY++) {
        if ((Kotlin.imul(drawingX - this.x | 0, drawingX - this.x | 0) + Kotlin.imul(drawingY - this.y | 0, drawingY - this.y | 0) | 0) < 200) {
          context.fillRect(drawingX, drawingY, 1.0, 1.0);
        }
      }
    }
    var y = dirPosition.y - this.y;
    var x = dirPosition.x - this.x;
    var lookingAngle = Math_0.atan2(y, x);
    var angleOffset = math.PI / 3;
    tmp$_3 = this.arms;
    for (var i = 0; i !== tmp$_3.size; ++i) {
      var tmp$_5;
      var arm = this.arms.get_za3lpa$(i);
      var x_0 = lookingAngle - angleOffset + i;
      arm.offsetX = 9 * Math_0.cos(x_0);
      var x_1 = lookingAngle - angleOffset + i;
      arm.offsetY = 9 * Math_0.sin(x_1);
      arm.startX = this.x + arm.offsetX;
      arm.startY = this.y + arm.offsetY;
      var lineLength = (arm.grabX - arm.startX) * (arm.grabX - arm.startX) + (arm.grabY - arm.startY) * (arm.grabY - arm.startY);
      var lineVector = new Vector(arm.grabX - arm.startX, arm.grabY - arm.startY);
      if (lineLength < 100 || lineLength > 2000) {
        var y_0 = arm.startY - this.y;
        var x_2 = arm.startX - this.x;
        var angle = Math_0.atan2(y_0, x_2);
        var minLength = i === 1 || i === 2 ? 40.0 : 20.0;
        var armLength = Random.Default.nextDouble_lu1900$(minLength, 90.0);
        switch (i) {
          case 0:
            tmp$_5 = angle + Random.Default.nextDouble_lu1900$(0.0, math.PI / 2);
            break;
          case 1:
            tmp$_5 = angle + Random.Default.nextDouble_lu1900$(-math.PI / 8, math.PI / 3);
            break;
          case 2:
            tmp$_5 = angle + Random.Default.nextDouble_lu1900$(-math.PI / 3, math.PI / 8);
            break;
          case 3:
            tmp$_5 = angle + Random.Default.nextDouble_lu1900$(-math.PI / 2, 0.0);
            break;
          default:tmp$_5 = angle + Random.Default.nextDouble_lu1900$(-math.PI / 6, math.PI / 6);
            break;
        }
        var newAngle = tmp$_5;
        var newX = this.x + armLength * Math_0.cos(newAngle);
        var newY = this.y + armLength * Math_0.sin(newAngle);
        arm.grabX = newX;
        arm.grabY = newY;
      }
       else {
        context.strokeStyle = 'rgb(255,255,255)';
        context.lineWidth = 2.0;
        context.beginPath();
        context.moveTo(arm.startX, arm.startY);
        context.lineTo(arm.grabX, arm.grabY);
        context.stroke();
      }
    }
    var tmp$_6;
    tmp$_6 = this.arms.iterator();
    while (tmp$_6.hasNext()) {
      var element_0 = tmp$_6.next();
      context.fillStyle = 'rgb(255,0,0)';
      context.beginPath();
      context.arc(element_0.startX, element_0.startY, 2.0, 0.0, 2 * math.PI);
      context.fill();
    }
  };
  CircleRenderable.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CircleRenderable',
    interfaces: []
  };
  function Control() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
  }
  Control.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Control',
    interfaces: []
  };
  function Coordinate(x, y) {
    this.x = x;
    this.y = y;
  }
  Coordinate.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Coordinate',
    interfaces: []
  };
  Coordinate.prototype.component1 = function () {
    return this.x;
  };
  Coordinate.prototype.component2 = function () {
    return this.y;
  };
  Coordinate.prototype.copy_lu1900$ = function (x, y) {
    return new Coordinate(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Coordinate.prototype.toString = function () {
    return 'Coordinate(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Coordinate.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Coordinate.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function DefaultRenderable(x, y, width, height) {
    Renderable.call(this, x, y, width, height);
  }
  DefaultRenderable.prototype.render_f69bme$ = function (context) {
    context.fillStyle = 'rgb(255,255,255)';
    context.fillRect(this.x(), this.y(), this.width(), this.height());
  };
  DefaultRenderable.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'DefaultRenderable',
    interfaces: [Renderable]
  };
  function Game(renderer, mouse) {
    this.renderer_0 = renderer;
    this.mouse_0 = mouse;
    this.player = null;
    this.test = new CircleRenderable(200, 40, this.mouse_0);
    this.player = new Player(20.0, 20.0);
  }
  Game.prototype.gameLoop = function () {
    this.renderer_0.clearScreen();
    this.renderer_0.render_ib3mk0$(this.player.renderable);
    this.renderer_0.render2_vanym8$(this.test);
    window.setTimeout(getCallableRef('gameLoop', function ($receiver) {
      return $receiver.gameLoop(), Unit;
    }.bind(null, this)), 20);
  };
  Game.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Game',
    interfaces: []
  };
  function IsoCoordinate(x, y) {
    this.x = x;
    this.y = y;
  }
  IsoCoordinate.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IsoCoordinate',
    interfaces: []
  };
  IsoCoordinate.prototype.component1 = function () {
    return this.x;
  };
  IsoCoordinate.prototype.component2 = function () {
    return this.y;
  };
  IsoCoordinate.prototype.copy_lu1900$ = function (x, y) {
    return new IsoCoordinate(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  IsoCoordinate.prototype.toString = function () {
    return 'IsoCoordinate(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  IsoCoordinate.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  IsoCoordinate.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function KeyCode() {
    KeyCode_instance = this;
    this.A = 65;
    this.D = 68;
    this.S = 83;
    this.O = 79;
    this.W = 87;
  }
  KeyCode.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'KeyCode',
    interfaces: []
  };
  var KeyCode_instance = null;
  function KeyCode_getInstance() {
    if (KeyCode_instance === null) {
      new KeyCode();
    }
    return KeyCode_instance;
  }
  function Level() {
    this.level_dxyy9s$_0 = this.level_dxyy9s$_0;
    this.levelWidth_0 = 100;
    this.levelHeight_0 = 100;
  }
  Object.defineProperty(Level.prototype, 'level', {
    get: function () {
      if (this.level_dxyy9s$_0 == null)
        return throwUPAE('level');
      return this.level_dxyy9s$_0;
    },
    set: function (level) {
      this.level_dxyy9s$_0 = level;
    }
  });
  Level.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Level',
    interfaces: []
  };
  function main$lambda(it) {
    println('worker got message!');
    return Unit;
  }
  function main$lambda_0(closure$mouse) {
    return function (it) {
      closure$mouse.leftButton = true;
      return Unit;
    };
  }
  function main$lambda_1(closure$mouse) {
    return function (it) {
      closure$mouse.leftButton = false;
      return Unit;
    };
  }
  function main$lambda_2(closure$canvas, closure$mouse) {
    return function (it) {
      var tmp$;
      var event = Kotlin.isType(tmp$ = it, MouseEvent) ? tmp$ : throwCCE();
      var top = 0;
      var left = 0;
      var obj = closure$canvas;
      while (obj != null && obj.tagName != 'body') {
        var tmp$_0;
        top = top + (typeof (tmp$_0 = obj.offsetTop) === 'number' ? tmp$_0 : throwCCE()) | 0;
        var tmp$_1;
        left = left + (typeof (tmp$_1 = obj.offsetLeft) === 'number' ? tmp$_1 : throwCCE()) | 0;
        obj = obj.offsetParent;
      }
      closure$mouse.x = ((event.clientX - left | 0) + window.pageXOffset) / 2 + 160;
      closure$mouse.y = ((event.clientY - top | 0) + window.pageYOffset) / 2;
      return Unit;
    };
  }
  function main() {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('c'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    var control = new Control();
    self.addEventListener('keydown', main$lambda);
    var mouse = new Mouse();
    canvas.addEventListener('mousedown', main$lambda_0(mouse));
    canvas.addEventListener('mouseup', main$lambda_1(mouse));
    canvas.addEventListener('mousemove', main$lambda_2(canvas, mouse));
    canvas.width = 640;
    canvas.height = 300;
    var renderer = new Renderer(context);
    var game = new Game(renderer, mouse);
    game.gameLoop();
  }
  function Mouse(x, y, leftButton) {
    if (x === void 0)
      x = 0.0;
    if (y === void 0)
      y = 0.0;
    if (leftButton === void 0)
      leftButton = false;
    this.x = x;
    this.y = y;
    this.leftButton = leftButton;
    this.renderable = new DefaultRenderable(Mouse$renderable$lambda(this), Mouse$renderable$lambda_0(this), Mouse$renderable$lambda_1, Mouse$renderable$lambda_2);
  }
  function Mouse$renderable$lambda(this$Mouse) {
    return function () {
      return numberToInt(this$Mouse.x);
    };
  }
  function Mouse$renderable$lambda_0(this$Mouse) {
    return function () {
      return numberToInt(this$Mouse.y);
    };
  }
  function Mouse$renderable$lambda_1() {
    return 4;
  }
  function Mouse$renderable$lambda_2() {
    return 4;
  }
  Mouse.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Mouse',
    interfaces: []
  };
  function Player(x, y) {
    this.x = x;
    this.y = y;
    this.renderable = new DefaultRenderable(Player$renderable$lambda(this), Player$renderable$lambda_0(this), Player$renderable$lambda_1, Player$renderable$lambda_2);
  }
  function Player$renderable$lambda(this$Player) {
    return function () {
      return roundToInt(this$Player.x);
    };
  }
  function Player$renderable$lambda_0(this$Player) {
    return function () {
      return roundToInt(this$Player.y);
    };
  }
  function Player$renderable$lambda_1() {
    return 10;
  }
  function Player$renderable$lambda_2() {
    return 10;
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function Renderable(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  Renderable.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Renderable',
    interfaces: []
  };
  function Renderer(context) {
    this.context_0 = context;
  }
  Renderer.prototype.clearScreen = function () {
    this.context_0.fillStyle = 'rgb(0,0,0)';
    this.context_0.fillRect(0.0, 0.0, 640.0, 500.0);
  };
  Renderer.prototype.render_ib3mk0$ = function (renderable) {
    renderable.render_f69bme$(this.context_0);
  };
  Renderer.prototype.render2_vanym8$ = function (renderable) {
    renderable.render_f69bme$(this.context_0);
  };
  Renderer.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Renderer',
    interfaces: []
  };
  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }
  Vector.prototype.dot_spvnod$ = function (vector) {
    return this.x * vector.x + this.y * vector.y;
  };
  Vector.prototype.normalize = function () {
    var x = this.x * this.x + this.y * this.y;
    var abs = Math_0.sqrt(x);
    return new Vector(this.x / abs, this.y / abs);
  };
  Vector.prototype.length = function () {
    var x = this.x * this.x + this.y * this.y;
    return Math_0.sqrt(x);
  };
  Vector.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vector',
    interfaces: []
  };
  _.Arm = Arm;
  _.CircleRenderable = CircleRenderable;
  _.Control = Control;
  _.Coordinate = Coordinate;
  _.DefaultRenderable = DefaultRenderable;
  _.Game = Game;
  _.IsoCoordinate = IsoCoordinate;
  Object.defineProperty(_, 'KeyCode', {
    get: KeyCode_getInstance
  });
  _.Level = Level;
  _.main = main;
  _.Mouse = Mouse;
  _.Player = Player;
  _.Renderable = Renderable;
  _.Renderer = Renderer;
  _.Vector = Vector;
  main();
  Kotlin.defineModule('isometric2', _);
  return _;
}(typeof isometric2 === 'undefined' ? {} : isometric2, kotlin);
