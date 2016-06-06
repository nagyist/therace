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
                Helper.tint = function (list, tint, recursive) {
                    if (recursive === void 0) { recursive = true; }
                    var obj;
                    for (var i = 0, l = list.length; i < l; i++) {
                        obj = list[i];
                        if (obj.hasOwnProperty("children") && obj["children"] && obj["children"].length > 0)
                            Helper.tint(obj["children"], tint);
                        else if (obj.hasOwnProperty("tint"))
                            obj["tint"] = tint;
                    }
                };
                return Helper;
            }());
            therace.Helper = Helper;
            (function (DayColors) {
                DayColors[DayColors["Morning"] = 4294967295] = "Morning";
                DayColors[DayColors["Noon"] = 4293514108] = "Noon";
                DayColors[DayColors["Evening"] = 4293569877] = "Evening";
                DayColors[DayColors["Night"] = 5854161] = "Night";
            })(therace.DayColors || (therace.DayColors = {}));
            var DayColors = therace.DayColors;
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
            var Button = (function (_super) {
                __extends(Button, _super);
                function Button(texture) {
                    if (texture === void 0) { texture = null; }
                    _super.call(this, texture);
                    this.interactive = true;
                    this.buttonMode = true;
                    // Mouse over and mouse up should behave the same, hence same event listeners
                    this.on("mouseover", this.onMouseOver.bind(this));
                    this.on("mouseup", this.onMouseOver.bind(this));
                    this.on("mouseout", this.onMouseOut.bind(this));
                    this.on("mousedown", this.onMouseDown.bind(this));
                    // Inactive tint
                    this.tint = 0x00CCCCCC;
                }
                Button.prototype.onMouseOver = function (e) {
                    this.tint = 0xFFFFFFFF;
                };
                Button.prototype.onMouseOut = function (e) {
                    this.tint = 0x00CCCCCC;
                };
                Button.prototype.onMouseDown = function (e) {
                    this.tint = 0x00666666;
                };
                return Button;
            }(Sprite));
            therace.Button = Button;
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
                    this.buttonMode = true;
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
                    this._currentBetAmount = 0;
                    this.onChipClick = this.onChipClick.bind(this);
                    this.onPlaceChip = this.onPlaceChip.bind(this);
                    this.onPlaceBet = this.onPlaceBet.bind(this);
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
                    this._placeBetBg.buttonMode = true;
                    this._placeBetBg.on("click", this.onPlaceChip);
                    this.addChild(this._placeBetBg);
                    // Place bet button
                    this._placeBetBtn = new therace.Button(PIXI.utils.TextureCache["assets/images/placeBetBtn.png"]);
                    this._placeBetBtn.anchor.set(.5, .5);
                    this._placeBetBtn.position.set(this._placeBetBg.position.x + this._placeBetBtn.width + 40, this._placeBetBg.position.y);
                    this._placeBetBtn.on("click", this.onPlaceBet);
                    this._placeBetBtn.visible = false;
                    this.addChild(this._placeBetBtn);
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
                    // Bet text
                    this._betText = new Text("Bet: " + therace.Helper.formatMoney(0), { font: '20px Arial', fill: 0xEEEEEE, align: 'right' });
                    this._betText.anchor.set(1, 0);
                    this._betText.position.set(therace.Launcher.GAME_WIDTH - 10, (statusBg.height - this._betText.height) * .5 + statusBg.y);
                    this.addChild(this._betText);
                    // Init sounds
                    this._chipAddSound = new Howl({
                        urls: ["assets/sounds/chip.mp3", "assets/sounds/chip.ogg"]
                    });
                    this._chipAddSound.load();
                };
                BetSystemView.prototype.selectChip = function (chip) {
                    for (var i = 0, l = this._chipSelectors.length; i < l; i++)
                        this._chipSelectors[i].selected = false;
                    chip.selected = true;
                    this._selectedChip = chip;
                };
                BetSystemView.prototype.onPlaceChip = function (e) {
                    this.emit("addBet", this._selectedChip.value);
                    this._chipAddSound.play();
                };
                BetSystemView.prototype.onPlaceBet = function (e) {
                    if (this._currentBetAmount != 0) {
                        this.emit("placeBet", this._currentBetAmount);
                        this._placeBetBtn.visible = false;
                    }
                };
                BetSystemView.prototype.onChipClick = function (e) {
                    this.selectChip(e.target);
                    this._chipAddSound.play();
                };
                BetSystemView.prototype.update = function (observable) {
                };
                BetSystemView.prototype.update_balance = function (model) {
                    this._balanceText.text = "Balance: " + therace.Helper.formatMoney(model.balance);
                };
                BetSystemView.prototype.update_bet = function (model) {
                    // Store current bet amount to then emit an event when player places a bet
                    this._currentBetAmount = model.bet;
                    // Update text box
                    this._betText.text = "Bet: " + therace.Helper.formatMoney(model.bet);
                    // Update button state
                    this._placeBetBtn.visible = model.bet > 0;
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
                            // Step one chip value lower
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
                Object.defineProperty(BetSystemModel.prototype, "win", {
                    set: function (value) {
                        this._balance += value;
                        this._bet = 0;
                        this.updateObservers("balance");
                        this.updateObservers("bet");
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
                    this._view.on("addBet", this.onAddBet.bind(this));
                    // Initially get the balance
                    this.getBalance();
                }
                BetSystem.prototype.onAddBet = function (value) {
                    this._model.addBet(value);
                };
                BetSystem.prototype.getBalance = function () {
                    this._model.balance = 500;
                };
                Object.defineProperty(BetSystem.prototype, "win", {
                    set: function (value) {
                        this._model.win = value;
                    },
                    enumerable: true,
                    configurable: true
                });
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
            var Sprite = PIXI.Sprite;
            var MovieClip = PIXI.extras.MovieClip;
            var Container = PIXI.Container;
            var Rectangle = PIXI.Rectangle;
            var Turtle = (function (_super) {
                __extends(Turtle, _super);
                function Turtle(_index) {
                    _super.call(this);
                    this._index = _index;
                    this.TEXTURE_ID_TEMPLATE = "assets/images/turtles/turtle$.png";
                    this._speed = 1;
                    this.init();
                }
                Turtle.prototype.init = function () {
                    // Make interactive
                    this.interactive = true;
                    this.buttonMode = true;
                    // Create different animations for turtle
                    this._idle = this.createMovieClip(0, 10);
                    this._move = this.createMovieClip(11, 17);
                    // Set speed
                    this._idle.animationSpeed = 0.15;
                    this._move.animationSpeed = 0.02;
                    // Set pivots to center
                    this._idle.anchor.set(0.5, 0.5);
                    this._move.anchor.set(0.5, 0.5);
                    // Flip the graphics
                    this._idle.scale.x = -1;
                    this._move.scale.x = -1;
                    // Add default state animation to display list
                    this._idle.gotoAndPlay(Math.random() * 10);
                    this.addChild(this._idle);
                    // Tint inactive
                    this._idle.tint = 0x00666666;
                };
                Turtle.prototype.createMovieClip = function (startFrame, endFrame) {
                    // Get texture id. Textures don't use 0 based enumeration, hence +1
                    var textureId = this.TEXTURE_ID_TEMPLATE.replace('$', (this._index + 1).toString());
                    var i, tex, frames = [], rect = new Rectangle(0, 0, 96, 66);
                    // Create frames for the MovieClip
                    for (i = startFrame; i <= endFrame; i++) {
                        // Get texture from the texture cache - I know cloning is NOT the way to go here, but it was a quick solution
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
                Turtle.prototype.stopMovement = function (isWinner) {
                    this._move.stop();
                    this.removeChild(this._move);
                    if (isWinner) {
                        this.addChild(this._idle);
                        this._idle.gotoAndPlay(Math.random() * 10);
                    }
                    else {
                        var tex = PIXI.utils.TextureCache[this.TEXTURE_ID_TEMPLATE.replace('$', (this._index + 1).toString())];
                        tex.frame = new Rectangle(96 * 8, 66, 96, 66);
                        // Create sleep sprite
                        this._sleep = new Sprite(tex);
                        // Set anchor
                        this._sleep.anchor.set(0.5, 0.5);
                        // Flip the graphics
                        this._sleep.scale.x = -1;
                        // Add to display list
                        this.addChild(this._sleep);
                        therace.Helper.tint(this.children, 0x005953D1);
                    }
                };
                Turtle.prototype.updateMovement = function (isWinning) {
                    if (this._idle.parent) {
                        this._idle.stop();
                        this.removeChild(this._idle);
                        this.addChild(this._move);
                    }
                    this._move.animationSpeed = isWinning ? 0.04 : 0.02;
                    this._speed = isWinning ? 5 : 3;
                    this._move.gotoAndPlay(Math.random() * 7);
                };
                Object.defineProperty(Turtle.prototype, "speed", {
                    get: function () { return this._speed; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Turtle.prototype, "index", {
                    get: function () { return this._index; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Turtle.prototype, "selected", {
                    get: function () { return this._selected; },
                    set: function (value) {
                        this._selected = value;
                        this._idle.tint = value ? 0xFFFFFFFF : 0x00666666;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Turtle;
            }(Container));
            therace.Turtle = Turtle;
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
            var Container = PIXI.Container;
            var Graphics = PIXI.Graphics;
            var Text = PIXI.Text;
            var NaratorSlide = (function () {
                function NaratorSlide(text, showTime, backgroundColor) {
                    if (backgroundColor === void 0) { backgroundColor = 0x0; }
                    this.text = text;
                    this.showTime = showTime;
                    this.backgroundColor = backgroundColor;
                }
                return NaratorSlide;
            }());
            therace.NaratorSlide = NaratorSlide;
            var Narator = (function (_super) {
                __extends(Narator, _super);
                function Narator(_slides, _width, _height) {
                    _super.call(this);
                    this._slides = _slides;
                    this._width = _width;
                    this._height = _height;
                    this._index = -1;
                    // Bind methods
                    this.hideSlide = this.hideSlide.bind(this);
                    // Add background graphics and text
                    this._bg = new Graphics();
                    this._txt = new Text("", { font: '24px Arial', fill: 0xEEEEEE, align: 'center' });
                    this._txt.anchor.set(.5, .5);
                    this._txt.position.set(_width * .5, _height * .5);
                }
                Narator.prototype.nextSlide = function () {
                    this._index++;
                    if (this._index >= this._slides.length)
                        return;
                    this.showSlide(this._slides[this._index]);
                };
                Narator.prototype.showSlide = function (slide) {
                    this._bg
                        .beginFill(slide.backgroundColor)
                        .drawRect(0, 0, this._width, this._height)
                        .endFill();
                    this.addChild(this._bg);
                    this._txt.text = slide.text;
                    this.addChild(this._txt);
                    setTimeout(this.hideSlide, slide.showTime);
                };
                Narator.prototype.hideSlide = function () {
                    this.removeChild(this._txt);
                    this.removeChild(this._bg);
                };
                Object.defineProperty(Narator.prototype, "slideCount", {
                    get: function () { return this._slides.length; },
                    enumerable: true,
                    configurable: true
                });
                return Narator;
            }(Container));
            therace.Narator = Narator;
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
                    this._turtles = [];
                    this._phaseIndex = 0;
                    this._winnerIndex = 0;
                    this._state = this.idleState;
                    this.init();
                    // Bind methods to this
                    this.render = this.render.bind(this);
                    this.nextPhase = this.nextPhase.bind(this);
                    this.showRaceStatus = this.showRaceStatus.bind(this);
                    this.onTurtleClick = this.onTurtleClick.bind(this);
                    // Start rendering loop
                    this.render();
                }
                RaceView.prototype.init = function () {
                    // Add background
                    this.addChild(new Sprite(PIXI.utils.TextureCache["assets/images/bg.png"]));
                    // Create narator
                    this._narator = new therace.Narator([
                        new therace.NaratorSlide("1 hour later...", 2000),
                        new therace.NaratorSlide("5 hours later...", 2000),
                        new therace.NaratorSlide("Eventually...", 2000)
                    ], therace.Launcher.GAME_WIDTH, therace.Launcher.GAME_HEIGHT);
                    // Add selection arrow
                    this._selectionArrow = new Sprite(PIXI.utils.TextureCache["assets/images/selectionArrow.png"]);
                    this.addChild(this._selectionArrow);
                    // Init sounds
                    this._turtleSelectSound = new Howl({
                        urls: ["assets/sounds/turtle_select.mp3", "assets/sounds/turtle_select.ogg"]
                    });
                    this._turtleSelectSound.load();
                    this._raceMusic = new Howl({
                        urls: ["assets/sounds/race_music.mp3", "assets/sounds/race_music.ogg"],
                        loop: true
                    });
                    this._raceMusic.load();
                };
                RaceView.prototype.reset = function () {
                    //TODO clear state
                };
                RaceView.prototype.newGame = function (turtleCount) {
                    // Clear old state before starting new game
                    this.reset();
                    if (turtleCount == 0)
                        return;
                    // Add turtles to the scene
                    var turtle;
                    for (var i = 0; i < turtleCount; i++) {
                        turtle = new therace.Turtle(i);
                        turtle.position.set(40, i * 60 + 120);
                        turtle.on("click", this.onTurtleClick);
                        this._turtles.push(turtle);
                        this.addChild(turtle);
                    }
                    this.selectTurtle(this._turtles[0]);
                };
                RaceView.prototype.onTurtleClick = function (e) {
                    this.selectTurtle(e.target);
                    this._turtleSelectSound.play();
                };
                RaceView.prototype.update = function (observable) {
                    // Cast observable to RaceModel class for code hinting and since we know no other observable will come in here
                    var model = observable;
                    if (this._turtles.length != model.turtleCount)
                        this.newGame(model.turtleCount);
                };
                RaceView.prototype.startRace = function (winnerIndex) {
                    // Change state
                    this._state = this.raceState;
                    // Store winner index
                    this._winnerIndex = winnerIndex;
                    // Hide selection arrow
                    this._selectionArrow.visible = false;
                    var turtle;
                    for (var i = 0, l = this._turtles.length; i < l; i++) {
                        turtle = this._turtles[i];
                        // Deselect all turtles/clear all tints
                        turtle.selected = false;
                        // Update turtles to use move animation
                        turtle.updateMovement(Math.random() * 10 < 5);
                    }
                    this._raceMusic.play();
                };
                RaceView.prototype.nextPhase = function () {
                    // Show narator slide
                    this.addChild(this._narator);
                    this._narator.nextSlide();
                    // Increase phase index
                    this._phaseIndex++;
                    // Move turtles according to their state and whether or not did they win
                    var moveAmount = 400 / this._narator.slideCount;
                    for (var i = 0, l = this._turtles.length; i < l; i++) {
                        if (this._phaseIndex == this._narator.slideCount) {
                            if (this._winnerIndex == i)
                                this._turtles[i].x = 720;
                            else
                                this._turtles[i].x = 710 - Math.random() * 35 - 30;
                        }
                        else {
                            this._turtles[i].position.x += moveAmount + Math.random() * 40 - 20;
                        }
                    }
                };
                RaceView.prototype.finishRace = function () {
                    this._state = null;
                    for (var i = 0, l = this._turtles.length; i < l; i++)
                        this._turtles[i].stopMovement(this._winnerIndex == i);
                };
                RaceView.prototype.showRaceStatus = function (winAmount) {
                    var message = winAmount > 0 ?
                        "Congratulations! You have won " + therace.Helper.formatMoney(winAmount) + "!" :
                        "Sorry, you've lost!";
                    // Show message
                    this._narator.showSlide(new therace.NaratorSlide("Race Finished!\n" + message, 10000));
                    // Stop race music
                    this._raceMusic.stop();
                    // Reset state
                    this.reset();
                };
                RaceView.prototype.selectTurtle = function (turtle) {
                    // Deselect all
                    for (var i = 0, l = this._turtles.length; i < l; i++)
                        this._turtles[i].selected = false;
                    // Select clicked turtle
                    turtle.selected = true;
                    this._selectedTurtle = turtle;
                    // Move selection arrow to selected turtle
                    this.addChild(this._selectionArrow);
                    this._selectionArrow.position.set(turtle.position.x - 20, turtle.position.y - 50);
                };
                RaceView.prototype.idleState = function () {
                    this.updateSelectionArrow();
                };
                RaceView.prototype.raceState = function () {
                    for (var i = 0, l = this._turtles.length; i < l; i++)
                        this.updateTurtle(this._turtles[i]);
                };
                RaceView.prototype.updateTurtle = function (turtle) {
                    // Update x position
                    turtle.position.x += turtle.speed * PIXI.ticker.shared.deltaTime * 0.01;
                };
                RaceView.prototype.updateSelectionArrow = function () {
                    if (this._selectedTurtle)
                        this._selectionArrow.position.y = this._selectedTurtle.position.y - 50 + Math.sin(PIXI.ticker.shared.lastTime * 0.01) * 2;
                };
                RaceView.prototype.render = function () {
                    requestAnimationFrame(this.render);
                    if (this._state)
                        this._state();
                    this._renderer.render(this);
                };
                Object.defineProperty(RaceView.prototype, "selectedTurtleIndex", {
                    get: function () { return this._selectedTurtle.index; },
                    enumerable: true,
                    configurable: true
                });
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
                }
                RaceModel.prototype.receiveBet = function (turtleIndex, betAmount) {
                    // Playing pretty fair here ;)
                    // Generate winning turtle index
                    this._winningTurtleIndex = Math.floor((Math.random() * 100) / (100 / this.turtleCount));
                    // Store player bet amount and turtle index
                    this._playerTurtleIndex = turtleIndex;
                    this._betAmount = betAmount;
                };
                Object.defineProperty(RaceModel.prototype, "winAmount", {
                    get: function () {
                        return this._winningTurtleIndex == this._playerTurtleIndex ? this._betAmount * 3 : 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RaceModel.prototype, "winnerIndex", {
                    get: function () { return this._winningTurtleIndex; },
                    enumerable: true,
                    configurable: true
                });
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
                    this._betSystem.view.on("placeBet", this.onPlaceBet.bind(this));
                    this._view.addChild(this._betSystem.view);
                    // Bind methods
                    this.changeDateTime = this.changeDateTime.bind(this);
                    this.finishRace = this.finishRace.bind(this);
                    this.showRaceStatus = this.showRaceStatus.bind(this);
                }
                RaceController.prototype.onPlaceBet = function (value) {
                    // Lock the UI to prevent clicks
                    this.lockUI(true);
                    // Place bet in model
                    this._model.receiveBet(this._view.selectedTurtleIndex, value);
                    // Start race
                    this._view.startRace(this._model.winnerIndex);
                    // Schedule phases
                    setTimeout(this.changeDateTime, 5000, therace.DayColors.Noon);
                    setTimeout(this._view.nextPhase, 5000);
                    setTimeout(this.changeDateTime, 10000, therace.DayColors.Evening);
                    setTimeout(this._view.nextPhase, 10000);
                    setTimeout(this.changeDateTime, 15000, therace.DayColors.Night);
                    setTimeout(this._view.nextPhase, 15000);
                    setTimeout(this.finishRace, 16000);
                };
                RaceController.prototype.finishRace = function () {
                    // Update balance
                    this._betSystem.win = this._model.winAmount;
                    this._view.finishRace();
                    setTimeout(this.showRaceStatus, 4000);
                };
                RaceController.prototype.showRaceStatus = function () {
                    this._view.showRaceStatus(this._model.winAmount);
                    this.lockUI(false);
                };
                RaceController.prototype.changeDateTime = function (tint) {
                    therace.Helper.tint(this._view.children, tint);
                    therace.Helper.tint(this._betSystem.view.children, tint);
                };
                RaceController.prototype.lockUI = function (value) {
                    this._view.interactiveChildren = !value;
                    this._betSystem.view.interactiveChildren = !value;
                };
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
                    document.getElementById("game-wrapper").appendChild(this._renderer.view);
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
                        "assets/images/selectionArrow.png",
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
                    console.log("Assets loaded");
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