const
    Message = require('../models/message'),
    crypto = require('crypto'),
    mail = require('../lib/handler/handlerMail'),
    nodemailer = require('nodemailer'),
    notifier = require('mail-notifier');

class Chat {

    constructor() {
        this.limitMessage = 20;
        this.messages = [{message: 'Hello', date: 0, direction: 'left'}];
        this.code = 'user-it-proc';
        this.socket_clients = {};
        //this.socket_user = {};
    }

    //set events
    init(io) {
        //for chat
        io.on('connection', function (socket) {
            let startMessage = this.messages;
            //start========
            socket.on('start chat', function (msg) {
                //send for mail
                //send mess
                startMessage[0].user = socket.id;
                startMessage[0].id = this.generate_id();
                this.socket_clients[startMessage[0].id] = socket;
                //console.log('ok');
                //this.socket_user['socket.id'] = startMessage[0].id;
                this.saveToDB(startMessage, socket);
                socket.emit('get message', startMessage);
            }.bind(this));

            //get message=====
            socket.on('send message', function (msg) {
                this.saveToDB(msg, socket);
                //send for mail
                mail.sendMail(nodemailer, this.standartMessege(msg));
            }.bind(this));


            socket.on('preStart chat', function (msg) {
                //get values
                let massages = Message.find().where({id: msg[0].direction}).sort({date: 'desc'}).limit(this.limitMessage).exec();
                massages.then(function (message) {
                    this.socket_clients[msg[0].direction] = socket;
                    //console.log('ok');
                    //this.socket_user[socket.id] = msg[0].direction;
                    //console.log(this.socket_clients);
                    socket.emit('preStart chat', message.reverse());
                }.bind(this));
            }.bind(this));

            //clear old connect
            socket.on('disconnect', function () {
                // let user_key = this.socket_user[socket.id];
                // delete this.socket_clients[user_key];
                // delete this.socket_user[socket.id];
                // console.log(this.socket_user);
                //console.log(Object.keys(this.socket_clients));
                //find keyd
                let key = this.getKeyByValueSocketId(this.socket_clients, socket);
                if (typeof key !== 'undefined') {
                    //delete
                    delete this.socket_clients[key];
                }
            }.bind(this));

        }.bind(this));

        notifier(mail.imap())
            .on('mail', function (mail) {
                //console.log(mail.text);
                this.listenMail(mail.text);
            }.bind(this))
            .start();

    }

    saveToDB(msg, socket) {
        //console.log(msg);
        msg[0].user = this.getUser(socket);
        Message.insertMany(msg);
    }

    getUser(socket) {
        return 'user@' + socket.id;
    }

    generate_id() {
        var sha = crypto.createHash('sha256');
        sha.update(Math.random().toString());
        return sha.digest('hex');
    };

    standartMessege(msg) {
       return {
            to: process.env.ADMIN_MAIL,
            subject: process.env.NAME,
            text: msg[0].message+`  @${this.code}@`+msg[0].id + `@${this.code}@`,
        };
    }

    getKeyByValueSocketId(object, value) {
        return Object.keys(object).find(key => object[key].id === value.id);
    }


    listenMail(mail){
        let parts = mail.split('@user-it-proc@');
        let mess = parts[0].split('@@')[0];
        let userId = parts[1].replace(/[^-a-zA-Z-0-9]/gim,'');
        //console.log(userId);
        //check
        let self = this;
        (async function () {
            ///console.log();
            let messDb = await Message.find().where({id: userId}).exec();
            //console.log(messDb);
            if (messDb.length > 1){
                let message = [{message: mess, date: Date.now(), id: userId, direction: 'left'}];
                //add to database
                await Message.insertMany(message);
                //send user
                self.socket_clients[userId].emit('get message', message);
            }
        })();
    }
}


module.exports = Chat;

