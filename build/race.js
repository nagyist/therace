var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gio on 6/5/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var Helper = (function () {
                function Helper() {
                }
                Helper.formatMoney = function (value) {
                    return (value / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                };
                return Helper;
            }());
            therace.Helper = Helper;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
/**
 * Created by gio on 6/5/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var AObservable = (function () {
                function AObservable() {
                    this._observers = [];
                }
                AObservable.prototype.attachObserver = function (observer, immediateUpdate) {
                    if (immediateUpdate === void 0) { immediateUpdate = true; }
                    if (this._observers.indexOf(observer) == -1)
                        this._observers.push(observer);
                    if (immediateUpdate)
                        observer.update(this);
                };
                AObservable.prototype.detachObserver = function (observer) {
                    var idx = this._observers.indexOf(observer);
                    if (idx != -1)
                        this._observers.splice(idx, 1);
                };
                AObservable.prototype.updateObservers = function (updateType) {
                    if (updateType === void 0) { updateType = null; }
                    var observer;
                    for (var i = 0, l = this._observers.length; i < l; i++) {
                        observer = this._observers[i];
                        if (updateType) {
                            if (observer["update_" + updateType] !== undefined)
                                observer["update_" + updateType](this);
                            else
                                console.log("update_" + updateType + " not found on observer", observer);
                        }
                        else
                            observer.update(this);
                    }
                };
                return AObservable;
            }());
            therace.AObservable = AObservable;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
/**
 * Created by gio on 6/6/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var Sprite = PIXI.Sprite;
            var Text = PIXI.Text;
            var Container = PIXI.Container;
            var Chip = (function (_super) {
                __extends(Chip, _super);
                function Chip(_value, _index) {
                    _super.call(this);
                    this._value = _value;
                    this._index = _index;
                    this._selected = false;
                    // Create visuals and setup scale
                    this._bg = new Sprite(PIXI.utils.TextureCache["chips_0" + (_index + 1) + ".png"]);
                    this._bg.width = Chip.CHIP_WIDTH;
                    this._bg.scale.y = this._bg.scale.x;
                    this.addChild(this._bg);
                    // Tint non-selected by default
                    this._bg.tint = 0x00CCCCCC;
                    // Define interactiveness
                    this.interactive = true;
                    // Add text display
                    var txt = new Text(this._value.toString(), { font: '14px Arial', fill: 0x0, align: 'center' });
                    txt.position.set((this._bg.width - txt.width) * .5, 5);
                    this.addChild(txt);
                }
                Object.defineProperty(Chip.prototype, "index", {
                    get: function () { return this._index; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Chip.prototype, "value", {
                    get: function () { return this._value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Chip.prototype, "selected", {
                    get: function () { return this._selected; },
                    set: function (value) {
                        this._selected = value;
                        this._bg.tint = value ? 0xFFFFFFFF : 0x00CCCCCC;
                    },
                    enumerable: true,
                    configurable: true
                });
                Chip.CHIP_WIDTH = 24;
                return Chip;
            }(Container));
            therace.Chip = Chip;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
/**
 * Created by gio on 6/5/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var Container = PIXI.Container;
            var Graphics = PIXI.Graphics;
            var Text = PIXI.Text;
            var Sprite = PIXI.Sprite;
            var BetSystemView = (function (_super) {
                __extends(BetSystemView, _super);
                function BetSystemView() {
                    _super.call(this);
                    this.CHIP_VALUES = [10, 50, 100];
                    this._chipSelectors = [];
                    this._placedChips = [];
                    this.onChipClick = this.onChipClick.bind(this);
                    this.onPlaceChip = this.onPlaceChip.bind(this);
                    this.init();
                }
                BetSystemView.prototype.init = function () {
                    // Bet system background
                    var betSystemBg = new Sprite(PIXI.utils.TextureCache["assets/images/betSystemBg.png"]);
                    betSystemBg.anchor.set(.5, 1);
                    betSystemBg.position.set(therace.Launcher.GAME_WIDTH * .5, therace.Launcher.GAME_HEIGHT - 60);
                    this.addChild(betSystemBg);
                    // Place bet background
                    this._placeBetBg = new Sprite(PIXI.utils.TextureCache["assets/images/placeBetBg.png"]);
                    this._placeBetBg.anchor.set(.5, .5);
                    this._placeBetBg.position.set(betSystemBg.x, betSystemBg.y - betSystemBg.height + this._placeBetBg.height * .5 + 10);
                    this._placeBetBg.interactive = true;
                    this._placeBetBg.on("click", this.onPlaceChip);
                    this.addChild(this._placeBetBg);
                    // Add chip selectors
                    var MARGIN = 5, CHIP_COUNT = this.CHIP_VALUES.length;
                    var chip, startX = (therace.Launcher.GAME_WIDTH - CHIP_COUNT * (therace.Chip.CHIP_WIDTH + MARGIN)) * .5;
                    for (var i = 0; i < CHIP_COUNT; i++) {
                        // Create chip selector
                        chip = new therace.Chip(this.CHIP_VALUES[i], i);
                        // Set position
                        chip.position.set(startX + i * (therace.Chip.CHIP_WIDTH + MARGIN), betSystemBg.position.y - chip.height - 8);
                        // Add listener
                        chip.on("click", this.onChipClick);
                        // Save to list and add to display list
                        this._chipSelectors.push(chip);
                        this.addChild(chip);
                    }
                    // Select default chip
                    this.selectChip(this._chipSelectors[0]);
                    // Status bar background
                    var statusBg = new Graphics();
                    statusBg
                        .beginFill(0x0, .7)
                        .drawRect(0, 0, therace.Launcher.GAME_WIDTH, 40)
                        .endFill();
                    statusBg.position.set(0, therace.Launcher.GAME_HEIGHT - statusBg.height);
                    this.addChild(statusBg);
                    // Balance text
                    this._balanceText = new Text("Balance: " + therace.Helper.formatMoney(0), { font: '20px Arial', fill: 0xEEEEEE, align: 'left' });
                    this._balanceText.position.set(10, (statusBg.height - this._balanceText.height) * .5 + statusBg.y);
                    this.addChild(this._balanceText);
                };
                BetSystemView.prototype.selectChip = function (chip) {
                    for (var i = 0, l = this._chipSelectors.length; i < l; i++)
                        this._chipSelectors[i].selected = false;
                    chip.selected = true;
                    this._selectedChip = chip;
                };
                BetSystemView.prototype.onPlaceChip = function (e) {
                    this.emit("addBet", this._selectedChip.value);
                };
                BetSystemView.prototype.onChipClick = function (e) {
                    this.selectChip(e.target);
                };
                BetSystemView.prototype.update = function (observable) {
                };
                BetSystemView.prototype.update_balance = function (model) {
                    this._balanceText.text = "Balance: " + therace.Helper.formatMoney(model.balance);
                };
                BetSystemView.prototype.update_bet = function (model) {
                    // Clear old chips
                    while (this._placedChips.length > 0)
                        this.removeChild(this._placedChips.pop());
                    var chipIndex = this.CHIP_VALUES.length - 1, amount = 0;
                    while (amount < model.bet) {
                        if (amount + this.CHIP_VALUES[chipIndex] <= model.bet) {
                            // Increase the amount
                            amount += this.CHIP_VALUES[chipIndex];
                            // Create side view chip to add
                            var chip = new Sprite(PIXI.utils.TextureCache["chips_side_0" + (chipIndex + 1) + ".png"]);
                            // Set scale, position and anchor
                            chip.width = therace.Chip.CHIP_WIDTH;
                            chip.scale.y = chip.scale.x;
                            chip.anchor.set(0.5, 0);
                            chip.position.set(therace.Launcher.GAME_WIDTH * .5, this._placeBetBg.y - this._placedChips.length * chip.height * .2);
                            // Push to _placedChips list
                            this._placedChips.push(chip);
                            // Add to display list
                            this.addChild(chip);
                        }
                        else {
                            chipIndex--;
                            if (chipIndex < 0) {
                                console.warn("Can't display bet visually using existing chips:", model.bet);
                                break;
                            }
                        }
                    }
                };
                return BetSystemView;
            }(Container));
            therace.BetSystemView = BetSystemView;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
/**
 * Created by gio on 6/5/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var BetSystemModel = (function (_super) {
                __extends(BetSystemModel, _super);
                function BetSystemModel() {
                    _super.call(this);
                    this._balance = 0;
                    this._bet = 0;
                }
                BetSystemModel.prototype.addBet = function (value) {
                    if (this._balance < value) {
                        console.warn("Not enough balance");
                        return;
                    }
                    this._balance -= value;
                    this._bet += value;
                    this.updateObservers("balance");
                    this.updateObservers("bet");
                };
                Object.defineProperty(BetSystemModel.prototype, "balance", {
                    get: function () { return this._balance; },
                    set: function (value) {
                        this._balance = value;
                        this.updateObservers("balance");
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetSystemModel.prototype, "bet", {
                    get: function () { return this._bet; },
                    enumerable: true,
                    configurable: true
                });
                return BetSystemModel;
            }(therace.AObservable));
            therace.BetSystemModel = BetSystemModel;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
/**
 * Created by gio on 6/5/16.
 */
var com;
(function (com) {
    var gionadirashvili;
    (function (gionadirashvili) {
        var therace;
        (function (therace) {
            var BetSystem = (function () {
                function BetSystem() {
                    // Init model and view
                    this._model = new therace.BetSystemModel();
                    this._view = new therace.BetSystemView();
                    // Add view as an observer to the model
                    this._model.attachObserver(this._view);
                    // Add listener to the view
                    this.onAddBet = this.onAddBet.bind(this);
                    this._view.on("addBet", this.onAddBet);
                    // Initially get the balance
                    this.getBalance();
                }
                BetSystem.prototype.onAddBet = function (value) {
                    this._model.addBet(value);
                };
                BetSystem.prototype.getBalance = function () {
                    this._model.balance = 200;
                };
                Object.defineProperty(BetSystem.prototype, "view", {
                    get: function () { return this._view; },
                    enumerable: true,
                    configurable: true
                });
                return BetSystem;
            }());
            therace.BetSystem = BetSystem;
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
            var MovieClip = PIXI.extras.MovieClip;
            var Container = PIXI.Container;
            var Rectangle = PIXI.Rectangle;
            var Turtle = (function (_super) {
                __extends(Turtle, _super);
                function Turtle(_index) {
                    _super.call(this);
                    this._index = _index;
                    this.TEXTURE_ID_TEMPLATE = "assets/images/turtles/turtle$.png";
                    this.init();
                }
                Turtle.prototype.init = function () {
                    // Create different animations for turtle
                    this._idle = this.createMovieClip(0, 10);
                    this._move = this.createMovieClip(11, 18);
                    // Set speed
                    this._idle.animationSpeed = 0.15;
                    this._move.animationSpeed = 0.15;
                    // Set pivots to center
                    this._idle.anchor.set(0.5, 0.5);
                    this._move.anchor.set(0.5, 0.5);
                    // Flip the graphics
                    this._idle.scale.x = -1;
                    this._move.scale.x = -1;
                    // Add default state animation to display list
                    this._idle.gotoAndPlay(Math.random() * 10);
                    this.addChild(this._idle);
                };
                Turtle.prototype.createMovieClip = function (startFrame, endFrame) {
                    // Get texture id. Textures don't use 0 based enumeration, hence +1
                    var textureId = this.TEXTURE_ID_TEMPLATE.replace('$', (this._index + 1).toString());
                    var i, tex, frames = [], rect = new Rectangle(0, 0, 96, 66);
                    // Create frames for the MovieClip
                    for (i = startFrame; i <= endFrame; i++) {
                        // Get texture from the texture cache
                        tex = PIXI.utils.TextureCache[textureId].clone();
                        // Only 10 sprites on a row
                        rect.x = 96 * (i % 10);
                        rect.y = 66 * Math.floor(i / 10);
                        // Mask the texture
                        tex.frame = rect;
                        frames.push(tex);
                    }
                    // Create and return MovieClip
                    return new MovieClip(frames);
                };
                return Turtle;
            }(Container));
            therace.Turtle = Turtle;
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
            var Sprite = PIXI.Sprite;
            var RaceView = (function (_super) {
                __extends(RaceView, _super);
                function RaceView(_renderer) {
                    _super.call(this);
                    this._renderer = _renderer;
                    // Used to optimize draw calls and manually control whether or not should the renderer redraw the stage
                    this._isDirty = true;
                    this._turtles = [];
                    this.init();
                    // Bind render method to this
                    this.render = this.render.bind(this);
                    // Start rendering loop
                    this.render();
                }
                RaceView.prototype.init = function () {
                    this.addChild(new Sprite(PIXI.utils.TextureCache["assets/images/bg.png"]));
                };
                RaceView.prototype.clearState = function () {
                    //TODO clear state
                };
                RaceView.prototype.newGame = function (turtleCount) {
                    // Clear old state before starting new game
                    this.clearState();
                    // Add turtles to the scene
                    var turtle;
                    for (var i = 0; i < turtleCount; i++) {
                        turtle = new therace.Turtle(i);
                        turtle.position.set(40, i * 60 + 120);
                        this._turtles.push(turtle);
                        this.addChild(turtle);
                    }
                };
                RaceView.prototype.update = function (observable) {
                    // Cast observable to RaceModel class for code hinting and since we know no other observable will come in here
                    var model = observable;
                    // Mark stage as dirty
                    this._isDirty = true;
                    if (this._turtles.length != model.turtleCount)
                        this.newGame(model.turtleCount);
                };
                RaceView.prototype.updateTurtle = function (turtle) {
                    //TODO update turtle visuals
                };
                RaceView.prototype.render = function () {
                    requestAnimationFrame(this.render);
                    for (var i = 0, l = this._turtles.length; i < l; i++)
                        this.updateTurtle(this._turtles[i]);
                    if (this._isDirty)
                        this._renderer.render(this);
                };
                return RaceView;
            }(Container));
            therace.RaceView = RaceView;
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
            var RaceModel = (function (_super) {
                __extends(RaceModel, _super);
                function RaceModel() {
                    _super.call(this);
                    this.turtleCount = 3;
                    this._observable = new therace.AObservable();
                }
                return RaceModel;
            }(therace.AObservable));
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
            var RaceController = (function () {
                function RaceController(stage, renderer) {
                    // Init view and add to stage
                    this._view = new therace.RaceView(renderer);
                    stage.addChild(this._view);
                    // Init model
                    this._model = new therace.RaceModel();
                    // Set view as model's observer
                    this._model.attachObserver(this._view, true);
                    // Create and add bet system to display list
                    this._betSystem = new therace.BetSystem();
                    this._view.addChild(this._betSystem.view);
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
            var Container = PIXI.Container;
            var Graphics = PIXI.Graphics;
            var Launcher = (function () {
                function Launcher() {
                    // Setup stage and renderer
                    this._stage = new Container();
                    this._stage.interactive = true;
                    this._renderer = PIXI.autoDetectRenderer(Launcher.GAME_WIDTH, Launcher.GAME_HEIGHT, {
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
                        "assets/images/turtles/turtle1.png",
                        "assets/images/turtles/turtle2.png",
                        "assets/images/turtles/turtle3.png",
                        "assets/images/bg.png",
                        "assets/images/betSystemBg.png",
                        "assets/images/placeBetBg.png",
                        "assets/images/placeBetBtn.png",
                        "assets/images/chips/chips.json"
                    ])
                        .load(this.onLoadComplete.bind(this))
                        .on("progress", this.onLoadProgress.bind(this));
                }
                Launcher.prototype.initProgressBar = function () {
                    // Instantiate
                    this._progressBar = new Graphics();
                    // Initially draw empty progress bar
                    this.drawProgressBar(0x333333, Launcher.GAME_WIDTH * .5);
                    // Add to display list
                    this._stage.addChild(this._progressBar);
                    // Render the stage
                    this._renderer.render(this._stage);
                };
                Launcher.prototype.drawProgressBar = function (color, width) {
                    // Draw
                    this._progressBar
                        .beginFill(color)
                        .drawRect(Launcher.GAME_WIDTH * .25, Launcher.GAME_HEIGHT * .5 - 2, width, 4).endFill();
                };
                Launcher.prototype.onLoadProgress = function () {
                    // Fill the progress bar
                    this.drawProgressBar(0xCCCCCC, Launcher.GAME_WIDTH * .5 * PIXI.loader.progress * 0.01);
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
                Launcher.GAME_WIDTH = 800;
                Launcher.GAME_HEIGHT = 600;
                return Launcher;
            }());
            therace.Launcher = Launcher;
        })(therace = gionadirashvili.therace || (gionadirashvili.therace = {}));
    })(gionadirashvili = com.gionadirashvili || (com.gionadirashvili = {}));
})(com || (com = {}));
//# sourceMappingURL=race.js.map