app.service('Audio', [function () {

    var mp3Path = '/Sounds/Themes/mp3/';

    this.playSuccessSong = function () {
        var audio = new Audio(mp3Path + 'BennyHillTheme.mp3');
        audio.play();
    };
}]);