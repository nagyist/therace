var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gio on 6/4/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var Container = PIXI.Container;
            var Graphics = PIXI.Graphics;
            var Launcher = (function () {
                function Launcher() {
                    this.GAME_WIDTH = 800;
                    this.GAME_HEIGHT = 600;
                    // Setup stage and renderer
                    this._stage = new Container();
                    this._renderer = PIXI.autoDetectRenderer(this.GAME_WIDTH, this.GAME_HEIGHT, {
                        antialias: false,
                        transparent: false,
                        resolution: 1
                    });
                    this._renderer.backgroundColor = 0x141414;
                    // Add view to HTML DOM tree
                    document.body.appendChild(this._renderer.view);
                    // Create progress bar
                    this.initProgressBar();
                    // Start loading assets
                    PIXI.loader
                        .add([
                        "test.png"
                    ])
                        .load(this.onLoadComplete.bind(this))
                        .on("progress", this.onLoadProgress.bind(this));
                }
                Launcher.prototype.initProgressBar = function () {
                    // Instantiate
                    this._progressBar = new Graphics();
                    // Initially draw empty progress bar
                    this.drawProgressBar(0x333333, this.GAME_WIDTH * .5);
                    // Add to display list
                    this._stage.addChild(this._progressBar);
                    // Render the stage
                    this._renderer.render(this._stage);
                };
                Launcher.prototype.drawProgressBar = function (color, width) {
                    // Draw
                    this._progressBar
                        .beginFill(color)
                        .drawRect(this.GAME_WIDTH * .25, this.GAME_HEIGHT * .5 - 2, width, 4).endFill();
                };
                Launcher.prototype.onLoadProgress = function () {
                    // Fill the progress bar
                    this.drawProgressBar(0xCCCCCC, this.GAME_WIDTH * .5 * PIXI.loader.progress * 0.01);
                    // Render the stage
                    this._renderer.render(this._stage);
                };
                Launcher.prototype.onLoadComplete = function () {
                    console.log("onLoadComplete");
                    // Dispose progress bar
                    this._stage.removeChild(this._progressBar);
                    this._progressBar = null;
                    // Instantiate game object
                    this._game = new therace.RaceController(this._stage, this._renderer);
                };
                return Launcher;
            }());
            therace.Launcher = Launcher;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
/**
 * Created by gio on 6/4/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var RaceController = (function () {
                function RaceController(stage, renderer) {
                    // Init view and add to stage
                    this._view = new therace.RaceView(renderer);
                    stage.addChild(this._view);
                    // Init model
                    this._model = new therace.RaceModel();
                    this._model.attachObserver(this._view, true);
                }
                return RaceController;
            }());
            therace.RaceController = RaceController;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
/**
 * Created by gio on 6/4/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var RaceModel = (function () {
                function RaceModel() {
                    this._observers = [];
                }
                RaceModel.prototype.attachObserver = function (observer, immediateUpdate) {
                    if (this._observers.indexOf(observer) == -1)
                        this._observers.push(observer);
                    if (immediateUpdate)
                        observer.update(this);
                };
                RaceModel.prototype.detachObserver = function (observer) {
                    var idx = this._observers.indexOf(observer);
                    if (idx != -1)
                        this._observers.splice(idx, 1);
                };
                RaceModel.prototype.updateObservers = function (updateType) {
                    if (updateType === void 0) { updateType = null; }
                    var observer;
                    for (var i = 0, l = this._observers.length; i < l; i++) {
                        observer = this._observers[i];
                        if (updateType) {
                            if (observer.hasOwnProperty("update_" + updateType))
                                observer["update_" + updateType](this);
                            else
                                console.log("update_" + updateType + " not found on observer", observer);
                        }
                        else
                            observer.update(this);
                    }
                };
                return RaceModel;
            }());
            therace.RaceModel = RaceModel;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
/**
 * Created by gio on 6/4/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var Container = PIXI.Container;
            var RaceView = (function (_super) {
                __extends(RaceView, _super);
                function RaceView(_renderer) {
                    _super.call(this);
                    this._renderer = _renderer;
                    // Used to optimize draw calls and manually control whether or not should the renderer redraw the stage
                    this.isDirty = true;
                    // Bind render method to this
                    this.render = this.render.bind(this);
                    // Start rendering loop
                    this.render();
                }
                RaceView.prototype.update = function (observable) {
                    this.isDirty = true;
                };
                RaceView.prototype.render = function () {
                    requestAnimationFrame(this.render);
                    if (this.isDirty)
                        this._renderer.render(this);
                };
                return RaceView;
            }(Container));
            therace.RaceView = RaceView;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
//# sourceMappingURL=race.js.map