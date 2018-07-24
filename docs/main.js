const myId = (new MediaStream).id;
console.log(`myId:${myId}`);
let stream = null;
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    console.log(`streamId:${stream.id}`);
    const localView = document.createElement('video');
    localView.srcObject = stream;
    document.body.appendChild(localView);
    localView.play();
    const peer = new Peer(myId, {
        key: '01099bd8-1083-4c33-ba9b-564a1377e901'
    });
    peer.on('open', id => {
        myIdDisp.textContent = id;
        const room = peer.joinRoom('hoge_fuga_piyo', { mode: 'sfu', stream });
        room.on('stream', stream => {
            console.log(`room on stream peerId:${stream.peerId}`);
            const remoteView = document.createElement('video');
            remoteView.srcObject = stream;
            document.body.appendChild(remoteView);
            remoteView.play();
        });
    });
}).catch(err => {
    console.error(err);
});
