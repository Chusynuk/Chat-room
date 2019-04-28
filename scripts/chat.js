class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message) {
        const now = new Date();
        const chat  = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document
        const response  = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.chats
            .where('room', '==', this.room)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update UI
                        callback(change.doc.data());
                    }
                })
            })
    }
}

const chatroom = new Chatroom('gaming', 'eloi');

chatroom.getChats(data => {
    console.log(data);
})


