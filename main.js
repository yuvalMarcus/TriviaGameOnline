
(function () {

    var helperController = (function () {

        return {
            nodeListForEach: function (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            }
        }

    })();

    var UIController = (function (helperCtrl) {

        var DOMstrings = {
            gameActiveData: '.game-active-data',
            gameLevels: '.game-levels',
            gameLevel: '.game-level',
            lettersGuessInTheWord: '.letters-to-guess-in-the-word',
            amountActiveWordsFound: '.amount-active-words-found',
            gameBoard: '.game-board',
            startGameBtn: '.start-game',
            changeLevelBtn: '.change-level',
            newWordBtn: '.new-word',
            guessWordBtn: '.guess-word',
            stopGameBtn: '.stop-game',
            gameWordCategory: '.game-word-category',
            wordCategory: '.word-category',
            gameNotification: '.game-notification',
            gameNotificationContent: '.game-notification .content',
            gameControl: '.game-control',
            gameFinishedData: '.game-finished-data',
            finishedTime: '.finished-time',
            amountFinishedWordsFound: '.amount-finished-words-found',
            keyboardLetters: '.keyboard .letter'
        }

        return {

            setGameLevels: function (levels) {
                var html;

                for (var i = 0; i < levels.length; i++) {

                    html += '<option value="' + levels[i].name + '">' + levels[i].name + '</option>';
                }

                document.querySelector(DOMstrings.gameLevels).innerHTML = html;
            },

            setGameLevel: function (level) {

                document.querySelector(DOMstrings.gameLevel).innerHTML = level.name;
            },

            setContentInGameBoard: function (html) {

                document.querySelector(DOMstrings.gameBoard).innerHTML = html;
            },

            showGameBoard: function () {

                document.querySelector(DOMstrings.gameBoard).style.display = 'block';
            },

            hiddenGameBoard: function () {

                document.querySelector(DOMstrings.gameBoard).style.display = 'none';
            },

            showStartGameBtn: function () {

                document.querySelector(DOMstrings.startGameBtn).style.display = 'inline';
            },

            hiddenStartGameBtn: function () {

                document.querySelector(DOMstrings.startGameBtn).style.display = 'none';
            },

            showChangeLevelBtn: function () {

                document.querySelector(DOMstrings.changeLevelBtn).style.display = 'inline';
            },

            hiddenChangeLevelBtn: function () {

                document.querySelector(DOMstrings.changeLevelBtn).style.display = 'none';
            },

            showWordCategory: function () {

                document.querySelector(DOMstrings.gameWordCategory).style.display = 'block';
            },

            hiddenWordCategory: function () {

                document.querySelector(DOMstrings.gameWordCategory).style.display = 'none';
            },

            setWordCategory: function (category) {

                document.querySelector(DOMstrings.wordCategory).textContent = category;
            },


            setGameNotification: function (message, type) {
                var elm, className;

                document.querySelector(DOMstrings.gameNotification).style.display = 'block';

                elm = document.querySelector(DOMstrings.gameNotificationContent);

                elm.textContent = message;

                if(type === 'success') {

                    className = 'success';

                } else if(type === 'failed') {

                    className = 'failed';

                } else {

                    className = 'default';

                }

                elm.classList.remove('success');
                elm.classList.remove('failed');
                elm.classList.remove('default');

                elm.classList.add(className);
                elm.classList.add('show');

                setTimeout(function () {

                    elm.classList.remove('show');
                    document.querySelector(DOMstrings.gameNotification).style.display = 'none';

                }, 2000);

            },

            showGameActiveData: function () {

                document.querySelector(DOMstrings.gameActiveData).style.display = 'block';
            },

            hiddenGameActiveData: function () {

                document.querySelector(DOMstrings.gameActiveData).style.display = 'none';
            },

            showGameControl: function () {

                document.querySelector(DOMstrings.gameControl).style.display = 'block';
            },

            hiddenGameControl: function () {

                document.querySelector(DOMstrings.gameControl).style.display = 'none';
            },

            setAmountLettersToGuess: function (letters) {

                document.querySelector(DOMstrings.lettersGuessInTheWord).textContent = letters;
            },

            setAmountFinishedWordsFound: function (amount) {

                document.querySelector(DOMstrings.amountFinishedWordsFound).textContent = amount;
            },

            setAmountActiveWordsFound: function (wordsFound) {

                document.querySelector(DOMstrings.amountActiveWordsFound).textContent = wordsFound;
            },

            showWord: function (word) {
                var html, letter, wordString, wordDisplayLetters;

                wordString = word.getWord();
                wordDisplayLetters = word.getDisplayLetters();

                html = '<div class="word">';

                for (var i = 0; i < wordString.length; i++) {

                    if(wordDisplayLetters[i]) {
                        letter = wordString[i];
                    } else  {
                        letter = '_';
                    }

                    html += '<span class="letter">' + letter + '</span>';
                }

                html += '</div>';

                this.setContentInGameBoard(html);
            },

            showGameFinishedData: function () {

                document.querySelector(DOMstrings.gameFinishedData).style.display = 'block';
            },

            hiddenGameFinishedData: function () {

                document.querySelector(DOMstrings.gameFinishedData).style.display = 'none';
            },

            setFinishTime: function (time) {

                document.querySelector(DOMstrings.finishedTime).innerHTML = time;
            },

            getLevelFromDOM: function () {

                return document.querySelector(DOMstrings.gameLevels).value;
            },

            getWordFromDOM: function () {

                return document.querySelector('#input-word-value').value;
            },

            getDOMstrings: function () {
                return DOMstrings;
            }
        }

    })(helperController);

    var coreController = (function () {

        var Level = function (name, maxDisplayInitialLetters, maxQuantityQuessingLetters) {

            this.name = name;
            this.level = 'level ' + ( data.levels.length + 1 );
            this.maxDisplayInitialLetters = maxDisplayInitialLetters;
            this.maxQuantityQuessingLetters = maxQuantityQuessingLetters;
            this.index = data.levels.length;
        };

        Level.prototype.getName = function () {

            return this.name;
        };

        Level.prototype.getMaxDisplayInitialLetters = function () {

            return this.maxDisplayInitialLetters;
        };

        Level.prototype.getMaxQuantityQuessingLetters = function () {

            return this.maxQuantityQuessingLetters;
        },

            Level.prototype.getIndex = function () {

                return this.index;
            };

        var Word = function (word, maxQuantityQuessingLetters, category) {

            this.word = word;
            this.displayLetters = new Array(word.length);
            this.startLetters = false;
            this.quantityQuessingLetters = 0;
            this.wordIsFound = false;
            this.category = category;
        };

        Word.prototype.getWord = function () {

            return this.word;
        };

        Word.prototype.getDisplayLetters = function () {

            return this.displayLetters;
        };

        Word.prototype.addToQuantityQuessingLetters = function () {

            this.quantityQuessingLetters++;
        };

        Word.prototype.getQuantityQuessingLetters = function () {

            return this.quantityQuessingLetters;
        };

        Word.prototype.getCategory = function () {

            return this.category;
        };

        Word.prototype.setStartLettersInWord = function (letters, level) {
            var maxDisplayLetters, displayLetters, random, result;

            if(!this.startLetters) {

                maxDisplayLetters = level.getMaxDisplayInitialLetters();

                displayLetters = 0;

                while (displayLetters < maxDisplayLetters) {

                    random = Math.floor(Math.random() * letters.length);

                    result = this.guessLetter(letters[random], level);

                    if(result.result === 'success') {

                        displayLetters++;
                    }
                }

                this.startLetters = true;
            }
        },

            Word.prototype.guessLetter = function (letter, level) {
                var found;

                if(this.quantityQuessingLetters >= level.getMaxQuantityQuessingLetters()) {

                    return {
                        result: 'failed',
                        message: 'Maximum Quessing Letters',
                        errorType: 2
                    }
                }

                found = false;

                for(var i = 0; i < this.word.length; i++) {

                    if(this.word[i] === letter && this.displayLetters[i] !== true) {

                        this.displayLetters[i] = true;
                        found = true;
                    }

                }

                if(found) {

                    return {
                        result: 'success',
                        message: 'Letter Found'
                    }

                } else {

                    return {
                        result: 'failed',
                        message: 'Letter Not Found',
                        errorType: 1,
                    }
                }
            }

        Word.prototype.guessWord = function (word) {

            if(this.word === word) {

                this.wordIsFound = true;

                for(var i = 0; i < this.word.length; i++) {

                    this.displayLetters[i] = true;
                }

                return {
                    result: 'success',
                    message: 'Word Correct',
                }
            }

            return {
                result: 'failed',
                message: 'Word Not Correct',
                errorType: 1,
            }
        };

        var data = {
            status: 'waiting',
            letters: [
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            ],
            words: [
            ],
            levels: [
            ],
            wordGame: null,
            levelGame: null,
            wordsFound: 0
        }

        return {

            resetData: function () {

                data.words.forEach(function (level) {

                    level.forEach(function (word) {

                        word.displayLetters = new Array(word.length);
                        word.startLetters = false;
                        word.quantityQuessingLetters = 0;
                        word.wordIsFound = false;

                    });

                });

                data.wordsFound = 0;
                data.wordGame = null;
                data.levelGame = null;
            },

            setStatus: function (status) {

                data.status = status;
            },

            getStatus: function () {

                return data.status;
            },

            addLevelGame: function (name, maxDisplayInitialLetters, maxQuantityQuessingLetters) {
                var level;

                level = new Level(name, maxDisplayInitialLetters, maxQuantityQuessingLetters);

                data.levels.push(level);

                data.words.push([]);

                return level;
            },

            getLevelByName: function (name) {
                var level;

                level = data.levels.filter(function(level) {
                    return level.getName() === name;
                });

                return level[0];
            },

            setGameLevel: function (level) {

                data.level = level;
            },

            getLevelGame: function () {

                return data.level;
            },

            getLevelsGame: function () {

                return data.levels;
            },

            getWordsLengthByLevel: function (level) {
                var index;

                if(level === undefined)
                    return null;

                index = level.getIndex();

                return data.words[index].length;
            },

            isLevelComplete: function (level) {
                var bool, word, index, pos;

                bool = true;

                index = level.getIndex();

                word = data.words[index][0] ? data.words[index][0] : null ;

                pos = 1;
                while (word && bool) {

                    if(!word.wordIsFound) {

                        bool = false;
                    }

                    word = data.words[index][pos] ? data.words[index][pos] : null ;

                    pos++;
                }

                return bool;
            },

            addWord: function (word, level, category) {
                var maxQuantityQuessingLetters, index;

                maxQuantityQuessingLetters = level.getMaxQuantityQuessingLetters();

                index = level.getIndex();

                var word = new Word(word, maxQuantityQuessingLetters, category);

                data.words[index].push(word);
            },

            setStartLettersInWord: function (word, level) {
                var maxDisplayLetters, displayLetters, random, result;

                if(!word.startLetters) {

                    maxDisplayLetters = level.getMaxDisplayInitialLetters();

                    displayLetters = 0;

                    while (displayLetters < maxDisplayLetters) {

                        random = Math.floor(Math.random() * data.letters.length);

                        result = word.guessLetter(data.letters[random], level);

                        if(result.result === 'success') {

                            displayLetters++;
                        }
                    }

                    word.startLetters = true;
                }
            },

            setWord: function (word) {

                data.word = word;
            },

            getWord: function () {

                return data.word;
            },

            addToWordsFoundAmount: function () {

                data.wordsFound++;
            },

            getWordsFoundAmount: function () {

                return data.wordsFound;
            },

            isAllWordsFound: function () {
                var level;

                level = this.getLevelGame();

                data.words[level.index].forEach(function (word) {

                    if(!word.wordIsFound) {

                        return false;
                    }
                });

                return true;
            },

            randomWord: function () {
                var random, word, level, index;

                level = this.getLevelGame();
                index = level.getIndex();

                if(this.isAllWordsFound()) {

                    random = Math.floor(Math.random() * data.words[index].length);

                    word = data.words[index][random];

                    while (word.wordIsFound) {

                        random = Math.floor(Math.random() * data.words[index].length);

                        word = data.words[index][random];
                    }

                    return word;
                }

                return null;
            },

        }

    })();

    var clockController = (function (coreCtrl, UICtrl, helperCtrl) {

        var data = {
            time: 0,
            DOMstring: '',
            run: false
        }

        var timeString = function () {
            var hours, minutes, minutesString, seconds, secondsString;

            hours = data.time / 3600;
            hours = parseInt(hours);

            minutes = data.time / 60;
            minutes = minutes - (hours * 60);
            minutes = parseInt(minutes);

            minutesString = minutes < 10 ? '0' + minutes : minutes ;

            seconds = data.time % 60;

            secondsString = seconds < 10 ? '0' + seconds : seconds ;

            return hours + ':' + minutesString + ':' + secondsString;
        }

        var time = function () {

            data.time++;

            document.querySelector(data.DOMstring).textContent = timeString();

            if(data.run) {

                setTimeout(function () {

                    time();

                }, 1000);

            }
        }

        return {

            getTime: function () {

                return data.time;
            },

            getTimeString: function () {

                return timeString();
            },

            stop: function () {

                data.run = false;
            },

            reset: function () {

                data.time = 0;
            },

            run: function (DOMstring) {

                data.DOMstring = DOMstring;

                data.run = true;

                time();
            }
        }

    })(coreController, UIController, helperController);

    var controller = (function (coreCtrl, UICtrl, clockCtrl, helperCtrl) {

        var DOM = UICtrl.getDOMstrings();

        var startGame = function () {
            var levelName, level;

            if(coreCtrl.getStatus() === 'finished') {

                coreCtrl.resetData();

                clockCtrl.reset();
            }

            levelName = UICtrl.getLevelFromDOM();

            level = coreCtrl.getLevelByName(levelName);

            if(coreCtrl.getWordsLengthByLevel(level) > 0) {

                coreCtrl.setGameLevel(level);

                UICtrl.setGameLevel(level);

                UICtrl.setAmountActiveWordsFound(coreCtrl.getWordsFoundAmount());

                UICtrl.hiddenStartGameBtn();

                UICtrl.showChangeLevelBtn();

                UICtrl.hiddenGameFinishedData();

                displayNewRandomWord();

                UICtrl.showGameControl();

                UICtrl.showGameActiveData();

                clockCtrl.run('.clock');

            } else {

                UICtrl.setContentInGameBoard('Level Empty, Change Level');
            }
        }

        var changeLevel = function () {
            var levelName, level;

            levelName = UICtrl.getLevelFromDOM();

            level = coreCtrl.getLevelByName(levelName);

            if(coreCtrl.getLevelGame() !== level) {

                if(coreCtrl.getWordsLengthByLevel(level) > 0) {

                    if (!coreCtrl.isLevelComplete(level)) {

                        coreCtrl.setGameLevel(level);
                        UICtrl.setGameLevel(level);

                        displayNewRandomWord();

                    } else {

                        UICtrl.setGameNotification('Level Complete, Change Level', 'failed');
                    }

                } else {

                    UICtrl.setGameNotification('Level Empty, Change Level', 'failed');
                }
            }
        }

        var newWord = function () {
            var level;

            level = coreCtrl.getLevelGame();

            if(coreCtrl.isLevelComplete(level)) {

                UICtrl.hiddenWordCategory();

                UICtrl.setGameNotification('Level Complete', 'success');

                UICtrl.setContentInGameBoard('Level Complete, Change Level');

            } else {

                displayNewRandomWord();
            }
        }

        var displayNewRandomWord = function () {
            var word, level, amountLettersToGuess;

            word = coreCtrl.randomWord();

            if(word) {

                coreCtrl.setStartLettersInWord(word, coreCtrl.getLevelGame());

                coreCtrl.setWord(word);

                UICtrl.setWordCategory(word.getCategory());

                UICtrl.showWordCategory();

                UICtrl.showWord(word);

                level = coreCtrl.getLevelGame();

                amountLettersToGuess = level.getMaxQuantityQuessingLetters() - word.getQuantityQuessingLetters();

                UICtrl.setAmountLettersToGuess(amountLettersToGuess);
            }
        }

        var guessLetter = function (event) {
            var letter, word, level, result, amountLettersToGuess;

            letter = event.target.getAttribute('data-letter');

            word = coreCtrl.getWord();

            level = coreCtrl.getLevelGame();

            result = word.guessLetter(letter, level);

            if(result.result === 'success' || result.errorType === 1) {

                word.addToQuantityQuessingLetters();
            }

            UICtrl.setGameNotification(result.message, result.result);

            UICtrl.showWord(word);

            amountLettersToGuess = level.getMaxQuantityQuessingLetters() - word.getQuantityQuessingLetters();

            UICtrl.setAmountLettersToGuess(amountLettersToGuess);
        }

        var guessWord = function () {
            var word, value, result;

            value = UICtrl.getWordFromDOM();

            word = coreCtrl.getWord();

            result = word.guessWord(value);

            if(result.result === 'success') {

                coreCtrl.addToWordsFoundAmount();
                UICtrl.setAmountActiveWordsFound(coreCtrl.getWordsFoundAmount());

                newWord();
            }

            UICtrl.setGameNotification(result.message, result.result);

        }

        var gameOver = function () {
            var timeString;

            clockCtrl.stop();

            timeString = clockCtrl.getTimeString();

            coreCtrl.setStatus('finished');

            UICtrl.setFinishTime(timeString);

            UICtrl.setAmountFinishedWordsFound(coreCtrl.getWordsFoundAmount());

            UICtrl.hiddenGameActiveData();

            UICtrl.hiddenChangeLevelBtn();

            UICtrl.showStartGameBtn();

            UICtrl.hiddenWordCategory();

            UICtrl.setContentInGameBoard('Game Finish');

            UICtrl.hiddenGameControl();

            UICtrl.showGameFinishedData();
        }

        var setupEventListeners = function () {

            document.querySelector(DOM.startGameBtn).addEventListener('click', startGame);

            document.querySelector(DOM.changeLevelBtn).addEventListener('click', changeLevel);

            document.querySelector(DOM.newWordBtn).addEventListener('click', newWord);

            var keyboardLetters = document.querySelectorAll(DOM.keyboardLetters);

            helperCtrl.nodeListForEach(keyboardLetters, function (key, index) {

                key.addEventListener('click', guessLetter);
            });

            document.querySelector(DOM.guessWordBtn).addEventListener('click', guessWord);

            document.querySelector(DOM.stopGameBtn).addEventListener('click', gameOver)
        }

        return {

            init: function () {
                var level1, level2, level3;

                level1 = coreCtrl.addLevelGame('level 1', 1, 5);
                level2 = coreCtrl.addLevelGame('level 2', 2, 10);
                level3 = coreCtrl.addLevelGame('level 3', 2, 10);

                UICtrl.setGameLevels(coreCtrl.getLevelsGame());

                coreCtrl.addWord('cat', level1, 'Animal');
                coreCtrl.addWord('car', level1, 'Transport');
                coreCtrl.addWord('code', level1, 'Technology');
                coreCtrl.addWord('red', level1, 'Color');
                coreCtrl.addWord('dog', level1, 'Animal');
                coreCtrl.addWord('game', level1, 'Leisure / Spare Time');

                coreCtrl.addWord('product', level2, 'Shopping');
                coreCtrl.addWord('cartoon', level2, 'TV');
                coreCtrl.addWord('yellow', level2, 'Color');

                coreCtrl.addWord('internet', level3, 'Technology');
                coreCtrl.addWord('baseball', level3, 'Sport');
                coreCtrl.addWord('computer', level3, 'Technology');

                setupEventListeners();
            }
        }

    })(coreController, UIController, clockController, helperController);

    controller.init();

})();