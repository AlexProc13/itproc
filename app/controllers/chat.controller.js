const Message = require('../models/message'),
    crypto = require('crypto'),
    mail = require('../lib/handler/handlerMail'),
    nodemailer = require('nodemailer'),
    notifier = require('mail-notifier');

class Chat {

    constructor() {
        this.limitMessage = 20;
        this.messages = [{message: 'Hello', date: 0, direction: 'left'}];
        this.code = 'user-it-proc';
    }

    init(io) {
        //for chat
        io.on('connection', function (socket) {
            let startMessage = this.messages;
            //start========
            socket.on('start chat', function (msg) {
                //send for mail
                //send mess
                //let message = this.startMess;
                startMessage[0].user = socket.id;
                startMessage[0].id = this.generate_id();
                //console.log(startMessage);
                this.saveToDB(startMessage, socket);
                socket.emit('get message', startMessage);
            }.bind(this));

            //get message=====
            socket.on('send message', function (msg) {
                this.saveToDB(msg, socket);
                mail.sendMail(nodemailer, this.standartMessege(msg));
                //send for mail
                //console.log(msg);
            }.bind(this));


            socket.on('preStart chat', function (msg) {
                //get values
                let massages = Message.find().where({id: msg[0].direction}).sort({date: 'desc'}).limit(this.limitMessage).exec();
                massages.then(function (message) {
                    //console.log(message);
                    socket.emit('preStart chat', message.reverse());
                });
            }.bind(this));

            notifier(mail.imap())
                .on('mail', function (mail) {
                    this.listenMail(mail.text, socket);
                }.bind(this))
                .start();

        }.bind(this));

    }

    saveToDB(msg, socket) {
        //console.log(msg);
        msg[0].user = this.getUser(socket);
        Message.insertMany(msg);
    }

    getUser(socket) {
        return 'user@' + socket.id;
    }

    checkUser(socket) {

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

    listenMail(mail, socket){
        //console.log(mail);
        let parts = mail.split('@user-it-proc@');
        let mess = parts[0].split('@@')[0];
        let userId = parts[1].replace(/[^-a-zA-Z-0-9]/gim,'');
        //check
        (async function () {
            let messDb = await Message.find().where({id: userId}).exec();
            if (messDb.length > 1){
                let message = [{message: mess, date: Date.now(), id: userId, direction: 'left'}];
                //add to database
                Message.insertMany(message);
                //send user
                socket.emit('get message', message);
            }
        })();
        //console.log(mess);
        //console.log(userId);
    }

    parseMsg(){

    }
}


module.exports = Chat;

