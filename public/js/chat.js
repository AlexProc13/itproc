class StyleChat {

    static gotoBottom(selector) {
        var element = document.querySelector(selector);
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    static openChat(){
        $('.main-section').addClass("open-more");
    }
}

class Chat {

    constructor(sound) {
        this.sound = sound;
        this.socket = io();
        this.initial();
    }

    initial() {
        var counter = 0;
        //part1
        this.socket.emit('preStart chat', [{direction: this.getChatId()}]);
        this.socket.on('preStart chat', function (msg) {
            //console.log(msg);
            if (msg.length > 1){
                //add massage 10
                //open chat
                this.addMes(msg);
                (async function () {
                    await StyleChat.openChat();
                    await StyleChat.gotoBottom('.chat-section');
                })();
            } else {
                document
                    .querySelector('.main-section')
                    .addEventListener("click", function (e) {
                        if (counter === 0) {
                            this.socket.emit('start chat', {});
                        }
                        counter++;
                    }.bind(this));
            }
        }.bind(this));
    }

    getMes() {
        this.socket.on('get message', function (msg) {
            var snd = new Audio(this.sound);
            snd.play();
            //console.log(msg);
            this.setChatId(msg[0].id);
            this.addMes(msg);
            StyleChat.gotoBottom('.chat-section');
        }.bind(this));
    }

    sendMes() {

        var toDo = function () {
            let getMess = document.querySelector('input.message').value;
            if (getMess !== '') {
                getMess = [{message: getMess, date: Date.now(), id: this.getChatId(), direction: 'right'}];
                this.socket.emit('send message', getMess);
                this.addMes(getMess);
            }
            //clear
            document.querySelector('input.message').value = '';
            StyleChat.gotoBottom('.chat-section');
        }.bind(this);
        document
            .querySelector('a.message')
            .addEventListener("click", function (e) {
                e.preventDefault();
                toDo();
            });

        document
            .querySelector('input.message')
            .addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                toDo();
            }
        });
    }

    addMes(msg) {
        msg.forEach(function (item) {
            $("#chat").append(`
              <li>
                <div class="${item.direction}-chat">
                  <img src="/img/chat/1499345471_boy.png">
                  <p>${item.message}
                  </p>
                </div>
              </li>`);
        });
    }

    setChatId(key) {
        let getItem = localStorage.getItem('idChat');
        localStorage.removeItem('idChat');
        localStorage.setItem('idChat', key);
        if (getItem === null) {
            // if (typeof getItem === 'string') {
                localStorage.setItem('idChat', key);
            // }
        }
    }

    getChatId(){
        return localStorage.getItem('idChat')
    }
}


var app = new Vue({
    el: '.main-section',
    data: {
        message: 'Hello Vue!',
        messages: []
    }
});

$(document).ready(function () {
    $(".left-first-section").click(function () {
        $('.main-section').toggleClass("open-more");
    });

    $(".fa-clone").click(function (e) {
        e.preventDefault();
        $('.main-section').toggleClass("open-more");
    });

    //chat
    chat = new Chat("/sound/sd.mp3");
    chat.getMes();
    chat.sendMes();
});
